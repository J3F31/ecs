import { MeshBuilder } from '@babylonjs/core';
import { AdvancedDynamicTexture } from '@babylonjs/gui'
import { System } from "@lastolivegames/becsy";
import { BabylonInfoPanel } from '../components/babylon-infopanel';
import { BabylonMesh } from '../components/babylon-mesh';
import { BabylonScene } from '../components/babylon-scene';
import { ComponentMeshClickable } from '../components/component-mesh-clickable';

export class SystemCreateInfoPanel extends System {
    #entities = this.query(q => q.added.with(BabylonInfoPanel, BabylonMesh, ComponentMeshClickable).write);
    scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene));
    }

    execute() {
        for (let entity of this.#entities.added) {
            const panelWrite = entity.write(ComponentMeshClickable);
            const meshRead = entity.read(BabylonMesh);

            const bounds = meshRead.mesh.getBoundingInfo().maximum
            const pos = meshRead.mesh.position

            panelWrite.mesh = MeshBuilder.CreatePlane('GUITargetMesh', {size: 2}, this.scene.value);
            panelWrite.mesh.position.set(pos.x + bounds.x, pos.y + bounds.y, pos.z + bounds.z);
            panelWrite.texture = AdvancedDynamicTexture.CreateForMesh(panelWrite.mesh);
            panelWrite.texture.parseFromSnippetAsync('#FLGXJT#1');
        }
    }
}