import { useState, useMemo, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

function useDebounceState(delay = 0, initialState) {
  const [state, setState] = useState(initialState);
  const instanceRef = useRef({});

  instanceRef.current.prevState = state;

  const updateState = nextState =>
    instanceRef.current.prevState !== nextState && setState(nextState);

  const debounceFn = useMemo(() => (delay === 0 ? updateState : debounce((nextState) => {
    if (instanceRef.current.isMounted) {
      updateState(nextState);
    }
  }, delay)), [delay]);

  useEffect(() => {
    instanceRef.current.isMounted = true;
    return () => {
      instanceRef.current.isMounted = false;
    };
  });

  return [state, debounceFn];
}

export default useDebounceState;
