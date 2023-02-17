import { System } from "@lastolivegames/becsy";
import { BabylonInfoPanel } from "../components/babylon-infopanel";

export class SystemToggleInfoPanel extends System {
    #entities = this.query(q => q.added.with(BabylonInfoPanel).read.removed.with(BabylonInfoPanel));

    execute() {
        for (let entity of this.#entities.added) {
            console.log('added')
        }
        for (let entity of this.#entities.removed) {
            console.log('removed')
        }
    }
}