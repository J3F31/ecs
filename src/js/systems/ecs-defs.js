import { AnimateRotateAround } from "../components/animate-rotate-around";
import { BabylonCamera } from "../components/babylon-camera";
import { BabylonArcRotateCamera } from "../components/babylon-camera-arcrotate";
import { BabylonFreeCamera } from "../components/babylon-camera-free";
import { BabylonInfoPanel } from "../components/babylon-infopanel";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonBoxMesh } from '../components/babylon-mesh-box'
import { BabylonSphereMesh } from "../components/babylon-mesh-sphere";
import { BabylonScene } from "../components/babylon-scene";
import { ComponentMeshClickable } from "../components/component-clickable";
import { ComponentName } from "../components/component-name";
import { ComponentPosition } from "../components/component-position";
import { SystemAnimateRotateAround } from "./animate-rotate-around-system";
import { SystemCheckMeshClickable } from "./check-mesh-clickable-system";
import { SystemCreateCamera } from "./create-camera-system";
import { SystemCreateMesh } from "./create-mesh-system";
import { SystemCreateScene } from "./create-scene-system";
import { SystemToggleInfoPanel } from "./toggle-infopanel-system";
import { SystemUpdateMeshPosition } from "./update-mesh-position-system";

export const WorldDefs = [
    SystemCreateScene, SystemCreateMesh, SystemCreateCamera,
    SystemAnimateRotateAround, SystemToggleInfoPanel,
    SystemUpdateMeshPosition, SystemCheckMeshClickable,

    BabylonScene, 
    BabylonMesh, BabylonBoxMesh, BabylonSphereMesh,
    BabylonInfoPanel,
    BabylonCamera, BabylonFreeCamera, BabylonArcRotateCamera,

    ComponentPosition, ComponentName, ComponentMeshClickable,
    
    AnimateRotateAround,
]