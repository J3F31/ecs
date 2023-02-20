import { Type } from '@lastolivegames/becsy'
import { Scene } from '@babylonjs/core'

export class BabylonScene {
    static schema = {
        value: Type.weakObject,
        showInspector: Type.boolean
    }
    /**
     * @type {Scene}
     */
    value = undefined
    /**
     * @type {boolean}
     */
    showInspector = false
}