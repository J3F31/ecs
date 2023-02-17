import { ActionManager, ExecuteCodeAction, HighlightLayer } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { BabylonInfoPanel } from "../components/babylon-infopanel";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonScene } from "../components/babylon-scene";
import { ComponentMeshClickable } from "../components/component-clickable";

export class SystemCheckMeshClickable extends System {
    #entities = this.query(q => q.added.with(BabylonMesh, ComponentMeshClickable).read);
    #scene = this.query(q => q.added.with(BabylonScene).read);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonMesh, BabylonScene));
    }

    execute() {
        let sceneRead;
        let highlightLayer
        for (let entity of this.#scene.added) {
            sceneRead = entity.read(BabylonScene);
            highlightLayer = new HighlightLayer('hl', sceneRead.scene, {
                isStroke: true
            });
        }
        if (highlightLayer == undefined) return
        for (let entity of this.#entities.added) {
            const meshRead = entity.read(BabylonMesh);

            meshRead.mesh.isPickable = true;
            meshRead.mesh.actionManager = new ActionManager(sceneRead.scene);

            //ON MOUSE ENTER
            meshRead.mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPickTrigger, () => {
                if (!entity.has(BabylonInfoPanel)) entity.add(BabylonInfoPanel);
                else entity.remove(BabylonInfoPanel);
            }));
        }
    }
}