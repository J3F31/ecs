import { component, System, World, Type} from '@lastolivegames/becsy'
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

const worldRef = await World.create({
    defs: [WorldDefs, TestBabylon]
})

const findComponentInWorldDefs = (id) => {
    let component = undefined;
    for (const val in WorldDefs) {
        if (WorldDefs[val].name == id) component = WorldDefs[val];
    }
    if (component == undefined) console.warn(`could not find component ${id}`);
    return component;
}

worldRef.build(sys => {
    const savedEntities = {}
    for (const [name, components] of Object.entries(entityDefinitions.entities)) {
        const entity = sys.createEntity();
        for (let [componentName, componentProperties] of Object.entries(components)) {
            savedEntities[name] = entity;

            const component = findComponentInWorldDefs(componentName);
            for (let fieldName in componentProperties) {
                if(component.schema[fieldName] === Type.ref || component.schema[fieldName].type === Type.ref) {
                    componentProperties[fieldName] = savedEntities[componentProperties[fieldName]]
                }
            }
            entity.add(component, componentProperties);
        }
    }
})

const run = () => {
    worldRef.execute();
    requestAnimationFrame(run);
}
run();