import { Type } from '@lastolivegames/becsy'
import { Engine, Scene } from '@babylonjs/core'

export class BabylonScene {
    static schema = {
        scene: Type.object,
        engine: Type.object,
        canvas: Type.object,
    }
    /**
     * @type {Scene}
     */
    scene = undefined
    /**
     * @type {Engine}
     */
    engine = undefined
    /**
     * @type {HTMLCanvasElement}
     */
    canvas = undefined
}