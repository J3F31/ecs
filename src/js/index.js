import {  System, World, Type} from '@lastolivegames/becsy'
import { WorldDefs } from './ecs-defs'
import entityDefinitions from './config.json'

import '../assets/renders/scene10/Scene10_f.jpeg'
import '../assets/renders/scene10/Scene10_u.jpeg'
import '../assets/renders/scene10/Scene10_l.jpeg'
import '../assets/renders/scene10/Scene10_b.jpeg'
import '../assets/renders/scene10/Scene10_d.jpeg'
import '../assets/renders/Scene10/Scene10_r.jpeg'

class TestBabylon extends System {
    // scene = this.singleton.read(BabylonScene)

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

            // for (let fieldName in componentProperties) {
            //     if(component.schema[fieldName] === Type.ref || component.schema[fieldName].type === Type.ref) {
            //         componentProperties[fieldName] = savedEntities[componentProperties[fieldName]]
            //     }
            // }
            if (component != undefined) entity.add(component, componentProperties);
        }
    }
    for (const [name, components] of Object.entries(entityDefinitions.environments)) {
        const entity = sys.createEntity();
        for (let [componentName, componentProperties] of Object.entries(components)) {
            savedEntities[name] = entity;

            const component = findComponentInWorldDefs(componentName);

            for (let fieldName in componentProperties) {
                if (fieldName == 'assets') {
                    componentProperties[fieldName] = [
                        `../assets/renders/${name}/${name}_f.jpeg`,
                        `../assets/renders/${name}/${name}_u.jpeg`,
                        `../assets/renders/${name}/${name}_l.jpeg`,
                        `../assets/renders/${name}/${name}_b.jpeg`,
                        `../assets/renders/${name}/${name}_d.jpeg`,
                        `../assets/renders/${name}/${name}_r.jpeg`,
                    ]
                }
            }
            if (component != undefined) entity.add(component, componentProperties);
        }
    }

})

const run = () => {
    worldRef.execute();
    requestAnimationFrame(run);
}
run();