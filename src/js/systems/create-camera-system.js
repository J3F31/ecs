import { System } from "@lastolivegames/becsy";
import { BabylonCamera } from '../components/babylon-camera'
import { FreeCamera, ArcRotateCamera, Vector3 } from '@babylonjs/core'
import { BabylonScene } from "../components/babylon-scene";

export class CreateCamera extends System {
    #entities = this.query(q => q.added.with(BabylonCamera).write)

    #scene = this.query(q => q.added.with(BabylonScene).read)

    execute() {
        let sceneRead = undefined
        for (let entity of this.#scene.added) {
            sceneRead = entity.read(BabylonScene);
        }
        for (let entity of this.#entities.added) {
            const entityWrite = entity.write(BabylonCamera);

            switch (entityWrite.camera) {
                case 'ArcRotateCamera':
                    entityWrite.camera = new ArcRotateCamera("Camera", 0, 0, 10, new Vector3(0, 0, 0), sceneRead.scene);
                    break;
                case 'FreeCamera':
                    entityWrite.camera = new FreeCamera("Camera", new Vector3(0, 5, -10), sceneRead.scene);
                    break;
                default:
                    console.warn('camera not supported yet');
            }
        }
    }
}

