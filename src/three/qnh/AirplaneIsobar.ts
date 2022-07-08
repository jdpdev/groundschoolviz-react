import { Airplane } from "../Airplane";
import { QNHSetting } from "./QNHSetting";
import { SideIsobar } from "./SideIsobar";

export class AirplaneIsobar extends SideIsobar {
    constructor(qnh: QNHSetting, private _airplane: Airplane) {
        super(qnh, 0)
    }

    protected get lineColor(): number {
        return 0xea00ff
    }

    protected get lineWidth(): number {
        return 0.003
    }

    protected getHeight(): number {
        return this._airplane ? this._airplane.position.y : 0
    }
}