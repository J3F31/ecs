import { Type } from "@lastolivegames/becsy";
import { AdvancedDynamicTexture } from '@babylonjs/gui'

export class BabylonAdvancedDynamicTexture {
    static schema = {
        value: Type.object,
    }
    /**
     * @type {AdvancedDynamicTexture}
     */
    value = undefined
}