import { QNHScene } from "./qnh/QNHScene";

export class LessonScript<T> {
    private _steps: LessonStep<T>[] = []
    
    public get currentStep(): LessonStep<T> | undefined {
        return this._steps?.[this._stepIndex];
    }

    protected _stepIndex: number = 0

    constructor(protected _scene: QNHScene) { }

    protected addStep(step: LessonStep<T>) {
        this._steps.push(step)
    }

    protected addSteps(steps: LessonStep<T>[]) {
        this._steps = steps
    }

    protected async start() {
        this._stepIndex = 0
        await this._steps[this._stepIndex].activate()
    }

    public async next() {
        await this._steps[this._stepIndex].deactivate()
        this._stepIndex++
        await this._steps[this._stepIndex].activate()
    }
}

export class LessonStep<T> {
    private _onActivate: ((scene: QNHScene) => void) | undefined
    public set onActivate(value: ((scene: QNHScene) => void) | undefined) {
        this._onActivate = value;
    }

    public get id(): T {
        return this._id
    }

    constructor(
        protected _id: T,
        protected _scene: QNHScene
    ) { }

    public async activate() {
        await this._onActivate?.(this._scene)
    }

    public async deactivate() {

    }
}

export interface LessonDialogProps {
    nextStep: () => void,
    scene: QNHScene
}