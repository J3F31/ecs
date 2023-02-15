import { Type } from "@lastolivegames/becsy";

export class BabylonBoxMesh {
    static schema = {
        width: Type.float64,
        height: Type.float64,
        depth: Type.float64
    }
    /**
     * @type {float}
     */
    width = 1
    /**
     * @type {float}
     */
    height = 1
    /**
     * @type {float}
     */
    depth = 1
}