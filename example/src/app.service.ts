/**
 * Created by yish on 2020/06/07.
 */
import { Injectable, Reactive } from 'vue-ioc-di';


@Injectable({ providedIn: 'root'})
export class AppService {
    @Reactive()
    name: string = 'App Game Rxjs';
    age: number = 10;
    constructor() {
    }
}
