import { Object3D } from "three";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { QNHSetting } from "./QNHSetting";

export class SideIsobar extends Object3D {
    private _line: LineGeometry
    private _points: number[]

    constructor(private _qnh: QNHSetting, private _pressure: number) {
        super()

        this._line = new LineGeometry()
        this._points = [
            1, this._qnh.heightAtSetting(_pressure, this._qnh.setting), 0, 
            -1, this._qnh.heightAtSetting(_pressure, this._qnh.setting), 0
        ]

        this._line.setPositions(this._points)

        const lineMaterial = new LineMaterial({ 
            color: 0x00719d,
            linewidth: 0.002
        })
        const line = new Line2(this._line, lineMaterial)

        this.add(line)

        this.position.z = -1
    }

    public tick(delta: number) {
        this._points[1] = this._qnh.heightAtSetting(this._pressure, this._qnh.setting)
        this._points[4] = this._qnh.heightAtSetting(this._pressure, this._qnh.setting)

        this._line.setPositions(this._points)
    }
}