import { System } from '@lastolivegames/becsy'
import { Scene, Engine, Vector3, HemisphericLight } from '@babylonjs/core'
import { BabylonScene } from '../components/babylon-scene';
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

export class SystemCreateScene extends System {
    scene = this.singleton.write(BabylonScene);

    initialize() {
        const canvas = document.createElement('canvas');
        canvas.style.width = 100 + 'dvw';
        canvas.style.height = 100 + 'dvh';
        document.body.append(canvas)

        const engine = new Engine(canvas);
        const scene = new Scene(engine);

        // scene.skipPointerDownPicking = true;
        // scene.skipPointerMovePicking = true;
        // scene.skipPointerUpPicking = true;
        scene.useRightHandedSystem = true;

        this.scene.value = scene;
        this.scene.showInspector = true;

        const light = new HemisphericLight('hemiLight', new Vector3(0, 1, 0), scene)

        engine.runRenderLoop(function () {
            scene.render();
        });
        
        window.addEventListener("resize", function () {
            engine.resize();
        });

        if (!this.scene.showInspector) return
        scene.debugLayer.show({
            embedMode: true
        });
        
    }
}