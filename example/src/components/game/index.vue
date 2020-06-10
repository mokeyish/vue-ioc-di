<template>
    <div class="game">
        <div class="game-board">
            <board :squares="current" @on-square-click="(i) => handleClick(i)"></board>
        </div>
        <div class="game-info">
            <div>{{status}}</div>
            <ol>
                <li v-for="(_, move) in history" :key="move">
                    <button @click="jumpTo(move)">{{move ? 'Go to move #' + move: 'Go to game start'}}</button>
                </li>
            </ol>
        </div>
    </div>

</template>

<script lang="ts">
    import Vue from 'vue';
    import Board from "./board.vue";
    import {Squares, SquareValue} from "./interface";
    import {GameService} from "./game.service";
    import { Inject } from 'vue-ioc-di';
    import { Component } from 'vue-property-decorator';

    @Component({
        name: "game",
        providers: [ GameService ],
        components: {Board}
    })
    export default class Game extends Vue {
        history: Squares[] = [];
        current: Squares;
        xIsNext: boolean = true;
        stepNumber = 0;
        status: string = '';

        @Inject(GameService)
        srv!: GameService;

        constructor() {
            super();
            this.current = Array<SquareValue>(9).fill(null);
            this.history.push(this.current);
        }

        handleClick(i: number) {
            this.$root
            console.log('点击了');
            console.log(this.srv);
            this.srv.doWork();
            const squares = this.current.slice();
            if (this.srv.calculateWinner(squares) || squares[i]) {
                return 0;
            }
            squares[i] = this.xIsNext ?  'X' : 'O';
            this.xIsNext =  !this.xIsNext;

            const winner = this.srv.calculateWinner(squares);
            if (winner) {
                this.status = `Winner: ${winner}`;
            } else {
                this.status = `Next player: ${ this.xIsNext ? 'X' : 'O'}`;
            }

            this.history.push(squares);

            this.current = squares;
        }

        jumpTo(step: number) {
            this.history.slice(0, this.stepNumber + 1);
            this.current = this.history[this.stepNumber];
            this.stepNumber = step;
            this.xIsNext = (step % 2) === 0;
        }
    }
</script>

<style>
    body {
        font: 14px "Century Gothic", Futura, sans-serif;
        margin: 20px;
    }

    ol, ul {
        padding-left: 30px;
    }

    .board-row:after {
        clear: both;
        content: "";
        display: table;
    }

    .status {
        margin-bottom: 10px;
    }

    .square {
        background: #fff;
        border: 1px solid #999;
        float: left;
        font-size: 24px;
        font-weight: bold;
        line-height: 34px;
        height: 34px;
        margin-right: -1px;
        margin-top: -1px;
        padding: 0;
        text-align: center;
        width: 34px;
    }

    .square:focus {
        outline: none;
    }

    .kbd-navigation .square:focus {
        background: #ddd;
    }

    .game {
        display: flex;
        flex-direction: row;
    }

    .game-info {
        margin-left: 20px;
    }

</style>
