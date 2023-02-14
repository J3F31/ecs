import { System, World} from '@lastolivegames/becsy'
import { BabylonScene } from './components/babylon-scene'
import { BabylonMesh } from './components/babylon-mesh'
import { WorldDefs } from './systems/ecs-defs'
import { MeshBuilder } from '@babylonjs/core'
import { BabylonCamera } from './components/babylon-camera'

class TestBabylon extends System {

}

document.body.style.overflow = 'hidden';
document.body.style.margin = 0;

const worldRef = await World.create({
    defs: [WorldDefs, TestBabylon]
})

worldRef.createEntity(
    BabylonScene
)
worldRef.createEntity(
    BabylonCamera, {camera: 'ArcRotateCamera'}
)

for (let item of Object.keys(MeshBuilder)) {
    worldRef.createEntity(
        BabylonMesh, {name: 'mesh', method: item}
    )
}

const run = () => {
    worldRef.execute();
    requestAnimationFrame(run);
}
run();