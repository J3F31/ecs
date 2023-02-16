import { MeshBuilder, Vector3 } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonSphereMesh } from "../components/babylon-mesh-sphere";
import { BabylonBoxMesh } from "../components/babylon-mesh-box";
import { ComponentPosition } from "../components/component-position";
import { optionsBabylonMesh } from "../components/options-babylon-mesh";
import { ComponentName } from "../components/component-name";
import { BabylonScene } from "../components/babylon-scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { Color3 } from "@babylonjs/core/Maths/math.color";

export class SystemCreateMesh extends System {
    #entities = this.query(q => q.added.with(BabylonMesh, ComponentPosition, ComponentName).write.and.using(BabylonBoxMesh, BabylonSphereMesh).read) 
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
            const positionRead = entity.read(ComponentPosition);
            const nameRead = entity.read(ComponentName);
            const entityWrite = entity.write(BabylonMesh);
            
            //Add mesh types here
            switch (entityWrite.method) {
                case Object.keys(optionsBabylonMesh)[0]:
                    entityWrite.mesh = MeshBuilder.CreateBox(nameRead.name, {}, sceneRead.scene);
                    break;
                case Object.keys(optionsBabylonMesh)[1]:
                    entityWrite.mesh = MeshBuilder.CreateSphere(nameRead.name, {}, sceneRead.scene);
                    break;
                default:
                    console.warn(`The mesh could not be created`);
            }
            if (entityWrite.mesh == undefined) return
            entityWrite.mesh.position = new Vector3(positionRead.x, positionRead.y, positionRead.z);
            const mat = new StandardMaterial('mat', sceneRead.scene)
            mat.diffuseColor = new Color3(1, 0, 1)
            entityWrite.mesh.material = mat
        }
    }
}