import { Camera } from "@babylonjs/core";
import { Type } from "@lastolivegames/becsy";
import { babylonCameraTypes } from "./babylon-camera-types";

export class BabylonCamera {
    static schema = {
        camera: Type.object,
        type: Type.staticString(babylonCameraTypes)
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