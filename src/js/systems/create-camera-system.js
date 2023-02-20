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
    #entities = this.query(q => q.added.with(BabylonCamera, ComponentPosition, ComponentName).write.and.using(BabylonArcRotateCamera, BabylonFreeCamera).read);
    scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene).inAnyOrderWithReadersOf(BabylonScene));
    }

    execute() {
        for (let entity of this.#entities.added) {
            const entityWrite = entity.write(BabylonCamera);
            const positionRead = entity.read(ComponentPosition);
            const nameRead = entity.read(ComponentName);
            let cameraAtrRead = undefined

            //Add camera types here
            switch (entityWrite.type) {
                case Object.keys(optionsBabylonCamera)[0]:
                    cameraAtrRead = entity.read(BabylonArcRotateCamera);
                    entityWrite.camera = new ArcRotateCamera(nameRead.name, cameraAtrRead.alpha, cameraAtrRead.beta, cameraAtrRead.radius, cameraAtrRead.target, this.scene.value);
                    break;
                case Object.keys(optionsBabylonCamera)[1]:
                    // cameraAtrRead = entity.read(BabylonFreeCamera);
                    entityWrite.camera = new FreeCamera(nameRead.name, new Vector3(positionRead.x, positionRead.y, positionRead.z), this.scene.value);
                    entityWrite.camera.rotation.y = -Math.PI;
                    break;
                default:
                    console.warn(`The camera ${entityWrite.camera} is not supported yet`);
            }
            if (entityWrite.camera == undefined) return
            const cameraRead = entity.read(BabylonCamera);
            cameraRead.camera.attachControl();
            cameraRead.camera.inertia = .5;
        }
    }
}

