import React, { useRef, useState } from 'react'
import { PageLayout } from '../../PageLayout'
import { QNHLessonScript, QNHLessonStep } from '../../QNHLessonScript'
import { QNHScene } from '../QNHScene'
import { Altimeter } from './Altimeter'

import './css/QNHLesson.css'
import { QNHIntroduction } from './Introduction'
import { QNHAltimeter } from './QNHAltimeter'
import { QNHChangingPressure } from './QNHChangingPressure'
import { QNHPressureAltitude } from './QNHPressureAltitude'
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
                { getUIForStep(currentStep!.id, scene, onNextStep) }
                <div className='qnh-lesson'>
                    {
                        isShowingAltimeter(currentStep!.id) &&
                        <div className='altimeter-box'>
                            <Altimeter
                                setting={scene.altimeterSetting}
                                altitude={scene.altitude}
                            />
                        </div>
                    }
                    {/*
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
                    */ }
                </div>
            </>
        </PageLayout>
    )
}

function getUIForStep(step: QNHLessonStep, scene: QNHScene, nextStep: () => void) {
    switch (step) {
        case QNHLessonStep.Title:   
            return <QNHTitleCard scene={scene} nextStep={nextStep} />
        
        case QNHLessonStep.Introduction:   
            return <QNHIntroduction scene={scene} nextStep={nextStep} />

        case QNHLessonStep.Altimeter:   
            return <QNHAltimeter scene={scene} nextStep={nextStep} />

        case QNHLessonStep.PressureAltitude:
            return <QNHPressureAltitude scene={scene} nextStep={nextStep} />

        case QNHLessonStep.ChangingPressure:
            return <QNHChangingPressure scene={scene} nextStep={nextStep} />
    }
}

function isShowingAltimeter(step: QNHLessonStep): boolean {
    return step > QNHLessonStep.Altimeter
}