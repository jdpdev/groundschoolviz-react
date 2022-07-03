import { QNHScene } from "./qnh/QNHScene";

export class LessonScript {
    private _steps: LessonStep[] = []

    constructor(private _scene: QNHScene) {

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