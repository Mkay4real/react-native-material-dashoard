import {assign, createMachine, send, spawn} from 'xstate';
import createActor from './actor';
import {Config, MaybeRecord} from './types';
import {toLabel, toSchema} from './utils';

export type Context<T, K> = {
  data?: K;
  error?: Error | string;
  values: MaybeRecord<T>;
  errors: Map<keyof T, string>;
  actors?: Record<keyof T, any>;
  actorValidationCounter: number;
};

export type Events<T> =
  | {type: 'BLUR'; name: keyof T; value: T[keyof T]}
  | {type: 'EDIT'; name: keyof T; value: T[keyof T]}
  | {type: 'ERROR'; name: keyof T; error: string}
  | {type: 'NO_ERROR'; name: string}
  | {type: 'SUBMIT' | 'CLEAR_ERROR' | 'CLEAR_VALUES'};

export type States<T, K> =
  | {
      value: 'editing' | 'validating' | 'submitting' | 'validatingActors';
      context: Context<T, K>;
    }
  | {
      value: 'submitted';
      context: Context<T, K> & {data: K};
    };

const createFormMachine = <T, K>({
  schema,
  onSubmit,
  validate,
  once = false,
}: Config<T, K>) => {
  const values = {} as Context<T, K>['values'];

  Object.keys(schema).forEach((key) => {
    const _key = key as keyof T;
    const {initialValue} = toSchema(schema[_key]);
    values[_key] = initialValue as any;
  });

  return createMachine<Context<T, K>, Events<T>, States<T, K>>(
    {
      id: 'form',
      initial: 'editing',
      context: {
        values,
        errors: new Map(),
        actorValidationCounter: 0,
        actors: {} as Context<T, K>['actors'],
      },
      entry: assign((ctx) => {
        const actors = {} as any;

        Object.keys(schema).forEach((key) => {
          const _key = key as keyof T;
          const value = toSchema(schema[_key]);
          actors[_key] = spawn(createActor(key, value), key);
        });

        return {...ctx, actors};
      }),
      on: {
        CLEAR_ERROR: {
          actions: assign({error: (_) => undefined}),
        },
        CLEAR_VALUES: {
          actions: assign({values: (_) => ({} as any)}),
        },
      },
      states: {
        editing: {
          on: {
            ERROR: {
              actions: 'assignActorError',
            },
            NO_ERROR: {
              actions: 'clearActorError',
            },
            BLUR: {
              actions: ['sendActor', 'assignValue'],
            },
            EDIT: {
              actions: 'assignValue',
            },
            SUBMIT: 'validating',
          },
        },
        validating: {
          invoke: {
            src: 'validateForm',
            onDone: 'submitting',
            onError: {
              target: 'editing',
              actions: 'assignErrors',
            },
          },
        },
        submitting: {
          entry: 'clearError',
          invoke: {
            src: 'submitForm',
            onDone: [
              {
                target: 'submitted',
                actions: 'assignData',
                cond: () => once,
              },
              {
                target: 'editing',
                actions: 'assignData',
              },
            ],
            onError: {
              target: 'editing',
              actions: 'assignError',
            },
          },
        },
        submitted: {
          type: 'final',
          data: ({data}) => data,
        },
      },
    },
    {
      actions: {
        assignData: assign({data: (_, {data}: any) => data}),
        assignError: assign({error: (_, {data}: any) => data}),
        clearError: assign((ctx) => ({...ctx, error: undefined})),
        sendActor: send((_, e) => e, {to: (_, {name}: any) => name}),

        assignValue: assign({
          values: ({values}, {name, value}: any) => {
            return {...values, [name]: value};
          },
        }),

        assignErrors: assign({
          errors: (_, {data}: any) => data,
        }),

        assignActorError: assign({
          errors: ({errors}, {name, error}: any) => {
            const errs = new Map(errors);
            errs.set(name, error);
            return errs;
          },
        }),

        clearActorError: assign({
          errors: ({errors}, {name}: any) => {
            const errs = new Map(errors);
            errs.delete(name);
            return errs;
          },
        }),
      },
      services: {
        submitForm({values}) {
          return onSubmit(values);
        },
        validateForm({values}) {
          let errors = {} as any;

          if (validate) {
            errors = validate?.(values);
          } else {
            Object.keys(schema).forEach((key) => {
              const _key = key as keyof T;
              const value = values[_key];
              const {validate, required} = toSchema(schema[_key]);
              const res = validate?.(value);

              if (validate) {
                if (res) errors[_key] = res;
              } else {
                if (required && !value) {
                  errors[_key] = `${toLabel(key)} is required.`;
                }
              }
            });
          }

          if (Object.values(errors).some((e) => e)) {
            const entries = Object.entries(errors);
            return Promise.reject(new Map(entries));
          }

          return Promise.resolve();
        },
      },
    },
  );
};

export default createFormMachine;
