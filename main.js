// 定义 vue3 的对象
const vue3Composition = {
    setup() { // 传说中的setup
        // 使用上面的定义的“类”，分散setup内部的代码
        const objs = setupOjects()

        return { // 返回给模板，否则模板访问不到。这里返回的是对象。
            ...objs
        }
    },
    mounted() {
        document.getElementById("app").style.display="block";
        if (typeof (mounted) == 'function') mounted();
    },
    //method 可以调用setup中的函数，但是setup中不能调用methods和mounted的函数
    methods: {

    }
}

//程序开始的地方
function Start() {
    // 在 #app 标签下渲染一个按钮组件
    const app = Vue.createApp(vue3Composition);
    app.use(vant);
    app.use(vant.Lazyload);
    app.mount('#app');

}

//定义响应数据+非响应数据
const datas = {
}
//定义响应式数据
const props = Vue.reactive({})
//方法
const methods = {}
// vue3的 Composition API 的奥义，
const setupOjects = () => {
    return {
        props,
        ...datas,
        ...methods,

    }
}

//从url查询输入参数
function query(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return decodeURI(result[1]);
}

