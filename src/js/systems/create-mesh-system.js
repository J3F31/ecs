import { MeshBuilder, Vector3, StandardMaterial, Texture, Color3 } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonSphereMesh } from "../components/babylon-mesh-sphere";
import { BabylonBoxMesh } from "../components/babylon-mesh-box";
// import { ComponentPosition } from "../components/component-position";
import { ComponentPosition, ComponentBabylonMesh, ComponentScene } from "@j3f3/ms";
import { optionsBabylonMesh } from "../components/options-babylon-mesh";
import { ComponentName } from "../components/component-name";
import { BabylonScene } from "../components/babylon-scene";

export class SystemCreateMeshTemp extends System {
    #entities = this.query(q => q.added.with(ComponentBabylonMesh).write.and.using(ComponentPosition, ComponentName, BabylonBoxMesh, BabylonSphereMesh).read) ;
    // scene = this.singleton.read(BabylonScene);
    #scenes = this.query(q => q.added.with(ComponentScene))

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene).inAnyOrderWithReadersOf(BabylonScene));
    } 
    
    execute() {
        for (let entity of this.#entities.added) {
            const sceneRead = this.#scenes.added[0].read(ComponentScene)
            let name;
            if (entity.has(ComponentName)) name = entity.read(ComponentName).name;
            else name = 'noName';

            const entityWrite = entity.write(ComponentBabylonMesh);
            let sizeRead
            
            //Add mesh types here
            switch (entityWrite.method) {
                case Object.keys(optionsBabylonMesh)[0]:
                    if (entity.has(BabylonBoxMesh)) {
                        sizeRead = entity.read(BabylonBoxMesh);
                        entityWrite.mesh = MeshBuilder.CreateBox(name, {width: sizeRead.width, height: sizeRead.height, depth: sizeRead.depth}, sceneRead.value);
                    }
                    else entityWrite.mesh = MeshBuilder.CreateBox(name, {}, sceneRead.value);
                    break;
                case Object.keys(optionsBabylonMesh)[1]:
                    if (entity.has(BabylonSphereMesh)) {
                        sizeRead = entity.read(BabylonSphereMesh);
                        entityWrite.mesh = MeshBuilder.CreateSphere(name, {diameter: sizeRead.diameter}, sceneRead.value);
                    }
                    else entityWrite.mesh = MeshBuilder.CreateSphere(name, {}, sceneRead.value);
                    break;
                default:
                    console.warn(`The mesh could not be created`);
            }
            if (entityWrite.mesh == undefined || !entity.has(ComponentPosition)) return
            const positionRead = entity.read(ComponentPosition);
            const entityRead = entity.read(ComponentBabylonMesh);
            entityRead.mesh.position = new Vector3(positionRead.x, positionRead.y, positionRead.z);
            entityRead.mesh.enablePointerMoveEvents = true;
        }
    }
}