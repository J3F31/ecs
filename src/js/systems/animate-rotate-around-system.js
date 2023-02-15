import { Vector3 } from "@babylonjs/core";
import { System } from "@lastolivegames/becsy";
import { AnimateRotateAround } from "../components/animate-rotate-around";
import { BabylonMesh } from "../components/babylon-mesh";
import { ComponentPosition } from "../components/component-position";

export class SystemAnimateRotateAround extends System {
    #entities = this.query(q => q.current.with(AnimateRotateAround).read.and.with(ComponentPosition, BabylonMesh).write);
    #alpha = 0;
    #beta = 0;
    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(ComponentPosition));
    }

    execute() {
        for (let entity of this.#entities.current) {
            const readAnimation = entity.read(AnimateRotateAround);
            const readTarget = readAnimation.target.read(ComponentPosition);
            const writePosition = entity.write(ComponentPosition);
            const writeMesh = entity.write(BabylonMesh);
            
            // const dist = GetDistance3D(readTarget.x, readTarget.y, readTarget.z, writePosition.x, writePosition.y, writePosition.z)

            // if (dist/readAnimation.separation > 1.1 || dist/readAnimation.separation < .9) {
            //     if (dist > readAnimation.separation) {
            //         writePosition.x = Lerp (writePosition.x, readTarget.x, readAnimation.approachStep);
            //         writePosition.y = Lerp (writePosition.y, readTarget.y, readAnimation.approachStep);
            //         writePosition.z = Lerp (writePosition.z, readTarget.z, readAnimation.approachStep);
            //     }
            //     if (dist < readAnimation.separation) {
            //         writePosition.x = Lerp (writePosition.x, readTarget.x, -readAnimation.approachStep);
            //         writePosition.y = Lerp (writePosition.y, readTarget.y, -readAnimation.approachStep);
            //         writePosition.z = Lerp (writePosition.z, readTarget.z, -readAnimation.approachStep);
            //     }
            //     this.#alpha = Math.acos(DotProduct(writePosition.x, writePosition.y, writePosition.z, 0, 0, 1) / VectorMagnitude(writePosition.x, writePosition.y, writePosition.z));
            //     this.#beta = Math.acos(DotProduct(writePosition.x, writePosition.y, writePosition.z, 0, 1, 0) / VectorMagnitude(writePosition.x, writePosition.y, writePosition.z));
            // }


            writePosition.x = readTarget.x + readAnimation.radiusX * Math.cos(this.#alpha) * Math.sin(this.#beta);
            writePosition.y = readTarget.y + readAnimation.radiusY * Math.sin(this.#alpha) * Math.sin(this.#beta);
            writePosition.z = readTarget.z + readAnimation.radiusZ * Math.cos(this.#beta);
            
            this.#alpha += readAnimation.alphaSpeed;
            this.#beta += readAnimation.betaSpeed;
            
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