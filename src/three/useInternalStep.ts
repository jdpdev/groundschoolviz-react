import React, { useCallback, useMemo, useState } from 'react'

export function useInternalStep(count: number, onDone: () => void) {
    const [step, setStep] = useState(0)
    const next = useCallback(() => {
        console.log('[useInternalStep]', step, count)
        if (step < count) {
            setStep(step + 1)
        } else {
            onDone()
        }
    }, [step, setStep, onDone])

    return {
        goNext: next,
        index: step
    }
}