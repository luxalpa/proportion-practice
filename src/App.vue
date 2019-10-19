<template>
    <v-app>
        <v-navigation-drawer app clipped v-model="drawer">
            <v-list dense>
                <template v-for="entry in menu">
                    <v-list-tile ripple :to="entry.url">
                        <v-list-tile-avatar/>
                        <v-list-tile-title>
                            {{entry.title}}
                        </v-list-tile-title>
                    </v-list-tile>
                </template>

            </v-list>
        </v-navigation-drawer>

        <v-toolbar
            app fixed
            clipped-left
            dense
        ><v-toolbar-side-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title>Destructive Dragon
                <v-icon>chevron_right</v-icon>
                Proportions Trainer
            </v-toolbar-title>
            <v-spacer></v-spacer>
                <v-btn icon @click.stop="toggleFullscreen">
                    <v-icon v-if="isFullscreen">fullscreen_exit</v-icon>
                    <v-icon v-else>fullscreen</v-icon>
                </v-btn>
        </v-toolbar>

        <v-content>
            <v-container fluid fill-height>
                <v-layout justify-center align-center>
                    <transition name="slide-right">
                        <router-view class="child-view" :key="$route.path"/>
                    </transition>
                </v-layout>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import {lessons} from "@/router/lessons";

    export default {
        data() {
            return {
                drawer: true,
                title: 'Vuetify.js',
                isFullscreen: false,
            }
        },
        computed: {
            menu() {
                return lessons;
            }
        },
        methods: {
            toggleFullscreen() {
                this.isFullscreen = !this.isFullscreen;
                if(this.isFullscreen) {
                    let docelem = document.documentElement;
                    if (docelem.requestFullscreen) {
                        docelem.requestFullscreen();
                    }
                    else if (docelem.mozRequestFullScreen) {
                        docelem.mozRequestFullScreen();
                    }
                    else if (docelem.webkitRequestFullscreen) {
                        docelem.webkitRequestFullscreen();
                    }
                    else if (docelem.msRequestFullscreen) {
                        docelem.msRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            },
        },
        name: 'App'
    }
</script>
<style>
    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(100px, 0);
        transform: translate(100px, 0);
    }

    .slide-right-leave-active {
        position: absolute;
    }
    .slide-left-leave-active {
        position: absolute;
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-100px, 0);
        transform: translate(-100px, 0);
    }

    .child-view {
        position: absolute;
        transition: all .5s cubic-bezier(.55,0,.1,1);
    }
</style>
