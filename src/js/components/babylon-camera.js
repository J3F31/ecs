import { Camera } from "@babylonjs/core";
import { Type } from "@lastolivegames/becsy";
import { optionsBabylonCamera } from "./options-babylon-camera";

export class BabylonCamera {
    static schema = {
        camera: Type.object,
        type: Type.staticString(Object.keys(optionsBabylonCamera))
    }
    /**
    * @type {Camera}
    */
    camera = undefined
    /**
    * @type {string}
    */
    type = undefined
}