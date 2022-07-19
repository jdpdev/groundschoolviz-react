import { PerspectiveCamera, Scene, WebGLRenderer } from "three";

export class LessonScene extends Scene {
    protected _camera!: PerspectiveCamera;
    public get camera(): PerspectiveCamera {
        return this._camera;
    }

    public constructor(protected _renderer: WebGLRenderer) {
        super()
    }

    public mount() {

    }

    public dismount() {

    }

    public tick(time: number, delta: number) { }
    public fixedTick(time: number, delta: number) { }
}