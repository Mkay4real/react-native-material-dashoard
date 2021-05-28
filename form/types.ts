import {Interpreter} from 'xstate';
import {Context, Events, States} from './machine';

export type XRecord<T> = {[K in keyof T]: T[K]};

export type MaybeRecord<T> = {
  [K in keyof T]: T[K] extends undefined ? undefined : T[K];
};

export type Schema<T> = {
  initialValue?: T;
  required?: boolean;
  validate?: (value: T | undefined) => string | void;
};

export type ValidationSchema<T> = {[K in keyof T]: string | Schema<T[K]>};

export type Config<T, K> = {
  once?: boolean;
  schema: ValidationSchema<T>;
  onSubmit(values: MaybeRecord<T>): Promise<K>;
  validate?: (values: MaybeRecord<T>) => Record<keyof T, string> | void;
};

export type SubscriberHelpers<T> = {
  hasErrors: boolean;
  isSubmitting: boolean;
  hasError(name: keyof T): boolean;
};

export type Subscriber<T, K> = (
  config: Omit<Context<T, K>, 'actors' | 'actorValidationCounter'> &
    SubscriberHelpers<T>,
) => void;

export type Handlers<T> = {
  [K in keyof T]: {
    onBlur(value: T[K]): void;
    onChange(value: T[K]): void;
  };
};

export type UseForm<T, K extends keyof T, P> = {
  submit(): void;
  clearError(): void;
  clearValues(): void;
  handlers: Handlers<T>;
  onBlur(name: K, value: T[K]): void;
  onChange(name: K, value: T[K]): void;
  subscribe(callback: Subscriber<T, P>): void;
  service: Interpreter<Context<T, any>, any, Events<T>, States<T, any>>;
};
