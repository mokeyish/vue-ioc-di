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
    import { Inject } from 'vue-ioc-di';
    @Component({
        components: {
            Game
        }
    })
    export default class App extends Vue {
        @Inject(AppService)
        srv!: AppService;
    }
</script>

<style scoped>

</style>
