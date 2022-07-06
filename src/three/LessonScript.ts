import { QNHScene } from "./qnh/QNHScene";

export class LessonScript {
    private _steps: LessonStep[] = []

    constructor(protected _scene: QNHScene) {

    }

    protected addStep(step: LessonStep) {
        this._steps.push(step)
    }
}

export class LessonStep {
    constructor(
        private _scene: QNHScene,
        private _action: (scene: QNHScene) => void,
        private _component: JSX.Element
    ) { }

    public activate() {
        this._action(this._scene)
        return this._component
    }
}

export class QNHLessonScript extends LessonScript {
    constructor(scene: QNHScene) {
        super(scene)
    }
}