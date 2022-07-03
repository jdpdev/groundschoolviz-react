import React from 'react'
import { QNHScene } from '../QNHScene'

interface Props {
    scene?: QNHScene
}

export function QNHLesson({ scene }: Props) {
    if (scene == null) {
        return <div />
    }

    return (
        <div>

        </div>
    )
}