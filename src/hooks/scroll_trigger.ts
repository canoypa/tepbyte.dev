/*!
Copyright (c) 2014 Call-Em-All
https://github.com/mui/material-ui/blob/master/LICENSE
 */

import {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEvent } from "react-use";

export type UseScrollTriggerOptions = {
  target: Window | Element;
  threshold: number;
  disableHysteresis: boolean;
};

const defaultOptions = {
  target: window,
  threshold: 100,
  disableHysteresis: false,
};

const scrollHandler = (
  cur: MutableRefObject<number | undefined>,
  options: UseScrollTriggerOptions
): boolean => {
  const { target, threshold, disableHysteresis } = options;

  const previous = cur.current;
  cur.current = target instanceof Window ? target.scrollY : target.scrollTop;

  if (!disableHysteresis && previous !== undefined) {
    if (cur.current < previous) {
      return false;
    }
  }

  return cur.current > threshold;
};

export const useScrollTrigger = (
  options: Partial<UseScrollTriggerOptions> | undefined = {}
) => {
  const opt = useMemo(() => ({ ...defaultOptions, ...options }), [options]);

  const cur = useRef<number>();
  const [trigger, setTrigger] = useState<boolean>(() =>
    scrollHandler(cur, opt)
  );

  const handler = useCallback(() => {
    setTrigger(scrollHandler(cur, opt));
  }, [opt]);

  useEvent("scroll", handler, options.target, { passive: true });

  return trigger;
};
