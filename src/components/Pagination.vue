<template>
    <div class="pages">
            <button @click="goToFirstPage" class="normal">&lt;&lt;</button>
            <button @click="goToPreviousPage" class="normal">&lt;</button>
            <span>第 <span class="page-number">{{ props.currentPage }}</span> 页</span>
            <button @click="goToNextPage" class="normal">&gt;</button>
            <button @click="goToLastPage" class="normal">&gt;&gt;</button>
        
        <div class="meiye">
            <span>每页显示
                <select name="page-size" @input="updateSize" v-model="size">
                    <option value="100">100</option>
                    <option value="500">500</option>
                    <option value="1000">1000</option>
                    <option value="1500">1500</option>
                </select>
                行/共
                <span class="totalHang">{{ totalHang }}</span>
                行
            </span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import useUserStore from '../store/modules/user';

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  totalRows: {
    type: Number,
    default: 100,
  },
  currentPage:Number
});


const userStore = useUserStore();
const currentPage = ref(1);
currentPage.value = props.currentPage
const size = ref(userStore.pageSize); // 使 size 变为响应式

const totalHang = computed(() => props.totalRows);
const totalPages = computed(() => Math.ceil(props.totalRows / size.value));

const goToFirstPage = () => {
  currentPage.value = 1;
  emit("change-page", currentPage.value);
};

const goToPreviousPage = () => {
  currentPage.value = props.currentPage
  if (currentPage.value > 1) {
    currentPage.value--;
    emit("change-page", currentPage.value);
  }
};

const goToNextPage = () => {
  currentPage.value = props.currentPage
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    emit("change-page", currentPage.value);
  }
};

const goToLastPage = () => {
  currentPage.value = totalPages.value;
  emit("change-page", currentPage.value);
};

const updateSize = (event) => {
  // const newSize = event.target.value;
  const newSize = parseInt(event.target.value, 10);
  size.value = newSize;
  userStore.setSize(newSize);
  localStorage.setItem('pageSize', newSize);
  adjustCurrentPage();
  emit('update-size', size.value);
};

const adjustCurrentPage = () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
    emit("change-page", currentPage.value);
  }
};

// emit 函数需要通过 defineEmits 来定义
const emit = defineEmits(['change-page', 'update-size']);
</script>



<style scoped>
.pages {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #fff;
}
.normal {
  background-color: #fff;
  border: none;
  padding: 4px 15px;
}
span.page-number {
  padding: 0 8px;
  color: #1D89E9;
  font-weight: 700;
}
span {
  font-size: 13px;
}
.normal:hover {
  cursor: pointer;
}
.meiye{
    position: absolute;
    right: 0;
}
select{
    border: none;
    background-color: #D9E9F8;
    border-radius: 10px;
    color: #0053B5;
    font-weight: 700; 
    padding: 3px;
    cursor: pointer;
    text-align: center;
}
*:where(:not(html,iframe,canvas,img,svg,video,audio):not(svg *,symbol *))
{
    all: unset;
    display: revert;
}
option,.totalHang{
    color: #0053B5;
    font-weight: 700;
}

</style>
