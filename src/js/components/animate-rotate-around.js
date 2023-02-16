import { Type } from "@lastolivegames/becsy";

export class AnimateRotateAround {
    static schema = {
        usePosAsRadius: Type.boolean,
        radiusX: Type.float32,
        radiusY: Type.float32,
        radiusZ: Type.float32,
        alphaAngleIncrease: Type.boolean,
        betaAngleIncrease: Type.boolean,
        currentAlpha: Type.float32,
        currentBeta: Type.float32,
        alphaSpeed: Type.float32,
        betaSpeed: Type.float32,
        target: Type.ref
    }
    /**
    * @type {boolean}
    */
    usePosAsRadius = false
    /**
    * @type {float}
    */
    radiusX = 0
    /**
    * @type {float}
    */
    radiusY = 0
    /**
    * @type {float}
    */
    radiusZ = 0
    /**
    * @type {boolean}
    */
    alphaAngleIncrease = true
    /**
    * @type {boolean}
    */
    betaAngleIncrease = true
    /**
    * @type {float}
    */
    currentAlpha = 0
    /**
    * @type {float}
    */
    currentBeta = 0
    /**
    * @type {float}
    */
    alphaSpeed = 0
    /**
    * @type {float}
    */
    betaSpeed = 0
    /**
    * @type {Entity}
    */
    target = undefined
}