// import { AnimateRotateAround } from "./components/animate-rotate-around";
// import { BabylonCamera } from "./components/babylon-camera";
// import { BabylonArcRotateCamera } from "./components/babylon-camera-arcrotate";
// import { BabylonFreeCamera } from "./components/babylon-camera-free";
// import { BabylonInfoPanel } from "./components/babylon-infopanel";
// import { BabylonMesh } from "./components/babylon-mesh";
// import { BabylonBoxMesh } from './components/babylon-mesh-box'
// import { BabylonSphereMesh } from "./components/babylon-mesh-sphere";
// import { BabylonScene } from "./components/babylon-scene";
// import { ComponentMeshClickable } from "./components/component-mesh-clickable";
// import { ComponentName } from "./components/component-name";
// import { ComponentPosition } from "./components/component-position";
// import { SystemAnimateRotateAround } from "./systems/animate-rotate-around-system";
// import { SystemCheckMeshClickable } from "./systems/check-mesh-clickable-system";
// import { SystemCreateCamera } from "./systems/create-camera-system";
// import { SystemCreateInfoPanel } from "./systems/create-infopanel-system";
// import { SystemCreateMesh } from "./systems/create-mesh-system";
// import { SystemCreateScene } from "./systems/create-scene-system";
// import { SystemUpdateMeshPosition } from "./systems/update-mesh-position-system";
// import { SystemUpdateInfoPanel } from "./systems/update-infopanel-system";
// import { SystemRemoveInfoPanel } from "./systems/remove-infopanel-system";
// import { BabylonStandardMaterial } from "./components/babylon-standard-material";
// import { SystemCreateStandardMaterial } from "./systems/create-standard-material-system";

import { 
ComponentBabylonObject, 
ComponentCamera, 
ComponentCameraFOV, 
ComponentCanvas, 
ComponentEulerRotation, 
ComponentMesh, 
ComponentPosition3D, 
ComponentQuaternionRotation, 
ComponentScale3D, 
ComponentScene, 
SystemAllowTransform, 
SystemApplyTransform, 
SystemCreateCamera, 
SystemCreateCanvas, 
SystemCreateScene, 
SystemUpdateCamera 
} from "@moyosa/spaces";




// import { ComponentScene, ComponentSkybox, SystemCreateBabylonScene, SystemCreateSkybox, ComponentBabylonMesh, SystemCreateMesh, SystemCreateCamera, ComponentCamera, ComponentPosition } from "@j3f3/ms";



export const WorldDefs = [
    //Camera Components
    ComponentCameraFOV, ComponentCamera,

    //Camera Systems
    SystemCreateCamera, SystemUpdateCamera,

    //Scene Components
    ComponentScene, ComponentCanvas,

    //Scene Systems
    SystemCreateScene, SystemCreateCanvas,

    //Transform Components
    ComponentPosition3D, ComponentQuaternionRotation, ComponentEulerRotation, ComponentScale3D, ComponentBabylonObject,

    //Transform Systems
    SystemAllowTransform, SystemApplyTransform,

    //Mesh Components
    ComponentMesh,

    // SystemCreateCamera, ComponentCamera,
    // ComponentScene, SystemCreateBabylonScene, 
    // ComponentBabylonMesh, 
    // ComponentPosition,
    // ComponentSkybox, SystemCreateSkybox,
    // SystemCreateMesh,
    // SystemCreateCamera,
    // SystemCreateScene, 
    // SystemCreateInfoPanel, SystemUpdateInfoPanel, SystemRemoveInfoPanel,
    // SystemAnimateRotateAround,
    // SystemUpdateMeshPosition, SystemCheckMeshClickable,
    // SystemCreateStandardMaterial,

    // BabylonScene, 
    // BabylonMesh, BabylonBoxMesh, BabylonSphereMesh,
    // BabylonStandardMaterial,
    // BabylonInfoPanel,
    // BabylonCamera, BabylonFreeCamera, BabylonArcRotateCamera,

    // ComponentPosition, 
    // ComponentName,
    // ComponentMeshClickable,

    // AnimateRotateAround,
]