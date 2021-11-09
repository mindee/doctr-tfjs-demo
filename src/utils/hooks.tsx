// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

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
