import { System } from '@lastolivegames/becsy'
import { ComponentScene } from '@moyosa/spaces'

export class SystemTest extends System {
    scene = this.singleton.read(ComponentScene)

    execute() {
        console.log(this.scene.value)
    }
}