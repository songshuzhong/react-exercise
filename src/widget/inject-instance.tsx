// declare window:any;
declare var window;
if (!window.Map) {
    class Map {
        private _value = {};
        set(key, value) {
            this._value[key] = value;
        }
        get(key) {
            return this._value[key];
        }
        forEach(eachFun) {

            Object.keys(this._value).forEach((key) => {
                eachFun(this._value[key], key);
            });
        }
        has(key) {
            return this._value[key];
        }
    }
    window.Map = Map;
}

export const injectInstance = (classes: {}) => {
    const classMap = new Map<string, any>();
    const instanceMap = new Map<string, any>();

    // 实例化
    Object.keys(classes).forEach((eachClassName) => {
        if (classMap.has(eachClassName)) {
            throw new Error(`duplicate className: ${eachClassName}`);
        }
        classMap.set(eachClassName, classes[eachClassName]);
    });
    classMap.forEach((eachClass: any, keyName) => {
        instanceMap.set(keyName, new eachClass());
    });
    // 注入实际对象
    instanceMap.forEach((eachInstance: any, key: string) => {
        // 遍历这个类的注入实例类名
        eachInstance['_injectDecorator__injectVariables'] && eachInstance['_injectDecorator__injectVariables'].forEach((injectVariableKey: string) => {
            if (!instanceMap.get(eachInstance[injectVariableKey])) {
                throw new Error('injectName: ' + eachInstance[injectVariableKey] + ' not found!');
            }
            // 把注入名改成实际注入对象
            eachInstance[injectVariableKey] = instanceMap.get(eachInstance[injectVariableKey]);
        });
        // 删除这个临时变量
        delete eachInstance['_injectDecorator__injectVariables'];
    });
    return instanceMap;
};