import { nextTick } from "vue";

// 当添加顶部新标签后，调用这个方法来滚动到新标签的位置
export const scrollToTag = (tagName) => {
    // 等待DOM更新
    nextTick(() => {
      const tagsContainer = document.querySelector('.right'); // 替换为存放标签的容器的实际选择器
      const newTag = document.querySelector(`[data-tag-name="${tagName}"]`); // 使用新标签的实际键或其他唯一标识符
      // console.log(newTag,'newTag')
      if (tagsContainer && newTag) {
        // 滚动到新标签的位置
        const scrollPosition = newTag.offsetLeft + newTag.clientWidth - tagsContainer.clientWidth;
        tagsContainer.scroll({
          left: scrollPosition,
          behavior: 'smooth' // 可选的平滑滚动效果
        });
      }
    });
  };