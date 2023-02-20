import { System } from "@lastolivegames/becsy";
import { BabylonScene } from "../components/babylon-scene";
import { AdvancedDynamicTexture } from '@babylonjs/gui'
import { BabylonAdvancedDynamicTexture } from "../components/babylon-AdvancedDynamicTexture";
import { BabylonInfoPanelMesh } from "../components/babylon-infopanel-mesh";

export class SystemCreateAdvancedDynamicTexture extends System {
    advancedDynamicTexture = this.singleton.write(BabylonAdvancedDynamicTexture);
    infopanel = this.singleton.read(BabylonInfoPanelMesh);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene, BabylonInfoPanelMesh));
    }

    initialize() {
        const texture = AdvancedDynamicTexture.CreateForMesh(this.infopanel.value);
        this.advancedDynamicTexture.value = texture;
    }
}