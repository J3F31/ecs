import { System } from "@lastolivegames/becsy";
import { AnimateRotateAround } from "../components/animate-rotate-around";
import { ComponentPosition } from "../components/component-position";

export class SystemAnimateRotateAround extends System {
    #entities = this.query(q => q.current.with(AnimateRotateAround, ComponentPosition).write);

    constructor() {
        super();
        this.schedule(s => s.afterWritersOf(ComponentPosition));
    }

    execute() {
        for (let entity of this.#entities.current) {
            const readAnimation = entity.read(AnimateRotateAround);
            const readTarget = readAnimation.target.read(ComponentPosition);
            const writePosition = entity.write(ComponentPosition);

            if (readAnimation.usePosAsRadius) {
                const writeAnimation = entity.write(AnimateRotateAround);
                writeAnimation.radiusX = writePosition.x;
                writeAnimation.radiusY = writePosition.y;
                writeAnimation.radiusZ = writePosition.z;
                writeAnimation.usePosAsRadius = false;
            }

            writePosition.x = readTarget.x + readAnimation.radiusX * Math.cos(readAnimation.angle) * Math.sin(this.time * readAnimation.speed);
            writePosition.y = readTarget.y + readAnimation.radiusY * Math.sin(readAnimation.angle) * Math.sin(this.time * readAnimation.speed);
            writePosition.z = readTarget.z + readAnimation.radiusZ * Math.cos(this.time * readAnimation.speed);
        }
    }
    
}