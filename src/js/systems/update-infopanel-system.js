import { System } from "@lastolivegames/becsy";
import { BabylonInfoPanel } from '../components/babylon-infopanel';
import { BabylonScene } from '../components/babylon-scene';
import { ComponentMeshClickable } from '../components/component-mesh-clickable';
import { ComponentPosition } from '../components/component-position';

export class SystemUpdateInfoPanel extends System {
    #entities = this.query(q => q.changed.with(BabylonInfoPanel, ComponentPosition, ComponentMeshClickable).trackWrites);
    // scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene, ComponentMeshClickable));
    }

    execute() {
        for (let entity of this.#entities.changed) {
            const panelRead = entity.read(ComponentMeshClickable);
            const posRead = entity.read(ComponentPosition);
            panelRead.mesh.position.set(posRead.x + 2, posRead.y + 2, posRead.z);
        }
    }
}