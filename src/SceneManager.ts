import { Clock, WebGLRenderer } from "three";
import { LessonScene } from "./LessonScene";

type SceneList = Record<string, typeof LessonScene>

export class SceneManager {
    private _currentScene: LessonScene | null = null
    public get currentScene() {
        return this._currentScene
    }

    private _lastFixedTick: number = 0

    public constructor(
        private _scenes: SceneList,
        private _emptySceneId: string
    ) { 
        if (_scenes[_emptySceneId] == null) {
            throw new Error('Must include the emptySceneId in the scene list')
        }

        // this.loadScene(_emptySceneId)
    }

    public loadScene(renderer: WebGLRenderer, id: string) {
        if (this._currentScene) {
            this._currentScene.dismount()
        }

        const next = this.findScene(id)

        if (next != null) {
            this._currentScene = new next(renderer)
        } else {
            const empty = this.findScene(this._emptySceneId)
            this._currentScene = new empty(renderer)
        }

        this._currentScene.mount()
    }

    private findScene(id: string): typeof LessonScene {
        return this._scenes[id]
    }

    public tick(clock: Clock) {
        let delta = clock.getDelta()
        const fdelta = clock.elapsedTime - this._lastFixedTick

        if (this._currentScene == null) {
            return
        }

        if (delta > 0.1) {
            delta = 0
        }

        this._currentScene.tick(clock.elapsedTime, delta)

        if (fdelta > 0.03) {
            this._currentScene.fixedTick(clock.elapsedTime, fdelta)
            this._lastFixedTick = clock.elapsedTime
        }
    }
}