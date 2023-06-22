/*!
Copyright (c) 2014 Call-Em-All
https://github.com/mui/material-ui/blob/master/LICENSE
 */

import { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react'
import { useEffectOnce, useEvent } from 'react-use'

export type UseScrollTriggerOptions = Partial<{
  target: Window | Element
  threshold: number
  disableHysteresis: boolean
}>

const trigger = (
  cur: MutableRefObject<number>,
  options: UseScrollTriggerOptions
): boolean => {
  const { target, threshold = 100, disableHysteresis = false } = options

  if (!target) return false

  const previous = cur.current
  cur.current = target instanceof Window ? target.scrollY : target.scrollTop

  if (!disableHysteresis && previous !== undefined) {
    if (cur.current < previous) {
      return false
    }
  }

  return cur.current > threshold
}

const defaultTarget = typeof window !== 'undefined' ? window : undefined

export const useScrollTrigger = (
  options: UseScrollTriggerOptions = {}
): boolean => {
  const opt = useMemo<UseScrollTriggerOptions>(
    () => ({ target: defaultTarget, ...options }),
    [options]
  )

  const cur = useRef<number>(0)
  const [state, setState] = useState<boolean>(false)

  const handler = useCallback(() => {
    setState(trigger(cur, opt))
  }, [opt])

  useEffectOnce(handler)
  useEvent('scroll', handler, options.target, { passive: true })

  return state
}
