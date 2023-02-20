import { MeshBuilder } from '@babylonjs/core';
import { System } from "@lastolivegames/becsy";
import { BabylonInfoPanelMesh } from '../components/babylon-infopanel-mesh';
import { BabylonScene } from '../components/babylon-scene';

export class SystemCreateInfoPanels extends System {
    infopanel = this.singleton.write(BabylonInfoPanelMesh);
    scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene));
    }

    initialize() {
        this.infopanel.value = MeshBuilder.CreatePlane('GUITargetMesh', {size: 2}, this.scene.value);
        this.infopanel.value.setEnabled(false);
        this.infopanel.value.billboardMode = 7;
    }
}