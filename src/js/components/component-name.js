import { Type } from "@lastolivegames/becsy";

export class ComponentName {
    static schema = {
        name: Type.dynamicString(99)
    }
    /**
     * @type {string}
     */
    name = ''
}