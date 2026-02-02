import { MutableRefObject } from "react";

/**
 * Safely assigns DOM nodes to an indexed ref array.
 * Prevents TS ref callback return-type errors.
 */
export function setArrayRef<T extends HTMLElement | SVGElement>(
  refArray: MutableRefObject<T[]>,
  index: number
) {
  return (el: T | null): void => {
    if (el) refArray.current[index] = el;
  };
}
