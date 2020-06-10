# Dependency Injection In Vue

> Dependency injection (DI), is an important application design pattern. Here provide DI framework for `Vue`, which is typically used in the design of Vue applications to increase their efficiency and modularity.
> Dependencies are services or objects that a class needs to perform its function. DI is a coding pattern in which a class asks for dependencies from external sources rather than creating them itself.
> In Vue, this library DI framework provides declared dependencies to a class when that class is instantiated. you can use it to make your apps flexible, efficient, and robust, as well as testable and maintainable.

[![npm](https://img.shields.io/npm/v/vue-ioc-di.svg)](https://www.npmjs.com/package/vue-ioc-di) 

## Get Started

1. Install package

   `yarn add vue-ioc-di`

2. Create a service

    app.service.ts
    ```ts
    
    import { Reactive, Injectable } from 'vue-ioc-di';
    
    @Injectable({ providedIn: 'root'}) // global service
    export class AppService {
        @Reactive() // make `name` reactive for updating dom.
        name: string = 'App Game Rxjs';
        age: number = 10;
        constructor() {
        }
    }
    ```

3. Use in vue component

    ```vue
    <template>
        <div>
            {{ srv.name }}
            <game></game>
        </div>
    </template>
    
    <script lang="ts">
        import Vue from 'vue';
        import { Component } from 'vue-property-decorator';
        import Game from './components/game/index.vue';
        import { AppService } from './app.service';
        import { Reactive, Injectable, Inject } from 'vue-ioc-di';
    
        @Component({
            components: {
                Game
            },
            providers: [ AppService ], // When `AppService` provide in 'root', omit it.
        })
        export default class App extends Vue {
            @Inject(AppService)
            srv!: AppService;
            
            doWork() {
               // use service
               this.srv.doSomething();
            }
        }
    </script>
    
    <style scoped>
    
    </style>
    ```
4. More about  [Dependency injection](https://github.com/mokeyish/dependency-injection.ts).

## Examples
 - [example](./example)
