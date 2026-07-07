import IClassType from '../interfaces/types/class-type';

export abstract class BaseClass {
    private components: Map<Function, unknown>;

    constructor() {
        this.components = new Map();
    }

    public SetComponent<T>(component: IClassType<T>, instance: T): void {
        this.components.set(component, instance);
    }

    public GetComponent<T>(componentType: IClassType<T>): T | undefined {
        const component = this.components.get(componentType);

        if (!component) {
            return undefined;
        }

        return component as T;
    }
}

export default BaseClass;
