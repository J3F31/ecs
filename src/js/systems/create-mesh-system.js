import { MeshBuilder } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { BabylonMesh } from "../components/babylon-mesh";

export class CreateMesh extends System {
    #entities = this.query(q => q.added.with(BabylonMesh).write)
    
    execute() {

        for (let entity of this.#entities.added) {
            const entityRead = entity.read(BabylonMesh);
            const entityWrite = entity.write(BabylonMesh);
            switch (entityRead.method) {
                case 'CreateBox':
                    entityWrite.mesh = MeshBuilder.CreateBox(entityRead.name, {}, entityRead.scene);
                    break;
                case 'CreateSphere':
                    entityWrite.mesh = MeshBuilder.CreateSphere(entityRead.name, {}, entityRead.scene);
                    break;
                default:
                    console.warn('mesh shape not supported yet');
            }

        }
    }
}