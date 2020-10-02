<template>
  <transition name="el-message-fade" @after-leave="handleAfterLeave" appear>
    <div :class="[ 'el-message',
        type ? `el-message--${ type }` : '',
        center ? 'is-center' : '',
        showClose ? 'is-closable' : '',
        customClass]"
         :style="positionStyle"
         v-show="visible"
         @mouseenter="clearTimer"
         @mouseleave="startTimer"
         role="alert">
      <slot>
        <p v-if="!dangerouslyUseHTMLString" class="el-message__content">{{ message }}</p>
        <p v-else v-html="message" class="el-message__content"></p>
      </slot>
    </div>
  </transition>
</template>

<style>
.el-message--error{
  background:#F56C6C !important;
}
.el-message{
  position: fixed;
  right: 50%;
  top:-50%;
  padding: 0 3rem;
  background: #67C23A;
  border-radius: 20px;
  transition: top 1s;
}
.el-message-fade-enter,.el-message-fade-leave-to{
  transform: translate(0,-100%);
  opacity: 0;
}
.el-message-fade-enter-active,.el-message-fade-leave-active{
  transition: all 1s;
}
.el-message-fade-enter-to,.el-message-fade-leave {

  opacity: 1;
}


</style>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      iconClass: '',
      customClass: '',
      onClose: null,
      showClose: false,
      closed: false,
      verticalOffset: 20,
      timer: null,
      dangerouslyUseHTMLString: false,
      center: false
    }
  },
  computed: {
    positionStyle() {
      return {
        'top': `${this.verticalOffset}px`
      };
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  methods: {
    //离场动画执行完毕执行
    handleAfterLeave() {
      //注销组件实例 但不会从dom中移除
      this.$destroy(true);
      //从dom中移除
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose(this);
      }
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    keydown(e) {
      if (e.keyCode === 27) { // esc关闭消息
        if (!this.closed) {
          this.close();
        }
      }
    }
  },
  mounted() {
    this.startTimer();
    document.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown);
  }
}
</script>
