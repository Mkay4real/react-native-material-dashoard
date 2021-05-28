import {interpret} from 'xstate';
import createFormMachine from './machine';
import {Config, Handlers, Subscriber, UseForm} from './types';

export default function useForm<T = any, K = unknown>(
  config: Config<T, K>,
): UseForm<T, keyof T, K> {
  const service = interpret(createFormMachine<T, K>(config));

  const subscribe = (callback: Subscriber<T, K>) => {
    service.onTransition((state) => {
      const {
        context: {data, values, error, errors},
      } = state;

      const hasErrors = errors.size > 0;

      const isSubmitting = state.matches('submitting');

      const hasError = (name: keyof T) => errors.has(name);

      callback({
        data,
        error,
        errors,
        values,
        hasError,
        hasErrors,
        isSubmitting,
      });
    });
  };

  const clearError = () => service.send('CLEAR_ERROR');

  const clearValues = () => service.send('CLEAR_VALUES');

  const onBlur = <K extends keyof T>(name: K, value: T[K]) => {
    service.send({type: 'BLUR', name, value});
  };

  const onChange = <K extends keyof T>(name: K, value: T[K]) => {
    service.send({type: 'EDIT', name, value});
  };

  const submit = () => service.send('SUBMIT');

  const handlers = {} as Handlers<T>;

  Object.keys(config.schema).forEach((key) => {
    const _key = key as keyof T;

    handlers[_key] = {
      onBlur: <K extends keyof T>(value: T[K]) => onBlur(_key, value),
      onChange: <K extends keyof T>(value: T[K]) => onChange(_key, value),
    };
  });

  service.start();

  return {
    submit,
    onBlur,
    service,
    onChange,
    handlers,
    subscribe,
    clearError,
    clearValues,
  };
}
