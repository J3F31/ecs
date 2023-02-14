import { BabylonCamera } from "../components/babylon-camera";
import { BabylonMesh } from "../components/babylon-mesh";
import { BabylonScene } from "../components/babylon-scene";
import { CreateCamera } from "./create-camera-system";
import { CreateMesh } from "./create-mesh-system";
import { CreateScene } from "./create-scene-system";

export const WorldDefs = [
    CreateScene, CreateMesh, CreateCamera,
    BabylonScene, BabylonMesh, BabylonCamera


    
]