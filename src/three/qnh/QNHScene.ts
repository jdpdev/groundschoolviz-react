import { AmbientLight, Camera, Color, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { Airplane } from "../Airplane";
import { GroundTile } from "../GroundTile";

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { QNHSetting } from "./QNHSetting";
import { Isobar } from "./Isobar";

export class QNHScene extends Scene {
    private _camera!: PerspectiveCamera;
    public get camera(): PerspectiveCamera {
        return this._camera;
    }

    private _mainLight!: DirectionalLight
    private _ambientLight!: AmbientLight

    private _airplane: Airplane
    private _ground: GroundTile
    private _qnh: QNHSetting
    private _isobar: Isobar

    public get altimeterSetting() {
        return this._qnh.setting
    }

    public get altitude() {
        return 0.3
    }

    constructor(private _renderer: WebGLRenderer) {
        super()
        this.background = new Color(0x00b7ff)

        this.setupCamera()
        this.setupLights()
        this.setupEffects()

        this._qnh = new QNHSetting()
        this._isobar = new Isobar(this._qnh)

        this._airplane = new Airplane()
        this._airplane.position.y = this._qnh.currentAltitude
        this.add(this._airplane)

        this._ground = new GroundTile()
        this.add(this._ground)
    }

    private setupCamera() {
        this._camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this._camera.position.x = -2.2
        this._camera.position.z = 2.2
        this._camera.position.y = 1.5
        this._camera.zoom = 1
    }

    private setupLights() {
        this._mainLight = new DirectionalLight( 0xffffff, 1 );
        this._mainLight.color.setHSL( 0.1, 1, 0.95 );
        this._mainLight.position.set( - 1, 1.75, 1 );
        this._mainLight.position.multiplyScalar( 30 );
        this._mainLight.castShadow = true;
        this._mainLight.shadow.camera.near = 50
        this._mainLight.shadow.camera.far = 1000
        this._mainLight.shadow.bias = 0.00001
        this._mainLight.shadow.mapSize.width = 2048;
        this._mainLight.shadow.mapSize.height = 2048;
        this.add( this._mainLight );

        this._ambientLight = new AmbientLight(0xb1e9ff, 0.3)
        this.add(this._ambientLight)
    }

    private setupEffects() {
        //

        const renderPass = new RenderPass( this, this._camera );
        renderPass.clearColor = new Color( 0, 0, 0 );
        renderPass.clearAlpha = 0;

        //

        const fxaaPass = new ShaderPass( FXAAShader );

        const copyPass = new ShaderPass( CopyShader );

        const composer1 = new EffectComposer( this._renderer );
        composer1.addPass( renderPass );
        composer1.addPass( copyPass );

        //

        const pixelRatio = this._renderer.getPixelRatio();
        const container = document.body

        fxaaPass.material.uniforms[ 'resolution' ].value.x = 1 / ( container!.offsetWidth * pixelRatio );
        fxaaPass.material.uniforms[ 'resolution' ].value.y = 1 / ( container!.offsetHeight * pixelRatio );

        const composer2 = new EffectComposer( this._renderer );
        composer2.addPass( renderPass );
        composer2.addPass( fxaaPass );
    }

    public tick(time: number, delta: number) {
        this._isobar.tick(delta)

        this._airplane.tick(time, delta)
        this._airplane.position.y = this._qnh.currentAltitude
    }

    public fixedTick(time: number, delta: number) {
        this._qnh.tick(time, delta)
    }

    public highPressure() {
        this._qnh.moveToPressure(QNHSetting.HIGH_PRESSURE, () => {})
    }

    public normalPressure() {
        this._qnh.moveToPressure(QNHSetting.NORMAL_PRESSURE, () => {})
    }

    public lowPressure() {
        this._qnh.moveToPressure(QNHSetting.LOW_PRESSURE, () => {})
    }
}