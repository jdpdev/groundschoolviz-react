import React from 'react'
import { QNHScene } from '../QNHScene'
import { Altimeter } from './Altimeter'

import './css/QNHLesson.css'

interface Props {
    scene?: QNHScene
}

export function QNHLesson({ scene }: Props) {
    if (scene == null) {
        return <div />
    }

    return (
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
    )
}