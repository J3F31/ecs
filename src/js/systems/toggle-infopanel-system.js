import { Vector3 } from '@babylonjs/core';
import { System } from "@lastolivegames/becsy";
import { BabylonAdvancedDynamicTexture } from '../components/babylon-AdvancedDynamicTexture';
import { BabylonInfoPanelMesh } from "../components/babylon-infopanel";
import { BabylonInfoPanelTarget } from '../components/babylon-infopanel-target';
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonScene } from '../components/babylon-scene';
import { ComponentPosition } from '../components/component-position';

export class SystemToggleInfoPanel extends System {
    #entities = this.query(q => q.added.with(ComponentPosition, BabylonInfoPanelTarget).read.and.changed.with(ComponentPosition, BabylonInfoPanelTarget).trackWrites.and.removed.with(BabylonInfoPanelTarget).read);
    scene = this.singleton.read(BabylonScene);
    advancedDynamicTexture = this.singleton.read(BabylonAdvancedDynamicTexture);
    infopanel = this.singleton.write(BabylonInfoPanelMesh);
    #clone

    constructor() {
        super();
        this.schedule(s => s.inAnyOrderWithWritersOf(BabylonInfoPanelMesh, BabylonAdvancedDynamicTexture))
    }

    execute() {
        for (let entity of this.#entities.added) {
            const posRead = entity.read(ComponentPosition);
            const 

            
            this.advancedDynamicTexture.value.parseFromSnippetAsync('#NVMR1V');
            this.#clone = this.infopanel.value.clone('clone')
            this.#clone.position = new Vector3(posRead.x + 2, posRead.y + 2, posRead.z);
            this.#clone.setEnabled(true);
        }
        for (let entity of this.#entities.changed) {
            const posRead = entity.read(ComponentPosition);
            this.#clone.position = new Vector3(posRead.x + 2, posRead.y + 2, posRead.z);
        }
        for (let entity of this.#entities.removed) {
            this.#clone.dispose();
        }
    }
}