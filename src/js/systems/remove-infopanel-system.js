import { System } from "@lastolivegames/becsy";
import { BabylonInfoPanel } from '../components/babylon-infopanel';
import { BabylonScene } from '../components/babylon-scene';
import { ComponentMeshClickable } from "../components/component-mesh-clickable";

export class SystemRemoveInfoPanel extends System {
    #entities = this.query(q => q.removed.with(BabylonInfoPanel, ComponentMeshClickable).write);
    scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene, ComponentMeshClickable));
    }

    execute() {
        for (let entity of this.#entities.removed) {
            const panelWrite = entity.write(ComponentMeshClickable);
            panelWrite.mesh.dispose();
            panelWrite.texture.dispose();
        }
    }
}