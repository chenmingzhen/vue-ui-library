import Main from "./main.vue";
import Vue from 'vue';
//extends返回一个实例的构造器
const MessageConstructor = Vue.extend(Main);

let instance; //单个实例
let instances = []; //实例组
let seed = 1; //id

const Message = function (options) {
    //判断是否为单个string
    // 1.string
    // 2.object
    if (typeof options === 'string') {
        options = {
            message: options
        }
    }
    // 用户自定义关闭事件
    let userOnClose = options.onClose;
    let id = 'message_' + seed++;
    options.onClose = function () {
        //关闭message 传入回调
        Message.close(id, userOnClose);
    };
    //新建实例 并将options作为实例的data属性传入
    instance = new MessageConstructor({data: options});
    instance.id = id;

    //先mount 再挂载到body上
    instance.$mount();
    document.body.appendChild(instance.$el);

    let verticalOffset = options.offset || 20;
    //经过计算得到最终message的位置
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16;
    });

    //? 为什么已经挂载上去 再动态添加数据可以响应？
    instance.verticalOffset = verticalOffset;
    instance.visible = true;
    //放进message的实例组
    instances.push(instance);
    //返回目前实例
    return instance;
}

//单个移除
Message.close = function (id, userOnClose) {
    let len = instances.length;
    let index = -1;//移除元素的下标
    let removedHeight;
    //找到要移除的message实例 并从实例组中移除
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {
            removedHeight = instances[i].$el.offsetHeight;
            index = i;
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    //移动top 上移效果  配合css的transition top
    //index后面的元素上移
    for (let i = index; i < len - 1; i++) {
        let dom = instances[i].$el;
        dom.style['top'] =
            parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    }
};

//ESC移除全部
Message.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default Message;
