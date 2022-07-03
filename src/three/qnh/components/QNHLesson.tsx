import React from 'react'
import { QNHScene } from '../QNHScene'
import { Altimeter } from './Altimeter'

interface Props {
    scene?: QNHScene
}

export function QNHLesson({ scene }: Props) {
    if (scene == null) {
        return <div />
    }

    return (
        <div>
            <Altimeter
                setting={29.3}
                altitude={0.3}
            />
        </div>
    )
}