import { System } from '@lastolivegames/becsy'
import { Scene, Engine, Vector3, HemisphericLight } from '@babylonjs/core'
import { BabylonScene } from '../components/babylon-scene';
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

export class SystemCreateScene extends System {
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
            entityWrite.scene = scene;

            const light = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), scene)

            engine.runRenderLoop(function () {
                scene.render();
            });
            
            window.addEventListener("resize", function () {
                engine.resize();
            });

            if (!entityWrite.showInspector) return
            scene.debugLayer.show({embedMode: true});
        }
    }
}