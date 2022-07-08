import React, { useCallback, useMemo, useState } from 'react'

export function useInternalStep(count: number, onDone: () => void) {
    const [step, setStep] = useState(0)
    const next = useCallback(() => {
        console.log('[useInternalStep] next', step, count)
        if (step < count) {
            console.log('[useInternalStep] increment', step + 1)
            setStep(step + 1)
        } else {
            console.log('[useInternalStep] done')
            onDone()
        }
    }, [step, setStep, onDone])

    const gotoStep = (step: number) => setStep(step)

    console.log('[useInternalStep]', step, count)

    return {
        goNext: next,
        gotoStep,
        index: step
    }
}