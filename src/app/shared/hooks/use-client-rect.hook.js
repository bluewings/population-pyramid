import { useState, useRef, useEffect } from 'react';

function useClientRect(properties, clientRef) {
  const builtInRef = useRef(null);
  const instanceRef = useRef({});

  const _properties = Array.isArray(properties) ? properties : ['left', 'top', 'right', 'bottom', 'width', 'height'];
  const _clientRef = clientRef || builtInRef;

  const [size, setSize] = useState({ rect: null });

  useEffect(() => {
    const watch = () => {
      if (_clientRef && _clientRef.current) {
        const rect = _clientRef.current.getBoundingClientRect();
        const { obj, arr } = _properties.reduce((prev, key) => {
          const value = rect[key];
          if (typeof value === 'undefined') {
            return prev;
          }
          return { obj: { ...prev.obj, [key]: value }, arr: [...prev.arr, value] };
        }, { obj: {}, arr: [] });

        if (size.arr !== arr.join('_')) {
          setSize({ rect: obj, arr: arr.join('_') });
        } else {
          instanceRef.current.frameId = window.requestAnimationFrame(watch);
        }
      }
    };
    watch();
    return () => window.cancelAnimationFrame(instanceRef.current.frameId);
  });

  return [size.rect || {}, _clientRef];
}

export default useClientRect;
