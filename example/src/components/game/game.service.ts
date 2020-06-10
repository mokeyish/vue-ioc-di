/**
 * Created by yish on 2020/06/06.
 */
import { AppService } from '../../app.service';
import { Squares, SquareValue } from './interface';
import { Injectable } from 'ioc-di-ts';

@Injectable({ providedIn: 'root'})
export class GameService {

    constructor(private readonly app: AppService) {
    }

    calculateWinner(squares: Squares): SquareValue {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }
    doWork(): void {
        console.log(this.app.name);
        this.app.name = '测试一下哈哈哈' + Date.now();
        this.app.age = Date.now();
        console.log('正在游戏中');
    }
}
