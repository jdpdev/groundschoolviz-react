import { Object3D } from "three";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { QNHSetting } from "./QNHSetting";

export class SideIsobar extends Object3D {
    private _line: LineGeometry
    private _points: number[]

    constructor(protected _qnh: QNHSetting, private _pressure: number) {
        super()

        this._line = new LineGeometry()
        this._points = [
            1, 0, 0, 
            -1, 0, 0
        ]

        this._line.setPositions(this._points)

        const lineMaterial = new LineMaterial({ 
            color: this.lineColor,
            linewidth: this.lineWidth
        })
        const line = new Line2(this._line, lineMaterial)

        this.add(line)

        this.position.y = this.getHeight()
        this.position.z = -1 + this.zOffset
    }

    public tick(delta: number) {
        this.position.y = this.getHeight()
    }

    protected getHeight() {
        return this._qnh.getPressureAltitude(this._pressure)
    }

    protected get lineColor(): number {
        return 0x00719d
    }

    protected get lineWidth(): number {
        return 0.002
    }

    protected get zOffset(): number {
        return 0
    }
}