import { Vector3 } from "@babylonjs/core";
import { Type } from "@lastolivegames/becsy";

export class BabylonArcRotateCamera {
    static schema = {
        alpha: Type.float64,
        beta: Type.float64,
        radius: Type.float64,
        target: Type.object,
    }
    /**
    * @type {float}
    */
    alpha = 0
    /**
    * @type {float}
    */
    beta = 0
    /**
    * @type {float}
    */
    radius = 0
    /**
    * @type {Vector3}
    */
    target = Vector3.Zero
}