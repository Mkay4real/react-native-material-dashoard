import {useState, useEffect} from 'react';

export default function useAsync<T>(asyncFn: () => Promise<T>, deps = []) {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const exec = async () => {
      setState(await asyncFn());
    };

    exec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
