import { onActivated, onDeactivated, onMounted, onUnmounted, ref } from "vue";
import { throttle } from 'underscore';

// 方式1，传入回调
// export default function useScroll(reachBottomCB) {
//   // 监听滚动到底部
//   const scrollListenerHandler = () => {
//     // scrollTop 滚动出去的高度
//     const scrollTop = document.documentElement.scrollTop;
//     // scrollHeight 总共可以滚动的高度
//     const scrollHeight = document.documentElement.scrollHeight;
//     // clientHeight 可视区高度
//     const clientHeight = document.documentElement.clientHeight;
//     if (clientHeight + scrollTop > scrollHeight - 1) {
//       if (reachBottomCB) reachBottomCB()
//     }
//   };
//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler);
//   });

//   onActivated(() => {
//     window.addEventListener("scroll", scrollListenerHandler);
//   });

//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler);
//   });

//   onDeactivated(() => {
//     window.removeEventListener("scroll", scrollListenerHandler);
//   });
// }

// 方式2：传入变量
export default function useScroll(elRef) {
  let el = window
  const isReachBottom = ref(false) // 是否滚动到底部，默认否
  const clientHeight = ref(0) // clientHeight 可视区高度
  const scrollTop = ref(0) // scrollTop 滚动出去的高度
  const scrollHeight = ref(0) // scrollHeight 总共可以滚动的高度

  // 监听滚动到底部
  const scrollListenerHandler = throttle(() => {
    if(el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      isReachBottom.value = true
      console.log("滚动到底部了")
    }
  }, 100);
  
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  });

  onActivated(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  onDeactivated(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}