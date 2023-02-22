import { AmbientLight, Color, DirectionalLight, Object3D, PerspectiveCamera, WebGLRenderer } from "three";
import { Airplane } from "../Airplane";
import { GroundTile } from "../GroundTile";

import { QNHSetting } from "./QNHSetting";
import { SceneryGenerator } from "../SceneryGenerator";
import { SideIsobar } from "./SideIsobar";
import { AirplaneIsobar } from "./AirplaneIsobar";
import { ConstantIsobar } from "./ConstantIsobar";
import { LessonScene } from "../../LessonScene";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class QNHScene extends LessonScene {
    public static ID = 'qnhscene'

    private _controls: OrbitControls | null = null

    private _mainLight!: DirectionalLight
    private _ambientLight!: AmbientLight

    private _airplane: Airplane
    private _ground: GroundTile
    private _scenery: SceneryGenerator
    private _qnh: QNHSetting

    private _isobarWall: Object3D
    private _sideIsobars: SideIsobar[]
    private _airplaneIsobar: AirplaneIsobar
    private _constantIsobar: ConstantIsobar

    public get altimeterSetting() {
        return this._qnh.setting
    }

    public get altitude() {
        return 0.24601
    }

    constructor(renderer: WebGLRenderer) {
        super(renderer)
        this.background = new Color(0x00b7ff)

        this.setupCamera()
        this.setupLights()
        //this.setupEffects()

        this._qnh = new QNHSetting()

        this._airplane = new Airplane()
        this._airplane.position.y = this._qnh.currentAltitude
        this.add(this._airplane)

        this._ground = new GroundTile()
        this.add(this._ground)

        this._scenery = new SceneryGenerator(1)
        this._scenery.position.y = 0
        this.add(this._scenery)

        this._isobarWall = new Object3D()
        this._isobarWall.position.set(0, 0, 0)
        //this.add(this._isobarWall)

        this._airplaneIsobar = new AirplaneIsobar(this._qnh, this._airplane)
        this._isobarWall.add(this._airplaneIsobar)

        this._constantIsobar = new ConstantIsobar(this._qnh, this._qnh.currentAltitude)

        this._sideIsobars = [
            new SideIsobar(this._qnh, 23),
            new SideIsobar(this._qnh, 24),
            new SideIsobar(this._qnh, 25),
            new SideIsobar(this._qnh, 26),
            new SideIsobar(this._qnh, 27),
            new SideIsobar(this._qnh, 28),
            new SideIsobar(this._qnh, 29),
            new SideIsobar(this._qnh, 30),
            new SideIsobar(this._qnh, 31),
            new SideIsobar(this._qnh, 32)
        ]
        this._sideIsobars.forEach(si => this._isobarWall.add(si))
    }

    public mount() {
        this._controls = new OrbitControls(this._camera, this._renderer.domElement)
    }

    public dismount() {
        super.dismount()
        this.parent?.remove(this)
        this._controls?.dispose()
        this._controls = null
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

    public tick(time: number, delta: number) {
        //this._isobar.tick(delta)
        this._scenery.tick(delta)
        this._sideIsobars.forEach(si => si.tick(delta))
        this._airplaneIsobar.tick(delta)
        this._constantIsobar.tick(delta)

        this._airplane.tick(time, delta)
        this._airplane.position.y = this._qnh.currentAltitude
    }

    public fixedTick(time: number, delta: number) {
        this._qnh.tick(time, delta)
    }

    public async highPressure() {
        return new Promise<void>((resolve, reject) => {
            this._qnh.moveToPressure(QNHSetting.HIGH_PRESSURE, () => {
                resolve()
            })
        })
    }

    public async normalPressure() {
        return new Promise<void>((resolve, reject) => {
            this._qnh.moveToPressure(QNHSetting.NORMAL_PRESSURE, resolve)
        })
    }

    public async lowPressure() {
        return new Promise<void>((resolve, reject) => {
            this._qnh.moveToPressure(QNHSetting.LOW_PRESSURE, resolve)
        })
    }

    public toggleIsobars() {
        this.add(this._constantIsobar)
        this.add(this._isobarWall)
    }
}