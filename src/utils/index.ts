import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: any) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObject = (obj: { [key: string]: unknown }) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (func: () => void) => {
  useEffect(
    () => func(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

export const useDebounce = <V>(term: V, delay?: number) => {
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedTerm(term), delay);
    return () => clearTimeout(timeout);
  }, [term, delay]);

  return debouncedTerm;
};

export const useArray = <V>(persons: V[]) => {
  const [value, setValue] = useState(persons);
  const clear = () => setValue([]);
  const removeIndex = (index: number) => {
    const copy = [...value];
    copy.splice(index, 1);
    setValue(copy);
  };
  const add = (obj: V) => {
    setValue([...value, obj]);
  };
  return { value, clear, removeIndex, add };
};

export const resetRoute = () => (window.location.href = window.location.origin);

export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
