//统一导出组件
import Message from "./message";

const install = function (Vue) {
    Vue.prototype.$message = Message;
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
}
