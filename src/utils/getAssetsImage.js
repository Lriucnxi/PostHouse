// 解决vite环境下动态加载图片无法显示问题
const getAssetsURL = (image) => {
  // 参数一：相对路径
  // 参数二：当前路径的URL
  return new URL(`../assets/images/tabbar/${image}`, import.meta.url).href
}

export default getAssetsURL