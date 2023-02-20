import { System, World} from '@lastolivegames/becsy'
import { BabylonMesh } from './components/babylon-mesh'
import { BabylonBoxMesh } from './components/babylon-mesh-box'
import { BabylonSphereMesh } from './components/babylon-mesh-sphere'
import { WorldDefs } from './ecs-defs'
import { BabylonCamera } from './components/babylon-camera'
import { BabylonFreeCamera } from './components/babylon-camera-free'
import { ComponentPosition } from './components/component-position'
import { ComponentName } from './components/component-name'
import { optionsBabylonMesh } from './components/options-babylon-mesh'
import { optionsBabylonCamera } from './components/options-babylon-camera'
import { AnimateRotateAround } from './components/animate-rotate-around'
import { ComponentMeshClickable } from './components/component-clickable'
import entityDefinitions from './config.json'

class TestBabylon extends System {
    execute() {
        document.body.style.overflow = 'hidden';
        document.body.style.margin = 0;
        const inspector = document.getElementById('embed-host');
        if (inspector == undefined) return
        inspector.style.position = 'absolute';
    }
}

console.log(WorldDefs[9].name)

const worldRef = await World.create({
    defs: [WorldDefs, TestBabylon]
})

worldRef.build(sys => {
    for (const [key, value] of Object.entries(entityDefinitions.entities)) {
        // sys.createEntity(value)
        console.log(value)
    }
    const entityBabylonCamera = sys.createEntity(
        BabylonCamera, {type: Object.keys(optionsBabylonCamera)[1]},
        BabylonFreeCamera,
        ComponentPosition, {x: 0, y: 0, z: 10},
        ComponentName, {name: 'Camera'}
    )

    const entityBoxMesh1 = sys.createEntity(
        BabylonMesh, {method: Object.keys(optionsBabylonMesh)[0]},
        BabylonBoxMesh, {width: 1, height: 1, depth: 1},
        ComponentPosition, {x: 0, y: 0, z: 0},
        ComponentName, {name: 'Box1'},
        ComponentMeshClickable
    )

    const entityShpereMesh1 = sys.createEntity(
        BabylonMesh, {method: Object.keys(optionsBabylonMesh)[1]},
        BabylonSphereMesh, {diameter: 1},
        ComponentPosition, {x: 2, y: 2, z: 2},
        ComponentName, {name: 'Sphere1'},
        AnimateRotateAround, {usePosAsRadius: true, angle: 0, speed: -1, target: entityBoxMesh1},
        ComponentMeshClickable
    )

    // const entityShpereMesh2 = sys.createEntity(
    //    BabylonMesh, {method: Object.keys(optionsBabylonMesh)[1]},
    //    BabylonSphereMesh, {diameter: 1},
    //    ComponentPosition, {x: 2, y: 2, z: 2},
    //    ComponentName, {name: 'Sphere2'},
    //    AnimateRotateAround, {usePosAsRadius: true, angle: Math.PI / 2, speed: -1, target: entityBoxMesh1},
    //    ComponentMeshClickable
    // )

    // const entityShpereMesh3 = sys.createEntity(
    //     BabylonMesh, {method: Object.keys(optionsBabylonMesh)[1]},
    //     BabylonSphereMesh, {diameter: 1},
    //     ComponentPosition, {x: 2, y: 2, z: 2},
    //     ComponentName, {name: 'Sphere3'},
    //     AnimateRotateAround, {usePosAsRadius: true, angle: 0, speed: 1, target: entityBoxMesh1},
    //     ComponentMeshClickable
    // )

    // const entityShpereMesh4 = sys.createEntity(
    //    BabylonMesh, {method: Object.keys(optionsBabylonMesh)[1]},
    //    BabylonSphereMesh, {diameter: 1},
    //    ComponentPosition, {x: 2, y: 2, z: 2},
    //    ComponentName, {name: 'Sphere4'},
    //    AnimateRotateAround, {usePosAsRadius: true, angle: Math.PI / 2, speed: 1, target: entityBoxMesh1},
    //    ComponentMeshClickable
    // )
})

const run = () => {
    worldRef.execute();
    requestAnimationFrame(run);
}
run();