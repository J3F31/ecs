import { MeshBuilder, Vector3, StandardMaterial, Texture, Color3 } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonSphereMesh } from "../components/babylon-mesh-sphere";
import { BabylonBoxMesh } from "../components/babylon-mesh-box";
import { ComponentPosition } from "../components/component-position";
import { optionsBabylonMesh } from "../components/options-babylon-mesh";
import { ComponentName } from "../components/component-name";
import { BabylonScene } from "../components/babylon-scene";

import '../../assets/textures/moon_diffuse.jpg'
import '../../assets/textures/earth_diffuse.jpg'
import '../../assets/textures/sun_diffuse.jpg'

export class SystemCreateMesh extends System {
    #entities = this.query(q => q.added.with(BabylonMesh).write.and.using(ComponentPosition, ComponentName, BabylonBoxMesh, BabylonSphereMesh).read) ;
    scene = this.singleton.read(BabylonScene);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(BabylonScene).inAnyOrderWithReadersOf(BabylonScene));
    } 
    
    execute() {
        for (let entity of this.#entities.added) {
            let name;
            if (entity.has(ComponentName)) name = entity.read(ComponentName).name;
            else name = 'noName';

            const entityWrite = entity.write(BabylonMesh);
            let sizeRead
            let mat
            
            //Add mesh types here
            switch (entityWrite.method) {
                case Object.keys(optionsBabylonMesh)[0]:
                    if (entity.has(BabylonSphereMesh)) {
                        sizeRead = entity.read(BabylonSphereMesh);
                        entityWrite.mesh = MeshBuilder.CreateBox(name, {width: sizeRead.width, height: sizeRead.height, depth: sizeRead.depth}, this.scene.value);
                    }
                    else entityWrite.mesh = MeshBuilder.CreateBox(name, {}, this.scene.value);
                    break;
                case Object.keys(optionsBabylonMesh)[1]:
                    if (entity.has(BabylonSphereMesh)) {
                        sizeRead = entity.read(BabylonSphereMesh);
                        entityWrite.mesh = MeshBuilder.CreateSphere(name, {diameter: sizeRead.diameter}, this.scene.value);
                    }
                    else entityWrite.mesh = MeshBuilder.CreateSphere(name, {}, this.scene.value);
                    break;
                case Object.keys(optionsBabylonMesh)[2]:
                    if (entity.has(BabylonSphereMesh)) {
                        sizeRead = entity.read(BabylonSphereMesh);
                        entityWrite.mesh = MeshBuilder.CreateSphere(name, {diameter: sizeRead.diameter}, this.scene.value);
                    }
                    else entityWrite.mesh = MeshBuilder.CreateSphere(name, {}, this.scene.value);

                    mat = new StandardMaterial('moonMaterial', this.scene.value);
                    mat.diffuseTexture = new Texture('../../assets/textures/moon_diffuse.jpg', this.scene.value);
                    entityWrite.mesh.material = mat;
                    break;
                case Object.keys(optionsBabylonMesh)[3]:
                    if (entity.has(BabylonSphereMesh)) {
                        sizeRead = entity.read(BabylonSphereMesh);
                        entityWrite.mesh = MeshBuilder.CreateSphere(name, {diameter: sizeRead.diameter}, this.scene.value);
                    }
                    else entityWrite.mesh = MeshBuilder.CreateSphere(name, {}, this.scene.value);

                    mat = new StandardMaterial('earthMaterial', this.scene.value);
                    mat.diffuseTexture = new Texture('../../assets/textures/earth_diffuse.jpg', this.scene.value);
                    entityWrite.mesh.material = mat;
                    break;
                case Object.keys(optionsBabylonMesh)[4]:
                    if (entity.has(BabylonSphereMesh)) {
                        sizeRead = entity.read(BabylonSphereMesh);
                        entityWrite.mesh = MeshBuilder.CreateSphere(name, {diameter: sizeRead.diameter}, this.scene.value);
                    }
                    else entityWrite.mesh = MeshBuilder.CreateSphere(name, {}, this.scene.value);

                    mat = new StandardMaterial('sunMaterial', this.scene.value);
                    mat.diffuseTexture = new Texture('../../assets/textures/sun_diffuse.jpg', this.scene.value);
                    mat.emissiveColor = new Color3(.9, .8, .7);
                    entityWrite.mesh.material = mat;
                    break;
                default:
                    console.warn(`The mesh could not be created`);
            }
            if (entityWrite.mesh == undefined || !entity.has(ComponentPosition)) return
            const positionRead = entity.read(ComponentPosition);
            const entityRead = entity.read(BabylonMesh);
            entityRead.mesh.position = new Vector3(positionRead.x, positionRead.y, positionRead.z);
            entityRead.mesh.enablePointerMoveEvents = true;
        }
    }
}