import { useEffect, forwardRef, useRef, ReactElement } from 'react';
import useCombinedRefs from '@src/hooks/useCombinedRef';
import { IInderminateCheckbox } from '@src/types';

const IndeterminateCheckbox = forwardRef<HTMLInputElement, IInderminateCheckbox>(
  ({ indeterminate, ...rest }: IInderminateCheckbox, ref: React.Ref<HTMLInputElement>): ReactElement => {
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
