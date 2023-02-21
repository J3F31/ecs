import { MeshBuilder } from '@babylonjs/core';
import { System } from "@lastolivegames/becsy";
import { BabylonInfoPanelMesh } from '../components/babylon-infopanel-mesh';
import { BabylonScene } from '../components/babylon-scene';

export class SystemCreateInfoPanels extends System {
    #entities = this.query(q => q.added(BabylonInfoPanelMesh).write.and.changed.with(BabylonInfoPanelMesh).trackWrites.and.removed.with(BabylonInfoPanelMesh).write);
    scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene));
    }

    execute() {
        for (let entity of this.#entities.added) {
            const panelWrite = entity.write(BabylonInfoPanelMesh)
        }
        this.infopanel.value = MeshBuilder.CreatePlane('GUITargetMesh', {size: 2}, this.scene.value);
        this.infopanel.value.setEnabled(false);
        this.infopanel.value.billboardMode = 7;
    }
}