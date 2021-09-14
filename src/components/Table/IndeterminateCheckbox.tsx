import { useEffect, forwardRef, useRef, RefCallback } from 'react';

interface Props {
  indeterminate?: boolean;
  name?: string;
}

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

const IndeterminateCheckbox = forwardRef<HTMLInputElement, Props>(
  // eslint-disable-next-line react/prop-types
  ({ indeterminate, ...rest }, ref: React.Ref<HTMLInputElement>) => {
    const defaultRef = useRef<HTMLInputElement | null>(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);

    useEffect(() => {
      if (combinedRef?.current) {
        combinedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [combinedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={combinedRef} {...rest} />
      </>
    );
  },
);

export default IndeterminateCheckbox;
