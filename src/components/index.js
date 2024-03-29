import EButton from "./EButton";
import ECurd from "./ECurd";
import EConfigProvider from "./EConfigProvider";

const components = [
    EButton,
    ECurd,
    EConfigProvider
];

export {
    EButton,
    ECurd,
    EConfigProvider
};


const install = function (Vue) {
    // 全局注册组件
    components.forEach(item => {
        Vue.component(item.__name, item)
    })
}

// 判断是否是直接引入文件，如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default { install }


