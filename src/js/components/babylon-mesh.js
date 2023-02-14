import { Type } from "@lastolivegames/becsy";
import { AbstractMesh, MeshBuilder, Scene } from '@babylonjs/core'
import { BabylonScene } from "./babylon-scene";

export class BabylonMesh {
    static schema = {
        mesh: Type.object,
        name: Type.dynamicString(999),
        method: Type.staticString(Object.keys(MeshBuilder)),
        scene: Type.object
    }
    /**
     * @type {AbstractMesh}
     */
    mesh = undefined
    /**
     * @type {string}
     */
    name = undefined
    /**
     * @type {string}
     */
    method = undefined
    /**
     * @type {Scene}
     */
    scene = undefined
}