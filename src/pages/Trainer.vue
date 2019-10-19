<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-btn @click="level1">Next</v-btn>
                <div style="cursor: crosshair">
                    <svg width="100%" height="700px" viewBox="0 0 1000 1000" @mousemove="interact" id="mysvg" @click="solve">
                        <rect height="1000" width="1000" x="0" y="0" fill="none" stroke="black" stroke-width="1px"/>
                        <g transform="translate(200, 200)">
                            <circle v-bind="c1" stroke="darkorange" stroke-width="15" fill="transparent"/>
                            <line v-bind="line1" stroke="darkorange" stroke-width="15"/>
                        </g>

                        <g transform="translate(700, 200)">
                            <g :transform="'scale(' + scale + ')'">
                                <circle v-bind="c1" stroke="darkorange" stroke-width="15" fill="transparent"/>
                                <line v-bind="line2" stroke="darkorange" stroke-width="15" id="refpointLine"/>
                                <line :x1="line1.x1-15" :x2="line1.x1+15" :y1="line1.y2" :y2="line1.y2" stroke="black" stroke-width="2px" v-if="showSolution"/>
                            </g>
                        </g>
                    </svg>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    function getRandomInt(min, max) {
        return min + Math.floor(Math.random() * Math.floor(max - min));
    }

    function getRandomFloat(min, max) {
        return min + Math.random() * (max - min);
    }

    export default {
        name: "Trainer",
        data() {
            return {
                c1: {
                    cx: 0,
                    cy: 0,
                    r: 0,
                },
                c2: {
                    cx: 0,
                    cy: 0,
                    r: 0,
                },
                line1: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 0,
                },
                line2: {
                    x1: 0,
                    x2: 0,
                    y1: 0,
                    y2: 0,
                },
                scale: 0,
                showSolution: false,
            }
        },
        methods: {
            start() {
                this.level1();
            },
            level1() {
                this.next(getRandomFloat(1, 8.5), getRandomFloat(0.4, 2));
            },
            next(ratio, scale) {
                this.showSolution = false;

                this.c1 = {
                    cx: 0,
                    cy: 0,
                    r: 40,
                };

                this.line1 = {
                    x1: 0,
                    y1: this.c1.r,
                    x2: 0,
                    y2: this.c1.r + this.c1.r * ratio
                };

                this.line2 = {
                    x1: 0,
                    y1: this.c1.r,
                    x2: 0,
                    y2: this.c1.r
                };

                this.scale = scale
            },
            interact(event) {
                let svg = document.getElementById('mysvg');
                let refpointLine = svg.getElementById("refpointLine");

                function svgPoint(element, x, y) {
                    let pt = svg.createSVGPoint();

                    pt.x = x;
                    pt.y = y;

                    return pt.matrixTransform(element.getScreenCTM().inverse());
                }

                let pt = svgPoint(refpointLine, 400, event.pageY);
                this.line2.y2 = pt.y
            },
            solve() {
                this.showSolution = true;
                setTimeout(() => {
                    this.level1()
                }, 1000)
            }
        },
        created() {
            this.start();
        }
    }
</script>

<style scoped>

</style>
