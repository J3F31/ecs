import { MeshBuilder, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, Button } from '@babylonjs/gui'
import { System } from "@lastolivegames/becsy";
import { BabylonAdvancedDynamicTexture } from '../components/babylon-AdvancedDynamicTexture';
import { BabylonInfoPanelMesh } from "../components/babylon-infopanel-mesh";
import { BabylonInfoPanelTarget } from '../components/babylon-infopanel-target';
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonScene } from '../components/babylon-scene';

export class SystemToggleInfoPanel extends System {
    #entities = this.query(q => q.added.with(BabylonMesh, BabylonInfoPanelTarget).read.and.current.with(BabylonMesh, BabylonInfoPanelTarget).and.removed.with(BabylonInfoPanelTarget).read);
    scene = this.singleton.read(BabylonScene);
    advancedDynamicTexture = this.singleton.read(BabylonAdvancedDynamicTexture);
    infopanel = this.singleton.write(BabylonInfoPanelMesh);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonMesh).inAnyOrderWithWritersOf(BabylonInfoPanelMesh, BabylonAdvancedDynamicTexture))
    }

    execute() {
        for (let entity of this.#entities.added) {
            console.log('added')
            const meshRead = entity.read(BabylonMesh);

            this.advancedDynamicTexture.value.parseFromSnippetAsync('#NVMR1V');
            this.infopanel.value.position = new Vector3(meshRead.mesh.position.x + 2, meshRead.mesh.position.y + 2, meshRead.mesh.position.z);
            this.infopanel.value.setEnabled(true);
        }
        for (let entity of this.#entities.current) {
            const meshRead = entity.read(BabylonMesh);
            this.infopanel.value.position = new Vector3(meshRead.mesh.position.x + 2, meshRead.mesh.position.y + 2, meshRead.mesh.position.z);
        }
        for (let entity of this.#entities.removed) {
            console.log('removed')
            this.infopanel.value.setEnabled(false);
        }
    }
}