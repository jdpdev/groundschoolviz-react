import { lerp, smoothstep } from "three/src/math/MathUtils"

export class QNHSetting {
    static LOW_PRESSURE = 28
    static NORMAL_PRESSURE = 29
    static HIGH_PRESSURE = 30

    private _pressure: number = QNHSetting.NORMAL_PRESSURE
    private _temperature: number = 0
    private _setting: number = 29.9

    private _changePressure: ChangePressure | null = null
    
    public get setting() {
        return this._setting
    }

    public get currentAltitude() {
        return this.getPressureAltitude(26)
    }

    constructor() {

    }

    public tick(time: number, delta: number) {
        if (this._changePressure) {
            this._pressure = this._changePressure.step(delta)
        }
    }

    public moveToPressure(pressure: number, onDone: () => void) {
        const callback = () => {
            onDone()
            this._changePressure = null
        }
        this._changePressure = new ChangePressure(this._pressure, pressure, 1, callback)
    }

    /**
     * The altitude of a given pressure reading
     * @param pressure 
     * @returns The pressure altitude
     */
    public getPressureAltitude(pressure: number): number {
        return (this._pressure - pressure) * this.getLapseRate()
    }

    /**
     * Altitude per unit pressure
     */
    private getLapseRate(): number {
        return 0.35
    }
}

class ChangePressure {
    private _elapsedTime: number = 0
    private _isDone: boolean = false
    public get isDone() { return this._isDone }

    constructor(
        private _from: number,
        private _to: number,
        private _duration: number,
        private _callback: () => void
    ) {

    }

    public step(delta: number) {
        if (this._isDone) {
            return this._to
        }

        this._elapsedTime += delta

        if (this._elapsedTime >= this._duration) {
            this._isDone = true
            this._callback()
            return this._to
        }

        return (smoothstep(this._elapsedTime / this._duration, 0, 1) * (this._to - this._from)) + this._from
    }
}