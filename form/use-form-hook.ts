import {useRef} from 'react';
import {useService} from '@xstate/react';
import {Config} from './types';
import _useForm from './use-form';

export default function useForm<T, K = unknown>(config: Config<T, K>) {
  const {
    current: {service, ...rest},
  } = useRef(_useForm<T, K>(config));

  const [state] = useService(service);

  const {
    context: {data, values, errors, error},
  } = state;

  const hasErrors = errors.size > 0;

  const isSubmitting = state.matches('submitting');

  const submitted =
    state.matches('submitted') ||
    (state.matches('editing') && state.history?.matches('submitting'));

  const hasError = (name: keyof T) => errors.has(name);

  return {
    ...rest,
    data,
    error,
    values,
    errors,
    hasError,
    hasErrors,
    submitted,
    isSubmitting,
  };
}
