import { Object3D } from "three";
import { QNHSetting } from "./QNHSetting";

export class LiveIsobar extends Object3D {
    //private _line: LineGeometry
    //private _points: number[]

    constructor(private _qnh: QNHSetting) {
        super()

        /*this._line = new LineGeometry();
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

        this._points = points*/
    }

    public tick(delta: number) {
        /*const settings = this._qnh.qnhList
        settings.forEach((s, i) => {
            this._points[i * 3 + 1] = this._qnh.heightAtSetting(s, this._qnh.setting)
        })

        this._line.setPositions(this._points)*/
    }
}