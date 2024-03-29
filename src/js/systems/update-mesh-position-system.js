import { System } from "@lastolivegames/becsy";
import { BabylonMesh } from "../components/babylon-mesh";
import { ComponentPosition } from "../components/component-position";

export class SystemUpdateMeshPosition extends System {
    #entities = this.query(q => q.changed.with(BabylonMesh, ComponentPosition).trackWrites);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(ComponentPosition));
    }

    execute() {
        for (let entity of this.#entities.changed) {
            const posRead = entity.read(ComponentPosition);
            const meshRead = entity.read(BabylonMesh);

            meshRead.mesh.position.set(posRead.x, posRead.y, posRead.z);
        }
    }
}