import React from 'react'
import { QNHScene } from "./qnh/QNHScene";
import { LessonScript, LessonStep } from "./LessonScript";

export enum QNHLessonStep {
    Title,
    Introduction,
    Altimeter
}

export class QNHLessonScript extends LessonScript<QNHLessonStep> {
    constructor(scene: QNHScene) {
        super(scene)

        const steps = [
            new QNHTitleStep(scene),
            new QNHIntroductionStep(scene),
            new QNHAltimeterStep(scene)
        ]

        this.addSteps(steps)
        this.start()
    }
}

export class QNHTitleStep extends LessonStep<QNHLessonStep> { 
    constructor(scene: QNHScene) {
        super(QNHLessonStep.Title, scene)
    }
}

export class QNHIntroductionStep extends LessonStep<QNHLessonStep> { 
    constructor(scene: QNHScene) {
        super(QNHLessonStep.Introduction, scene)
    }
}

export class QNHAltimeterStep extends LessonStep<QNHLessonStep> { 
    constructor(scene: QNHScene) {
        super(QNHLessonStep.Altimeter, scene)
    }
}