import { AbstractMesh } from "@babylonjs/core";
import { Type } from "@lastolivegames/becsy";

export class BabylonInfoPanelMesh {
    static schema = {
        value: Type.object
    }
    /**
     * @type {AbstractMesh}
     */
    value = undefined
}