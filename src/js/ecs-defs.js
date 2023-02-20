import { AnimateRotateAround } from "./components/animate-rotate-around";
import { BabylonCamera } from "./components/babylon-camera";
import { BabylonArcRotateCamera } from "./components/babylon-camera-arcrotate";
import { BabylonFreeCamera } from "./components/babylon-camera-free";
import { BabylonAdvancedDynamicTexture } from "./components/babylon-AdvancedDynamicTexture";
import { BabylonInfoPanelMesh } from "./components/babylon-infopanel-mesh";
import { BabylonMesh } from "./components/babylon-mesh";
import { BabylonBoxMesh } from './components/babylon-mesh-box'
import { BabylonSphereMesh } from "./components/babylon-mesh-sphere";
import { BabylonScene } from "./components/babylon-scene";
import { ComponentMeshClickable } from "./components/component-clickable";
import { ComponentName } from "./components/component-name";
import { ComponentPosition } from "./components/component-position";
import { SystemAnimateRotateAround } from "./systems/animate-rotate-around-system";
import { SystemCheckMeshClickable } from "./systems/check-mesh-clickable-system";
import { SystemCreateCamera } from "./systems/create-camera-system";
import { SystemCreateInfoPanels } from "./systems/create-infopanels-system";
import { SystemCreateMesh } from "./systems/create-mesh-system";
import { SystemCreateScene } from "./systems/create-scene-system";
import { SystemToggleInfoPanel } from "./systems/toggle-infopanel-system";
import { SystemUpdateMeshPosition } from "./systems/update-mesh-position-system";
import { SystemCreateAdvancedDynamicTexture } from "./systems/create-AdvancedDynamicTexture-system";
import { BabylonInfoPanelTarget } from "./components/babylon-infopanel-target";

export const WorldDefs = [
    SystemCreateScene, SystemCreateMesh, SystemCreateCamera, SystemCreateInfoPanels,
    SystemCreateAdvancedDynamicTexture,
    SystemAnimateRotateAround, SystemToggleInfoPanel,
    SystemUpdateMeshPosition, SystemCheckMeshClickable,

    BabylonScene, 
    BabylonMesh, BabylonBoxMesh, BabylonSphereMesh,
    BabylonInfoPanelMesh, BabylonInfoPanelTarget,
    BabylonAdvancedDynamicTexture,
    BabylonCamera, BabylonFreeCamera, BabylonArcRotateCamera,

    ComponentPosition, ComponentName, ComponentMeshClickable,
    
    AnimateRotateAround,
]