<template>
    <div>
        <div class="board-row">
            <square :value="squares[0]" @on-square-click="$emit('on-square-click', 0)"></square>
            <square :value="squares[1]" @on-square-click="$emit('on-square-click', 1)"></square>
            <square :value="squares[2]" @on-square-click="$emit('on-square-click', 2)"></square>
        </div>
        <div class="board-row">
            <square :value="squares[3]" @on-square-click="$emit('on-square-click', 3)"></square>
            <square :value="squares[4]" @on-square-click="$emit('on-square-click', 4)"></square>
            <square :value="squares[5]" @on-square-click="$emit('on-square-click', 5)"></square>
        </div>
        <div class="board-row">
            <square :value="squares[6]" @on-square-click="$emit('on-square-click', 6)"></square>
            <square :value="squares[7]" @on-square-click="$emit('on-square-click', 7)"></square>
            <square :value="squares[8]" @on-square-click="$emit('on-square-click', 8)"></square>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Squares} from "./interface";
    import Square from "./square.vue";
    import { Component } from 'vue-property-decorator';


    @Component({
        name: 'board',
        components: {Square},
        props: [ 'squares' ]
    })
    export default class Board extends Vue {
        squares!: Squares;
    }
</script>

<style>

</style>
