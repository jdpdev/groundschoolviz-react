import { damp, lerp, smoothstep } from "three/src/math/MathUtils"

const ZERO = 29.3
const LOW = 28
const HIGH = 31

const LOW_MIN = 0.25
const LOW_MAX = 1

const HIGH_MIN = 0.5
const HIGH_MAX = 2

export class QNHSetting {
    static COUNT = 61
    
    private _pressureList: number[]
    private _qnh: number = ZERO

    private _isChangingPressure = false
    private _targetChangeStart: number = 0
    private _targetPressure: number = ZERO
    private _targetChangeRate: number = 0
    private _targetChangeTime: number = 0
    private _onChangeDone: (() => void) | null = null

    public get setting() {
        return this._qnh
    }

    public get qnhList(): number[] {
        return this._pressureList
    }
    
    public get current(): number {
        return this._pressureList[(QNHSetting.COUNT - 1) / 2]
    }

    public get currentAltitude(): number {
        return this.heightAtSetting(this.current, this.setting)
    }

    constructor() {
        this._pressureList = new Array(QNHSetting.COUNT)
        this._pressureList.fill(ZERO)
    }

    public getSettingAtIndex(index: number): number {
        return this._pressureList[index]
    }

    public moveToPressure(pressure: number, onDone: () => void, rate: number = 2) {
        this._targetPressure = pressure
        this._targetChangeStart = this._pressureList[0]
        this._targetChangeRate = rate
        this._targetChangeTime = 0
        this._onChangeDone = onDone
        this._isChangingPressure = true
    }

    public tick(time: number, delta: number) {
        const next = this._isChangingPressure ? this.chaseTargetPressure(delta) : this._pressureList[0]
        this._pressureList.pop()
        this._pressureList.unshift(next)
    }

    private chaseTargetPressure(delta: number) {
        const prev = this._pressureList[0]
        
        const time = this._targetChangeTime / this._targetChangeRate
        const next = smoothstep(time, 0, 1) * (this._targetPressure - this._targetChangeStart) + this._targetChangeStart
        this._targetChangeTime += delta

        if (time >= 1) {
            this._isChangingPressure = false
            this._onChangeDone?.()
        }

        return next
    }

    public heightAtSetting(pressure: number, qnh: number) {
        const altRange = this.getPressureAltRange(pressure)
        const frac = this.getPressureFraction(qnh)
        return lerp(altRange[0], altRange[1], frac)
    }

    private getPressureFraction(p: number) {
        return (p - LOW) / (HIGH - LOW)
    }

    private getPressureAltRange(p: number) {
        const frac = this.getPressureFraction(p)
        return [ lerp(LOW_MIN, HIGH_MIN, frac), lerp(LOW_MAX, HIGH_MAX, frac) ]
    }
}