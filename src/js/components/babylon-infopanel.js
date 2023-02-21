import { AbstractMesh } from "@babylonjs/core";
import { AdvancedDynamicTexture } from "@babylonjs/gui";
import { Type } from "@lastolivegames/becsy";

export class BabylonInfoPanel {
    static schema = {
        mesh: Type.object,
        texture: Type.object
    }
    /**
     * @type {AbstractMesh}
     */
    mesh = undefined
    /**
     * @type {AdvancedDynamicTexture}
     */
    texture = undefined
}