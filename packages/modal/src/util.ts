import { useEffect, useRef } from 'react'

export function useLazyEffect(fn: () => void, inputs: any[]) {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) return fn()
    else didMountRef.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, inputs)
}
