/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export function useMount(callback: () => void) {
  useEffect(callback, []);
}

export function useUnmount(callback: () => void) {
  useEffect(callback, []);
}
