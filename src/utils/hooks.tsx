import { MutableRefObject, useRef, useState } from "react";

export function useStateWithRef<T>(
  initialState: T
): [T, (value: T) => void, MutableRefObject<T>] {
  const [state, setState] = useState<T>(initialState);
  const ref = useRef<T>(initialState);
  const handleState = (value: T) => {
    ref.current = value;
    setState(value);
  };
  return [state, handleState, ref];
}
