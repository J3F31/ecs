import { Color3, NoiseProceduralTexture, ProceduralTexture, StandardMaterial, Texture } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { BabylonStandardMaterial } from "../components/babylon-standard-material";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonScene } from "../components/babylon-scene";

import '../../assets/textures/moon_diffuse.jpg'
import '../../assets/textures/earth_diffuse.jpg'
import '../../assets/textures/sun_diffuse.jpg'

export class SystemCreateStandardMaterial extends System {
    #entities = this.query(q => q.added.with(BabylonMesh, BabylonStandardMaterial).read)
    // scene = this.singleton.read(BabylonScene)

    constructor() {
        super()
        this.schedule(s => s.afterWritersOf(BabylonScene, BabylonMesh))
    }

    execute() {
        for (let entity of this.#entities.added) {
            const meshRead = entity.read(BabylonMesh)
            const matRead = entity.read(BabylonStandardMaterial)

            const mat = new StandardMaterial(matRead.name, this.scene.value)
            mat.diffuseTexture = new Texture(matRead.import, this.scene.value)
            mat.emissiveColor = new Color3(matRead.emissiveColor[0], matRead.emissiveColor[1], matRead.emissiveColor[2])
            meshRead.mesh.material = mat 
        }
    }
}