import {useState, useEffect} from 'react';

type Async<T> = {
  value: T;
  error?: Error;
  loading: boolean;
};

export default function useDefaultAsync<T>(
  initial: T,
  asyncFn: () => Promise<T>,
  deps = [],
): Async<T> {
  const [state, setState] = useState<Async<T>>({
    value: initial,
    loading: false,
  });

  useEffect(() => {
    const exec = async () => {
      const result = {} as Async<T>;

      try {
        result.value = await asyncFn();
      } catch (error) {
        result.error = error;
      } finally {
        result.loading = false;
      }

      setState(result);
    };

    setState((s) => ({...s, loading: true}));

    exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
