import { Type } from "@lastolivegames/becsy";
import { AbstractMesh } from '@babylonjs/core'
import { optionsBabylonMesh } from "./options-babylon-mesh";

export class BabylonMesh {
    static schema = {
        mesh: Type.object,
        method: Type.staticString(Object.keys(optionsBabylonMesh))
    }
    /**
     * @type {AbstractMesh}
     */
    mesh = undefined
    /**
     * @type {string}
     */
    method = undefined
}