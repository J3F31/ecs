import { ComponentSkybox } from "@j3f3/ms";
import { System } from "@lastolivegames/becsy";
import { BabylonCamera } from "../components/babylon-camera";
import { ComponentPosition } from "../components/component-position";

export class SystemCameraPositionUpdate extends System {
    // #cameras = this.query(q => q.added.with(BabylonCamera).read.with(ComponentPosition).write)
    // #environments = this.query(q => q.added.with(ComponentSkybox).read)

    // constructor() {
    //     super()
    //     this.schedule(s => s.afterWritersOf(ComponentSkybox, BabylonCamera))
    // }

    // execute() {
    //     for ()
    // }
}