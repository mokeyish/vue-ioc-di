/**
 * Created by yish on 2020/06/07.
 */

import Vue from 'vue';
import { AbstractType, InjectFlags, InjectionToken, Injector, Type, Provider, INJECTOR_SCOPE } from 'ioc-di-ts';
import { DefaultComputed, DefaultData, DefaultMethods, DefaultProps, PropsDefinition } from 'vue/types/options';
export * from 'ioc-di-ts';

declare module 'vue' {
    interface VueUtil {
        defineReactive(obj: object, key: string, val: any, customSetter?: Function, shallow?: boolean): void;
    }
    interface VueConstructor<V extends Vue = Vue> {
        util: VueUtil;
    }
}

declare module 'vue/types/options' {
    interface ComponentOptions<
        V extends Vue,
        Data= DefaultData<V>,
        Methods= DefaultMethods<V>,
        Computed= DefaultComputed,
        PropsDef= PropsDefinition<DefaultProps>,
        Props= DefaultProps> {

        /**
         * ioc injector
         */
        injector?: Injector;

        /**
         * ioc providers
         */
        providers?: Provider[]
    }
}

/**
 * Make a reactive property on an Object.
 * @param shallow
 * @constructor
 */
export function Reactive(shallow?: boolean) {
    return function(target: any, propertyKey: string) {
        Vue.util.defineReactive(target, propertyKey, target[propertyKey], undefined, shallow);
    }
}

export function Inject<T>(token: Type<T> | InjectionToken<T> | AbstractType<T>, notFoundValue?: T, flags?: InjectFlags) {
    return function(target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get(): any {
                const injector = getInjector(this);
                return injector.get(token, notFoundValue, flags);
            }
        })
    }
}




function getInjector(component: Vue): Injector {
    if (component.$options.injector) {
        return component.$options.injector;
    }

    if (component === component.$root) {
        let providers: Provider[];
        if (component.$options.providers && component.$options.providers.length > 0) {
            providers = [ { provide: INJECTOR_SCOPE, useValue: 'root'}, ...component.$options.providers ];
        } else {
            providers = [ { provide: INJECTOR_SCOPE, useValue: 'root'} ];
        }
        component.$options.injector = Injector.resolveAndCreate(providers, undefined);
    } else {
        const parent: Injector = getInjector(component.$parent);

        if (component.$options.providers && component.$options.providers.length > 0) {
            // 创建新的作用域
            component.$options.injector = Injector.resolveAndCreate(
                component.$options.providers, parent);
        } else {
            component.$options.injector = parent;
        }
    }
    return component.$options.injector;
}
