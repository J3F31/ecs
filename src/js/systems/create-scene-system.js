import { System } from '@lastolivegames/becsy'
import { Scene, Engine, Vector3, Color3, PointLight, CubeTexture, MeshBuilder, StandardMaterial, Texture } from '@babylonjs/core'
import { BabylonScene } from '../components/babylon-scene';
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

import '../../assets/renders/scene0/Scene0_f.jpeg'
import '../../assets/renders/scene0/Scene0_u.jpeg'
import '../../assets/renders/scene0/Scene0_l.jpeg'
import '../../assets/renders/scene0/Scene0_b.jpeg'
import '../../assets/renders/scene0/Scene0_d.jpeg'
import '../../assets/renders/scene0/Scene0_r.jpeg'

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
        scene.clearColor.set(.1, .1, .1, 1);

        this.scene.value = scene;
        this.scene.showInspector = true;

        //const light = new HemisphericLight('hemiLight', new Vector3(1, 0, 0), scene);
        //const light = new DirectionalLight("dirLight", new Vector3(-1, 0, -.7), scene);
        const light = new PointLight('pointLight', new Vector3(0, 0, 0), scene);
        light.diffuse = new Color3(1, .8, .7);
        ////light.groundColor = new Color3(0, 0, 0);
        light.specular = new Color3(0, 0, 0);
        light.intensity = 5;

        const cubemap = CubeTexture.CreateFromImages([
			 `../../assets/renders/scene0/Scene0_f.jpeg`,
			 `../../assets/renders/scene0/Scene0_u.jpeg`,
			 `../../assets/renders/scene0/Scene0_l.jpeg`,
			 `../../assets/renders/scene0/Scene0_b.jpeg`,
			 `../../assets/renders/scene0/Scene0_d.jpeg`,
			 `../../assets/renders/scene0/Scene0_r.jpeg`,
		], scene, true)
        const skybox = MeshBuilder.CreateBox('skybox', {size: 100}, scene)
        const skyboxMat = new StandardMaterial('skybox', scene)
        skyboxMat.backFaceCulling = false
        skyboxMat.disableLighting = true
        skyboxMat.reflectionTexture = cubemap
        skyboxMat.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
        skybox.material = skyboxMat

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