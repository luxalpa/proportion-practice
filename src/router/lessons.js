import e01orthogonal from "@/pages/E01_Centering/Orthogonal"

let lessons = [
    {
        title: "Horizontal Centering (Easy)",
        url: "/horizontal-centering-1",
        component: e01orthogonal,
        params: { difficulty: "easy", direction: "horizontal" }
    },{
        title: "Horizontal Centering (Hard)",
        url: "/horizontal-centering-2",
        component: e01orthogonal,
        params: { difficulty: "hard", direction: "horizontal" }
    }, {
        title: "Vertical Centering (Easy)",
        url: "/vertical-centering-1",
        component: e01orthogonal,
        params: { difficulty: "easy", direction: "vertical" }
    },{
        title: "Vertical Centering (Hard)",
        url: "/vertical-centering-2",
        component: e01orthogonal,
        params: { difficulty: "hard", direction: "vertical" }
    },
];

function getRouterConfig() {
    return lessons.map(lesson => {
        return {
            path: lesson.url,
            component: lesson.component,
            props: lesson.params,
        }
    })
}

let routerConfig = getRouterConfig();

export {
    lessons,
    routerConfig
}
