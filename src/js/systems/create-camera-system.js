import { System } from "@lastolivegames/becsy";
import { BabylonCamera } from '../components/babylon-camera'
import { FreeCamera, ArcRotateCamera, Vector3 } from '@babylonjs/core'
import { BabylonScene } from "../components/babylon-scene";
import { BabylonArcRotateCamera } from "../components/babylon-camera-arcrotate";
import { BabylonFreeCamera } from "../components/babylon-camera-free";
import { ComponentPosition } from "../components/component-position";
import { optionsBabylonCamera } from "../components/options-babylon-camera";
import { ComponentName } from "../components/component-name";

export class SystemCreateCamera extends System {
    #entities = this.query(q => q.added.with(BabylonCamera, ComponentPosition, ComponentName).write.and.using(BabylonArcRotateCamera, BabylonFreeCamera).read)
    #scene = this.query(q => q.added.with(BabylonScene).read)

    constructor() {
        super()
        this.schedule(s => s.afterWritersOf(BabylonScene).inAnyOrderWithReadersOf(BabylonScene))
    }

    execute() {
        let sceneRead = undefined
        for (let entity of this.#scene.added) {
            sceneRead = entity.read(BabylonScene);
        }
        for (let entity of this.#entities.added) {
            const entityWrite = entity.write(BabylonCamera);
            const positionRead = entity.read(ComponentPosition);
            const nameRead = entity.read(ComponentName);
            let cameraRead = undefined

            //Add camera types here
            switch (entityWrite.type) {
                case Object.keys(optionsBabylonCamera)[0]:
                    cameraRead = entity.read(BabylonArcRotateCamera);
                    entityWrite.camera = new ArcRotateCamera(nameRead.name, cameraRead.alpha, cameraRead.beta, cameraRead.radius, cameraRead.target, sceneRead.scene);
                    break;
                case Object.keys(optionsBabylonCamera)[1]:
                    // cameraRead = entity.read(BabylonFreeCamera);
                    entityWrite.camera = new FreeCamera(nameRead.name, new Vector3(positionRead.x, positionRead.y, positionRead.z), sceneRead.scene);
                    break;
                default:
                    console.warn(`The camera ${entityWrite.camera} is not supported yet`);
            }
            if (entityWrite.camera == undefined) return
            entityWrite.camera.attachControl();
            entityWrite.camera.inertia = .5;
        }
    }
}

