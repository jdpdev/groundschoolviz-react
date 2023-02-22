import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { LessonScene } from '../../../LessonScene'
import { ThreeComponent } from '../../../ThreeComponent'
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
    scene: LessonScene
}

export function QNHLessonRoute() {
    return (
        <ThreeComponent sceneId={QNHScene.ID}>
            { (scene) => <QNHLesson scene={scene} /> }
        </ThreeComponent>
    )
}

export function QNHLesson({ scene }: Props) {
    const navigate = useNavigate()
    const myscene = scene as QNHScene
    const { current: lesson } = useRef(new QNHLessonScript(myscene))
    const [currentStep, setCurrentStep] = useState(lesson.currentStep)

    const onNextStep = async () => {
        const isContinuing = await lesson.next()
        
        if (isContinuing) {
            setCurrentStep(lesson.currentStep)
        } else {
            navigate('/')
        }
    }

    return (
        <PageLayout>
            <>
                { getUIForStep(currentStep!.id, myscene, onNextStep) }
                <div className='qnh-lesson'>
                    {
                        isShowingAltimeter(currentStep!.id) &&
                        <div className='altimeter-box'>
                            <Altimeter
                                setting={myscene.altimeterSetting}
                                altitude={myscene.altitude}
                            />
                        </div>
                    }
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