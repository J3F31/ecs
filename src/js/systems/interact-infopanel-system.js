import { System } from "@lastolivegames/becsy";
import { BabylonAdvancedDynamicTexture } from "../components/babylon-AdvancedDynamicTexture";
import { BabylonCamera } from "../components/babylon-camera";
import { BabylonInfoPanelMesh } from "../components/babylon-infopanel";
import { BabylonScene } from "../components/babylon-scene";

export class SystemInteractInfoPanel extends System {
    // #cameras = this.query(q => q.current.with(BabylonCamera).read);
    // scene = this.singleton.read(BabylonScene);
    // infopanel = this.singleton.read(BabylonInfoPanelMesh);
    // advancedDynamicTexture = this.singleton.read(BabylonAdvancedDynamicTexture);

    // constructor() {
    //     super();
    //     this.schedule(s => s.afterWritersOf(BabylonScene, BabylonCamera, BabylonAdvancedDynamicTexture, BabylonInfoPanelMesh))
    // }

    // execute() {
    //     let isGUIInteracting = false
    //     for (let camera of this.#cameras.current) {
    //         const cameraRead = camera.read(BabylonCamera);
    //         if (this.advancedDynamicTexture.value._capturedPointerIds.size > 0) {
    //             console.log('interacted')
    //             cameraRead.camera.detachControl();
    //         }
    //         else if (!cameraRead.camera.inputs.attachElement()) cameraRead.camera.attachControl();
    //     }
    // }
}