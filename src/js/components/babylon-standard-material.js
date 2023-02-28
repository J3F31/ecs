import { Type } from "@lastolivegames/becsy";

export class BabylonStandardMaterial {
    static schema = {
        name: Type.dynamicString(99),
        import: Type.dynamicString(99),
        emissiveColor: Type.vector(Type.float32, 3)
    }
    /**
     * @type {string}
     */
    name = ''
    /**
     * @type {string}
     */
    import = ''
    /**
     * @type {}
     */
    emissiveColor = [0, 0, 0]
}