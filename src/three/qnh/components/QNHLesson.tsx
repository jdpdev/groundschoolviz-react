import React, { useRef, useState } from 'react'
import { PageLayout } from '../../PageLayout'
import { QNHLessonScript, QNHLessonStep } from '../../QNHLessonScript'
import { QNHScene } from '../QNHScene'
import { Altimeter } from './Altimeter'

import './css/QNHLesson.css'
import { QNHIntroduction } from './Introduction'
import { QNHTitleCard } from './TitleCard'

interface Props {
    scene: QNHScene
}



export function QNHLesson({ scene }: Props) {
    const { current: lesson } = useRef(new QNHLessonScript(scene))
    const [currentStep, setCurrentStep] = useState(lesson.currentStep)

    const onNextStep = async () => {
        await lesson.next()
        setCurrentStep(lesson.currentStep)
    }

    return (
        <PageLayout>
            <>
                { getUIForStep(currentStep!.id, onNextStep) }
                <div className='qnh-lesson'>
                    <Altimeter
                        setting={scene.altimeterSetting}
                        altitude={scene.altitude}
                    />
                    <div className='pressure-controls'>
                        <h4>Pressure</h4>
                        <div>
                            <button onClick={() => scene.highPressure()}>
                                High
                            </button>

                            <button onClick={() => scene.normalPressure()}>
                                Starting
                            </button>

                            <button onClick={() => scene.lowPressure()}>
                                Low
                            </button>
                        </div>
                    </div>
                </div>
            </>
        </PageLayout>
    )
}

function getUIForStep(step: QNHLessonStep, nextStep: () => void) {
    switch (step) {
        case QNHLessonStep.Title:   
            return <QNHTitleCard nextStep={nextStep} />
        
        case QNHLessonStep.Introduction:   
            return <QNHIntroduction nextStep={nextStep} />
    }
}