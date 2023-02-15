import { Type } from "@lastolivegames/becsy";

export class AnimateRotateAround {
    static schema = {
        radiusX: Type.float32,
        radiusY: Type.float32,
        radiusZ: Type.float32,
        alphaSpeed: Type.float32,
        betaSpeed: Type.float32,
        target: Type.ref
    }
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