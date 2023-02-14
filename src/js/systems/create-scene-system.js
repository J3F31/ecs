import { System } from '@lastolivegames/becsy'
import { Scene, Engine, Color3 } from '@babylonjs/core'
import { BabylonScene } from '../components/babylon-scene';

export class CreateScene extends System {
    #entities = this.query(q => q.added.removed.with(BabylonScene).write)

    execute() {
        for (let entity of this.#entities.added) {
            const canvas = document.createElement('canvas');
            canvas.style.width = 100 + 'dvw';
            canvas.style.height = 100 + 'dvh';
            document.body.append(canvas)

            const entityWrite = entity.write(BabylonScene);
            entityWrite.canvas = canvas;

            const engine = new Engine(canvas);
            entityWrite.engine = Engine;
            const scene = new Scene(engine);
            scene.ambientColor = new Color3(0.3, 0.3, 0.3);
            console.log(scene)
            entityWrite.scene = scene;
        }
    }
}