import { Type } from "@lastolivegames/becsy";

export class AnimateRotateAround {
    static schema = {
        usePosAsRadius: Type.boolean,
        radiusX: Type.float32,
        radiusY: Type.float32,
        radiusZ: Type.float32,
        currentBeta: Type.float32,
        angle: Type.float32,
        speed: Type.float32,
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
    * @type {float}
    */
    currentBeta = 0
    /**
    * @type {float}
    */
    angle = 0
    /**
    * @type {float}
    */
    speed = 0
    /**
    * @type {Entity}
    */
    target = undefined
}