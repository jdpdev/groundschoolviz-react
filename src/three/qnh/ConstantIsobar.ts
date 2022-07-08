import { QNHSetting } from "./QNHSetting";
import { SideIsobar } from "./SideIsobar";

export class ConstantIsobar extends SideIsobar {
    constructor(qnh: QNHSetting, private _height: number) {
        super(qnh, 0)
    }

    protected get lineColor(): number {
        return 0xd5ff00
    }

    protected get lineWidth(): number {
        return 0.003
    }

    protected getHeight(): number {
        return this._height
    }

    protected get zOffset(): number {
        return -0.001
    }
}