import  { useRef } from "react";

function useDebounce() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
  return debounce;
}

export default useDebounce;
