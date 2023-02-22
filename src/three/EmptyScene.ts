import { Color, PerspectiveCamera, WebGLRenderer } from "three";
import { LessonScene } from "../LessonScene";

export class EmptyScene extends LessonScene {
    public static ID = 'emptyscene'

    public constructor(renderer: WebGLRenderer) {
        super(renderer)
        this.background = new Color(0x00b7ff)

        this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    }
}