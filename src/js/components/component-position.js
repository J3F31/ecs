import { Type } from "@lastolivegames/becsy";

export class ComponentPosition {
    static schema = {
        x: Type.float32,
        y: Type.float32,
        z: Type.float32
    }
    /**
     * @type {number}
     */
    x = 0
    /**
     * @type {number}
     */
    y = 0
    /**
     * @type {number}
     */
    z = 0
}