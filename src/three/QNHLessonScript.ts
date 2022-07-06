import React from 'react'
import { QNHScene } from "./qnh/QNHScene";
import { LessonScript, LessonStep } from "./LessonScript";

export enum QNHLessonStep {
    Title,
    Introduction
}

export class QNHLessonScript extends LessonScript<QNHLessonStep> {
    constructor(scene: QNHScene) {
        super(scene)

        const steps = [
            new QNHTitleStep(QNHLessonStep.Title, scene),
            new QNHIntroductionStep(QNHLessonStep.Introduction, scene),
        ]

        this.addSteps(steps)
        this.start()
    }
}

export class QNHTitleStep extends LessonStep<QNHLessonStep> {
    
}

export class QNHIntroductionStep extends LessonStep<QNHLessonStep> {
    
}