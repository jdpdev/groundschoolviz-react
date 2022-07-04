import { BufferGeometry, Float32BufferAttribute, Line, LineBasicMaterial, Object3D, Vector3 } from "three";
import { QNHSetting } from "./QNHSetting";
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'

export class LiveIsobar extends Object3D {
    private _line: LineGeometry
    private _points: number[]

    constructor(private _qnh: QNHSetting) {
        super()

        this._line = new LineGeometry();
        const points: number[] = []
        const lineMaterial = new LineMaterial({ 
            color: 0x000000,
            linewidth: 0.005
        })

        const settings = _qnh.qnhList
        settings.forEach((s, i) => {
            points.push(2 - (4 / settings.length) * i, this._qnh.heightAtSetting(s, this._qnh.setting), 0)
        })

        this._line.setPositions(points)
        const line = new Line2(this._line, lineMaterial)
        this.add(line)

        this._points = points
    }

    public tick(delta: number) {
        const settings = this._qnh.qnhList
        settings.forEach((s, i) => {
            this._points[i * 3 + 1] = this._qnh.heightAtSetting(s, this._qnh.setting)
        })

        this._line.setPositions(this._points)
    }
}