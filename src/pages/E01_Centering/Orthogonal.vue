<template>
    <div>
        <v-card class="elevation-5">
            <v-card-media>
                <svg :width="width + 'px'" :height="height + 'px'" :viewBox="'0 0 ' + width + ' ' + height" style="cursor: crosshair"
                     @click="solve" ref="svg">
                    <g :transform="'translate(25, 25) rotate(' + rotation + ')'">
                        <line :stroke="color" :stroke-width="thickness" :x1="x1" y1="0" :x2="x2" y2="0"
                              stroke-linecap="round" id="refpointLine" ref="mainLine"/>
                        <circle :r="thickness" :cx="x1" :cy="0" :fill="color"/>
                        <circle :r="thickness" :cx="x2" :cy="0" :fill="color"/>
                        <circle :r="thickness" :cx="(x1+x2)/2" :cy="0" fill="transparent" v-if="indicatorVisible" stroke="black" stroke-width="1.5"/>
                    </g>

                </svg>
            </v-card-media>
        </v-card>
    </div>
</template>

<script>
    import {TweenLite} from 'gsap';

    function getRandomInt(min, max) {
        return min + Math.floor(Math.random() * Math.floor(max + 1 - min));
    }

    export default {
        data() {
            return {
                x1: 0,
                x2: 1000,
                alignCounter: false,
                color: "#ee7400",
                thickness: 5,
                indicator: 0,
                indicatorVisible: false,

                height: 0,
                width: 0,
                rotation: 0,
                maxLength: 0,
            }
        },

        props: {
            difficulty: String,
            direction: String,
        },

        methods: {
            next() {
                this.alignCounter = !this.alignCounter;

                let length;
                if(this.difficulty === "easy") {
                    length = getRandomInt(200, 0.6 * this.maxLength);
                }

                else if(this.difficulty === "hard") {
                    length = getRandomInt(0.6 * this.maxLength, this.maxLength);
                }

                let x1, x2;

                if (this.alignCounter) {
                    x1 = 0;
                    x2 = length;
                } else {
                    let v = this.direction === "vertical" ? this.height : this.width;
                    v -= 50;
                    x2 = v;
                    x1 = v - length;
                }

                TweenLite.to(this, 0.5, {x1, x2});
            },
            solve() {
                this.showIndicator();
                setTimeout(() => {
                    this.hideIndicator();
                    this.next()
                }, 1000);
            },
            hideIndicator() {
                this.indicatorVisible = false;
            },

            showIndicator() {
                this.indicatorVisible = true;
            },
        },
        created() {
            switch(this.direction) {
                case "vertical":
                    this.rotation = 90;
                    this.maxLength = 700;
                    this.width = 50;
                    this.height = 800;
                    break;
                case "horizontal":
                    this.rotation = 0;
                    this.maxLength = 900;
                    this.width = 1200;
                    this.height = 50;
                    break;
            }

            this.next()
        },
        name: "Ex1a"
    }
</script>

<style scoped>

</style>
