//% block="ラジコンカー"
//% color=#6A5ACD
//% icon="\uf1b9"
namespace custom {


    // =========================
    // グローバル変数
    // =========================

    // タイヤの回転速度（初期値）
    let tireSpeed = 500

    // センサのしきい値（初期値）
    let sensorThreshold = 700

    // タイヤの左右を選択するための設定
    export enum TireDirection {
        //% block="右"
        Right,
        //% block="左"
        Left,
    }

    // タイヤの動作を選択するための設定
    export enum TireAction {
        //% block="回す"
        Move,
        //% block="止める"
        Stop
    }

    // センサーの左右を選択するための設定
    export enum SensorDirection {
        //% block="右"
        Right,
        //% block="左"
        Left
    }

    // センサの白黒を選択するための設定
    export enum SensorColor {
        //% block="白"
        White,
        //% block="黒"
        Black
    }

    // タイヤの回転方向の前後を選択するための設定
    export enum TireFrontOrBack {
        //% block="前"
        Front,
        //% block="後ろ"
        Back
    }


    // ===================================
    // ラジコンカー
    // ===================================

    /**
     * 指定したタイヤを回す、または止めます
     * @param direction 操作するタイヤ
     * @param action 行う動作
     * @param speed タイヤの速度
     * @param frontOrback タイヤの回転方向（前か後ろか）
     */
    //% inlineInputMode=inline
    //% block="%directionのタイヤを%frontOrbackに速度%speedで%action"
    //% group="ラジコンカー"
    export function new_controlTire(direction: TireDirection, frontOrback: TireFrontOrBack, speed: number, action: TireAction): void {

        tireSpeed = speed


        // ===================================
        // アナログ出力（操作するタイヤと速度の設定）
        // ===================================

        // アナログ出力の設定
        let targetPin_analog: AnalogPin
        let setSpeed = 0

        if (direction == TireDirection.Right) {
            targetPin_analog = AnalogPin.P13
        } else {
            targetPin_analog = AnalogPin.P15
        }

        if (action == TireAction.Move) {
            setSpeed = tireSpeed
        } else {
            setSpeed = 0
        }


        // ===================================
        // デジタル出力（タイヤの回転方向の設定）
        // ===================================

        // デジタル出力の設定
        let targetPin_digital: DigitalPin
        let voltage = 0

        if (direction == TireDirection.Right) {
            targetPin_digital = DigitalPin.P14
        } else {
            targetPin_digital = DigitalPin.P16
        }

        if (frontOrback == TireFrontOrBack.Back) {
            voltage = 1
        } else {
            voltage = 0
        }

        pins.digitalWritePin(targetPin_digital, voltage)
        pins.analogWritePin(targetPin_analog, setSpeed)
    }


    // ===================================
    // センサー
    // ===================================

    /**
     * センサのしきい値を変更します
     * @param value しきい値
     */
    //% block="しきい値を %value にする"
    //% group="センサー"
    export function setSensorThreshold(value: number): void {
        sensorThreshold = value
    }

    /**
     * 指定した方向のセンサーが白かどうか判定します
     * @param direction センサーの方向
     */
    //% block="%direction のセンサが %color"
    //% group="センサー"
    export function isWhite(direction: SensorDirection, color: SensorColor): boolean {
        let sensorValue = 0

        if (direction == SensorDirection.Left) {
            sensorValue = pins.analogReadPin(AnalogPin.P1)
        } else {
            sensorValue = pins.analogReadPin(AnalogPin.P0)
        }
        if (color == SensorColor.White) {
            return sensorValue < sensorThreshold
        } else {
            return sensorValue > sensorThreshold
        }
        
    }
}