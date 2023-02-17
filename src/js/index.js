import { System, World} from '@lastolivegames/becsy'
import { BabylonScene } from './components/babylon-scene'
import { BabylonMesh } from './components/babylon-mesh'
import { BabylonBoxMesh } from './components/babylon-mesh-box'
import { BabylonSphereMesh } from './components/babylon-mesh-sphere'
import { WorldDefs } from './systems/ecs-defs'
import { Vector3 } from '@babylonjs/core'
import { BabylonCamera } from './components/babylon-camera'
import { BabylonArcRotateCamera } from './components/babylon-camera-arcrotate'
import { BabylonFreeCamera } from './components/babylon-camera-free'
import { ComponentPosition } from './components/component-position'
import { ComponentName } from './components/component-name'
import { optionsBabylonMesh } from './components/options-babylon-mesh'
import { optionsBabylonCamera } from './components/options-babylon-camera'
import { AnimateRotateAround } from './components/animate-rotate-around'

class TestBabylon extends System {

}

document.body.style.overflow = 'hidden';
document.body.style.margin = 0;

const worldRef = await World.create({
    defs: [WorldDefs, TestBabylon]
})

worldRef.build(sys => {
    const entityBabylonScene = sys.createEntity(
        BabylonScene, {showInspector: true}
    )
    
    const entityBabylonCamera = sys.createEntity(
        BabylonCamera, {type: Object.keys(optionsBabylonCamera)[1]},
        BabylonFreeCamera,
        ComponentPosition, {x: 0, y: 0, z: -10},
        ComponentName, {name: 'Camera'}
    )
    
    const entityBoxMesh = sys.createEntity(
        BabylonMesh, {method: Object.keys(optionsBabylonMesh)[0]},
        BabylonBoxMesh, {width: .5, height: .5, depth: .5},
        ComponentPosition, {x: 0, y: 0, z: 0},
        ComponentName, {name: 'Box'}
    )

    const entityShpereMesh1 = sys.createEntity(
        BabylonMesh, {method: Object.keys(optionsBabylonMesh)[1]},
        BabylonSphereMesh, {diameter: 1},
        ComponentPosition, {x: 2, y: 2, z: 2},
        ComponentName, {name: 'Sphere1'},
        AnimateRotateAround, {usePosAsRadius: true, angle: 1, speed: 2, target: entityBoxMesh}
    )

    const entityShpereMesh2 = sys.createEntity(
       BabylonMesh, {method: Object.keys(optionsBabylonMesh)[1]},
       BabylonSphereMesh, {diameter: 2},
       ComponentPosition, {x: 2, y: 2, z: 2},
       ComponentName, {name: 'Sphere2'},
       AnimateRotateAround, {usePosAsRadius: true, angle: 1, speed: 3, target: entityBoxMesh}
    )

    const entityShpereMesh3 = sys.createEntity(
        BabylonMesh, {method: Object.keys(optionsBabylonMesh)[1]},
        BabylonSphereMesh, {diameter: 3},
        ComponentPosition, {x: 2, y: 2, z: 2},
        ComponentName, {name: 'Sphere3'},
        AnimateRotateAround, {usePosAsRadius: true, angle: 1, speed: 2, target: entityBoxMesh}
    )

    const entityShpereMesh4 = sys.createEntity(
       BabylonMesh, {method: Object.keys(optionsBabylonMesh)[1]},
       BabylonSphereMesh, {diameter: 4},
       ComponentPosition, {x: 2, y: 2, z: 2},
       ComponentName, {name: 'Sphere4'},
       AnimateRotateAround, {usePosAsRadius: true, angle: 1, speed: 1, target: entityBoxMesh}
    )
})




const run = () => {
    worldRef.execute();
    requestAnimationFrame(run);
}
run();