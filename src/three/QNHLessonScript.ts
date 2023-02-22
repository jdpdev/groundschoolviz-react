import { QNHScene } from "./qnh/QNHScene";
import { LessonScript, LessonStep } from "./LessonScript";

export enum QNHLessonStep {
    Title,
    Introduction,
    Altimeter,
    PressureAltitude,
    ChangingPressure
}

export class QNHLessonScript extends LessonScript<QNHLessonStep> {
    constructor(scene: QNHScene) {
        super(scene)

        const steps = [
            new QNHTitleStep(scene),
            new QNHIntroductionStep(scene),
            new QNHAltimeterStep(scene),
            new QNHPressureAltitudeStep(scene),
            new QNHChangingPressureStep(scene)
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

export class QNHPressureAltitudeStep extends LessonStep<QNHLessonStep> { 
    constructor(scene: QNHScene) {
        super(QNHLessonStep.PressureAltitude, scene)
    }

    public async activate() {
        this._scene.toggleIsobars()
    }
}

export class QNHChangingPressureStep extends LessonStep<QNHLessonStep> { 
    constructor(scene: QNHScene) {
        super(QNHLessonStep.ChangingPressure, scene)
    }
}