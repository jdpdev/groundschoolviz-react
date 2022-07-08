import React, { useCallback, useMemo, useState } from 'react'

export function useInternalStep(count: number, onDone: () => void) {
    const [step, setStep] = useState(0)
    const next = useCallback(() => {
        if (step < count) {
            setStep(step + 1)
        } else {
            onDone()
        }
    }, [step, setStep, onDone])

    const gotoStep = (step: number) => setStep(step)

    return {
        goNext: next,
        gotoStep,
        index: step
    }
}