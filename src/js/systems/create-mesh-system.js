import { MeshBuilder, Vector3 } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonSphereMesh } from "../components/babylon-mesh-sphere";
import { BabylonBoxMesh } from "../components/babylon-mesh-box";
import { ComponentPosition } from "../components/component-position";
import { optionsBabylonMesh } from "../components/options-babylon-mesh";
import { ComponentName } from "../components/component-name";
import { BabylonScene } from "../components/babylon-scene";

export class SystemCreateMesh extends System {
    #entities = this.query(q => q.added.with(BabylonMesh, ComponentPosition, ComponentName).write.and.using(BabylonBoxMesh, BabylonSphereMesh).read) ;
    scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene).inAnyOrderWithReadersOf(BabylonScene));
    } 
    
    execute() {
        for (let entity of this.#entities.added) {
            const positionRead = entity.read(ComponentPosition);
            const nameRead = entity.read(ComponentName);
            const entityWrite = entity.write(BabylonMesh);
            let sizeRead
            
            //Add mesh types here
            switch (entityWrite.method) {
                case Object.keys(optionsBabylonMesh)[0]:
                    sizeRead = entity.read(BabylonBoxMesh);
                    entityWrite.mesh = MeshBuilder.CreateBox(nameRead.name, {height: sizeRead.height, width: sizeRead.width, depth: sizeRead.depth}, this.scene.value);
                    break;
                case Object.keys(optionsBabylonMesh)[1]:
                    sizeRead = entity.read(BabylonSphereMesh);
                    entityWrite.mesh = MeshBuilder.CreateSphere(nameRead.name, {diameter: sizeRead.diameter}, this.scene.value);
                    break;
                default:
                    console.warn(`The mesh could not be created`);
            }
            if (entityWrite.mesh == undefined) return
            entityWrite.mesh.position = new Vector3(positionRead.x, positionRead.y, positionRead.z);
            entityWrite.mesh.enablePointerMoveEvents = true;
        }
    }
}