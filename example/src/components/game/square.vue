<template>
    <button class="square" @click="$emit('on-square-click')">{{ value }}</button>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {SquareValue} from "./interface";
    import { Component } from 'vue-property-decorator';

    @Component({
        name: "square",
        props: ['value']
    })
    export default class Square extends Vue {
        value!: SquareValue;
    }
</script>

<style>
</style>
