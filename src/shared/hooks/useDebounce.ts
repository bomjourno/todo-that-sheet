import { useEffect, useState } from "react";

export const useDebounce = <T>(v: T, delay: number) => {
  const [value, setValue] = useState(v);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(v);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [v, delay]);

  return value;
};
