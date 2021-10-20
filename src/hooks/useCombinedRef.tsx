import { RefCallback, useEffect, useRef } from 'react';

interface MutableRefObject<T> {
  current: T;
}

type Ref<T> = RefCallback<T> | MutableRefObject<T> | null;

const useCombinedRefs = (...refs: Ref<HTMLInputElement | null>[]): MutableRefObject<HTMLInputElement | null> => {
  const targetRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current as unknown as HTMLInputElement);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

export default useCombinedRefs;
