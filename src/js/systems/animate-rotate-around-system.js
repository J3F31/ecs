import { Vector3 } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { AnimateRotateAround } from "../components/animate-rotate-around";
import { BabylonMesh } from "../components/babylon-mesh";
import { ComponentPosition } from "../components/component-position";

export class SystemAnimateRotateAround extends System {
    #entities = this.query(q => q.current.with(AnimateRotateAround).write.and.with(ComponentPosition, BabylonMesh).write);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(ComponentPosition));
    }

    execute() {
        for (let entity of this.#entities.current) {
            const writeAnimation = entity.write(AnimateRotateAround);
            const readTarget = writeAnimation.target.read(ComponentPosition);
            const writePosition = entity.write(ComponentPosition);
            const writeMesh = entity.write(BabylonMesh);
            
            // const dist = GetDistance3D(readTarget.x, readTarget.y, readTarget.z, writePosition.x, writePosition.y, writePosition.z)

            // if (dist/writeAnimation.separation > 1.1 || dist/writeAnimation.separation < .9) {
            //     if (dist > writeAnimation.separation) {
            //         writePosition.x = Lerp (writePosition.x, readTarget.x, writeAnimation.approachStep);
            //         writePosition.y = Lerp (writePosition.y, readTarget.y, writeAnimation.approachStep);
            //         writePosition.z = Lerp (writePosition.z, readTarget.z, writeAnimation.approachStep);
            //     }
            //     if (dist < writeAnimation.separation) {
            //         writePosition.x = Lerp (writePosition.x, readTarget.x, -writeAnimation.approachStep);
            //         writePosition.y = Lerp (writePosition.y, readTarget.y, -writeAnimation.approachStep);
            //         writePosition.z = Lerp (writePosition.z, readTarget.z, -writeAnimation.approachStep);
            //     }
            //     this.#alpha = Math.acos(DotProduct(writePosition.x, writePosition.y, writePosition.z, 0, 0, 1) / VectorMagnitude(writePosition.x, writePosition.y, writePosition.z));
            //     this.#beta = Math.acos(DotProduct(writePosition.x, writePosition.y, writePosition.z, 0, 1, 0) / VectorMagnitude(writePosition.x, writePosition.y, writePosition.z));
            // }
            if (writeAnimation.usePosAsRadius) {
              writeAnimation.radiusX = writePosition.x;
              writeAnimation.radiusY = writePosition.y;
              writeAnimation.radiusZ = writePosition.z;
              writeAnimation.usePosAsRadius = false;
            }

            writePosition.x = readTarget.x + writeAnimation.radiusX * Math.cos(writeAnimation.currentAlpha) * Math.sin(writeAnimation.currentBeta);
            writePosition.y = readTarget.y + writeAnimation.radiusY * Math.sin(writeAnimation.currentAlpha) * Math.sin(writeAnimation.currentBeta);
            writePosition.z = readTarget.z + writeAnimation.radiusZ * Math.cos(writeAnimation.currentBeta);

            //if (writePosition.y > -.1 || writePosition.y < .1) writeAnimation.radiusY = -writeAnimation.radiusY;
            
            if (writeAnimation.currentAlpha > 2 * Math.PI) writeAnimation.currentAlpha = -writeAnimation.currentAlpha;
            writeAnimation.currentAlpha += writeAnimation.alphaSpeed;

            if (writeAnimation.currentBeta > Math.PI) writeAnimation.currentBeta = -writeAnimation.currentBeta;
            writeAnimation.currentBeta += writeAnimation.betaSpeed;
            
            console.log(writePosition.y, writeAnimation.currentAlpha, writeAnimation.currentBeta)

            writeMesh.mesh.position = new Vector3(writePosition.x, writePosition.y, writePosition.z);
        }
        function Lerp(a, b, t) {
            return (1 - t) * a + t * b;
        }
        function GetDistance3D(x1, y1, z1, x2, y2, z2) {
            const x = (x2 - x1) * (x2 - x1);
            const y = (y2 - y1) * (y2 - y1);
            const z = (z2 - z1) * (z2 - z1);
            return Math.sqrt(x + y + z);
        }
        function VectorMagnitude(x, y, z) {
            const mag = Math.sqrt(x*x + y*y + z*z);
            return mag;
        }
        function DotProduct(x1, y1, z1, x2, y2, z2) {
            const a = x1 * x2;
            const b = y1 * y2;
            const c = z1 * z2;
            return a + b + c;
        }
    }
    
}