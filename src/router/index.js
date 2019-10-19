import Vue from 'vue'
import Router from 'vue-router'
import {routerConfig} from '@/router/lessons'
import HelloWorld from "@/components/HelloWorld"

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        ...routerConfig
    ]
})
