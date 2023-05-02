import { ActionManager, Color3, ExecuteCodeAction, StandardMaterial } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { BabylonInfoPanel } from "../components/babylon-infopanel";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonScene } from "../components/babylon-scene";
import { ComponentMeshClickable } from "../components/component-mesh-clickable";

export class SystemCheckMeshClickable extends System {
    #entities = this.query(q => q.added.with(BabylonMesh, ComponentMeshClickable).read);
    // scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonMesh, BabylonScene));
    }

    execute() {
        for (let entity of this.#entities.added) {
            const meshRead = entity.read(BabylonMesh);

            meshRead.mesh.isPickable = true;
            meshRead.mesh.actionManager = new ActionManager(this.scene.value);

            //ON MOUSE ENTER
            meshRead.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
                if (!entity.has(BabylonInfoPanel)) entity.add(BabylonInfoPanel);
                else entity.remove(BabylonInfoPanel);
            }));
        }
    }
}