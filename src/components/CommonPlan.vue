<template>
  <div class="commonPlan">
    <div
      class="containerPlan outPlan"
      :style="{ height: isFold ? '72px' : 'auto' }"
    >
      <div class="first_row">
        <!-- 左边方案名 -->
        <div class="planName">
          <el-button
            class="box all"
            :class="{ selected: currentViewId == -1 }"
            @click="showAll"
          >
            <span>默认</span>
          </el-button>
          <!-- 视图名 -->
          <el-button
            v-for="view in currentViews"
            :key="view.viewId"
            :label="view.viewName"
            @click="selectButton(view)"
            @dblclick="handleDoubleClick(view)"
            class="box"
            :class="{ selected: currentViewId === view.viewId }"
          >
            <span
              >{{ view.viewName }}
              <el-icon class="closeIcon" @click="handleClose(view, $event)"
                ><CloseBold /> </el-icon
            ></span>
          </el-button>
        </div>
        <!-- 右边新建方案和保存方案的按钮 -->
        <el-row class="one">
          <el-button round class="white" @click="openAddScheme">
            <el-icon><Plus /></el-icon>
            <span>新增方案</span>
          </el-button>

          <el-button type="primary" round class="blue" @click="savePlan">
            <el-icon><Check /></el-icon>
            <span>保存筛选</span>
          </el-button>

          <el-button type="primary" round class="blue" @click="searchView">
            <el-icon><Search /></el-icon>
            <span>搜索</span>
          </el-button>
        </el-row>
      </div>
      <div class="second_row">
        <!-- 左侧筛选 -->
        <div class="row_filter">
          <div
            class="filter"
            v-for="(option, index) in currentOption"
            :key="index"
          >
            <!-- label是展示给用户的，value是要传给后端的值 -->
            <el-select v-model="option.chColName" clearable>
              <el-option
                v-for="item in currentColumn"
                :key="item.voColName"
                :label="item.chColName"
                :value="item.chColName"
                @click="handleColsName(option, item)"
              />
            </el-select>
            <el-select v-model="option.valueOperator" clearable>
              <el-option
                v-for="item in valueOperators"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <!-- <el-input v-model="option.colValue" @keyup.enter="searchView" clearable/> -->

            <el-autocomplete
              v-model="option.colValue"
              :fetch-suggestions="querySearchWithOption(option)"
              placeholder="请输入"
              @keyup.enter="searchView"
              clearable
            ></el-autocomplete>

            <!-- 删除筛选条件 -->
            <el-icon class="closeIcon" @click="removeSift(index)"
              ><CloseBold
            /></el-icon>
          </div>
          <!-- 新增筛选按钮 -->
          <button class="addOption" @click="addOption">
            <!-- <el-icon style="font-weight: 700;"><Plus /></el-icon> -->
            <img src="@/assets/add.svg" style="height: 12px" />
            新增筛选
          </button>
        </div>
      </div>
      <!-- 新建方案的弹窗 -->
      <div class="addScheme">
        <el-dialog title="创建方案" v-model="dialogVisible" width="22%">
          <p class="black">
            当前方案：
            <input
              type="text"
              placeholder="请输入方案名称"
              v-model="viewName"
            />
          </p>
          <div class="selectAll">
            <h3 class="black">默认显示列：</h3>
            <el-checkbox
              :indeterminate="indeterminate"
              v-model="isAll"
              @change="handleSelectAll"
              >全选</el-checkbox
            >
          </div>
          <div class="selectContent">
            <el-checkbox-group v-model="selectedColumns">
              <el-checkbox
                v-for="columnName in props.columnNames"
                :key="columnName.id"
                :label="columnName"
              >
                {{ columnName.chColName }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <hr />
          <div class="isdefault">
            <el-checkbox v-model="isDefault">下次以此方案进入</el-checkbox>
          </div>

          <!-- 底部操作按钮 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addPlan" class="confirm normal">确定</el-button>
            <el-button @click="cancel" class="normal">取消</el-button>
          </span>
        </el-dialog>
      </div>
      <!-- 修改方案的弹窗 -->
      <div class="addScheme updateScheme">
        <el-dialog title="修改方案" v-model="dialogUpdate" width="22%">
          <p class="black">
            当前方案：
            <input
              type="text"
              placeholder="请输入方案名称"
              v-model="currentViewName"
            />
          </p>
          <div class="selectAll">
            <h3 class="black">默认显示列：</h3>
            <el-checkbox
              :indeterminate="indeterminate"
              v-model="isAll"
              @change="handleSelectAll"
              >全选</el-checkbox
            >
          </div>
          <div class="selectContent">
            <el-checkbox-group v-model="selectedColumns">
              <el-checkbox
                v-for="columnName in props.columnNames"
                :key="columnName.id"
                :label="columnName"
              >
                {{ columnName.chColName }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <hr />
          <div class="isdefault">
            <el-checkbox v-model="isDefault">下次以此方案进入</el-checkbox>
          </div>

          <!-- 底部操作按钮 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="updatePlan" class="confirm normal"
              >确定</el-button
            >
            <el-button @click="cancel" class="normal">取消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <div class="bottomPlan">
      <button @click="fold">
        <el-icon>
          <ArrowDownBold v-if="isFold" />
          <ArrowUpBold v-else />
        </el-icon>
        {{ isFold ? '展示筛选' : '收起筛选' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, watchEffect } from 'vue'
import { saveView, removeView, getViews } from '@/api/commonPlan'
import axios from 'axios'
import { getToken } from '../utils/auth'
import { forEach } from 'lodash'

// 前面vue传过来的参数
const props = defineProps({
  columnNames: Array, //全部列名
  viewColumn: Array, //当前视图列名。与全部列名的id不一样
  currentViewId: Number, //当前视图id
  currentTableId: Number, //当前表格id
  currentViewName: String,
  defaultViewId: Number,
  apiUrl: String,
  currentOrder: Object
})
// 传递currentOption.value给父组件

// 定义可发出的事件,触发父组件的事件
const emit = defineEmits(['lookView', 'searchView', 'getCurrentOption']) //查看视图、获取全部视图、搜索按钮
// 新增方案弹窗
const dialogVisible = ref(false)
// 修改方案弹窗
const dialogUpdate = ref(false)
// 当前视图的id
const currentViewId = ref(null)
// 当前视图的名字
const currentViewName = ref('')
// 新增的视图名
const viewName = ref('')
// 当前表的ID
const tableId = ref('')
tableId.value = props.currentTableId
// 当前视图所拥有的列名
const currentColumn = ref([])
// 当前视图所拥有的筛选条件
const currentOption = ref([])
// 是否折叠
const isFold = ref(false)
// 下次是否以此方案进入
const isDefault = ref(false)
// 判断单击或者双击的定时器
const clickTimer = ref(null)
// 存放搜索结果
const searchResult = ref([])
// 当前拥有的视图
const currentViews = ref([])
// 默认视图id
const defaultViewId = ref(null)
// 默认视图名
const defaultViewName = ref('')

// 折叠筛选
function fold() {
  isFold.value = !isFold.value
}
// 删除筛选条件
function removeSift(index) {
  currentOption.value.splice(index, 1) // 移除指定索引的筛选条件
}
// 自动补全方法
const querySearchWithOption = (option) => {
  const querySearch = async (queryString, cb) => {
    // 拼接axios请求
    // const baseUrl = 'https://www.apsceshi.benewake.top/benewake'
    const baseUrl = 'https://www.aps.benewake.top/benewake'
    // const baseUrl = 'https://aps.benewake.com/benewake'
    // const baseUrl = 'https://apstest.benewake.com/benewake'
    const apiUrl = baseUrl + props.apiUrl
    axios
      .post(
        apiUrl,
        {
          tableId: tableId.value,
          colId: option.colId,
          value: queryString
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: getToken()
          }
        }
      )
      .then((res) => {
        // console.log(res.data.data, 'searchResult')
        searchResult.value = res.data.data.map((item) => ({ value: item }))
        cb(searchResult.value)
        console.log(searchResult.value, 'searchResult')
      })
  }
  return querySearch
}

// 定义一个响应式引用来保存新建方案时选中的列
const selectedColumns = ref([])
const isAll = ref(false)
const indeterminate = computed(() => {
  return (
    selectedColumns.value.length > 0 &&
    selectedColumns.value.length < props.columnNames.length
  )
})
// 处理全选按钮的点击
const handleSelectAll = (isChecked) => {
  if (isChecked) {
    selectedColumns.value = [...props.columnNames]
  } else {
    selectedColumns.value = []
  }
}

// 写死的中间条件
const valueOperators = [
  {
    value: 'like',
    label: '包含'
  },
  {
    value: 'notlike',
    label: '不包含'
  },
  {
    value: 'gt',
    label: '大于'
  },
  {
    value: 'ge',
    label: '大于等于'
  },
  {
    value: 'eq',
    label: '等于'
  },
  {
    value: 'ne',
    label: '不等于'
  },
  {
    value: 'lt',
    label: '小于'
  },
  {
    value: 'le',
    label: '小于等于'
  },
  {
    value: 'null',
    label: '为空'
  },
  {
    value: 'notnull',
    label: '不为空'
  }
]
// 新增筛选条件
function addOption() {
  let result = currentColumn.value.some((item) => {
    return item.chColName === '版本号'
  })
  if (result) {
    currentOption.value.push({
      chColName: '版本号',
      voColName: '',
      valueOperator: 'eq',
      colValue: '最大版本'
    })
  } else {
    currentOption.value.push({
      chColName: '',
      voColName: '',
      valueOperator: 'like',
      colValue: ''
    })
  }
}
// 搜索按钮
function searchView() {
  const data = {
    tableId: tableId.value,
    viewId: currentViewId.value,
    // viewName: currentViewName.value,
    cols: currentOption.value
  }
  emit('searchView', data)
  console.log(currentOption.value, 'currentOption213')
}
// 传列名的英文和中文给currentOption
function handleColsName(option, item) {
  option.id = item.id
  if (currentViewId.value == -1) {
    option.colId = item.id
  } else {
    option.colId = item.colId
  }
  option.chColName = item.chColName
  option.voColName = item.voColName
}
// 点击视图查看视图
function selectButton(view) {
  // 清除之前的计时器
  if (clickTimer.value) {
    clearTimeout(clickTimer.value)
    clickTimer.value = null
    return // 如果是双击的第二下，则不执行单击逻辑
  }

  // 设置一个计时器，如果用户没有在设定时间内再次点击，则执行单击逻辑
  clickTimer.value = setTimeout(() => {
    // console.log('执行单击事件');
    // 执行单击事件的逻辑
    currentViewId.value = view.viewId
    currentViewName.value = view.viewName
    emit('lookView', currentViewId.value, currentViewName.value)

    clickTimer.value = null // 重置计时器
  }, 300) // 300毫秒内如果没有第二次点击，则视为单击
}
// 双击修改视图
const handleDoubleClick = (view) => {
  // 清除计时器，防止单击事件发生
  clearTimeout(clickTimer.value)
  clickTimer.value = null
  // console.log('执行双击事件');
  if (view.viewId != currentViewId.value) {
    ElMessageBox.alert('请单击跳转到该方案再修改', '提示', {
      confirmButtonText: '好的',
      type: 'info'
    })
    return
  }
  // 执行双击事件的逻辑
  //筛选出之前挑选的列
  if (!indeterminate.value) {
    isAll.value = true
  }
  selectedColumns.value = props.columnNames.filter((columnName) => {
    return props.viewColumn.some((viewColumnItem) => {
      return viewColumnItem.voColName === columnName.voColName
    })
  })
  if (currentViewId.value == defaultViewId.value) {
    isDefault.value = true
  } else {
    isDefault.value = false
  }

  console.log(selectedColumns.value, '修改方案默认的值')

  dialogUpdate.value = true
}
// 点击“全部”视图
function showAll() {
  currentViewId.value = -1
  currentOption.value = []
  emit('lookView', currentViewId.value, currentViewName.value)
  currentColumn.value = props.columnNames
  // console.log(props.columnNames,'column')
  // console.log(currentColumn.value,'column1')
}
// 删除方案
const handleClose = async (view, event) => {
  // 取消事件的冒泡反应
  event.stopPropagation()
  ElMessageBox.confirm('确定删除这个方案吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await removeView([view.viewId])
    // emit('getViews', tableId.value)
    await getViews(tableId.value).then((res) => {
      if (res.code == 200) {
        currentViews.value = res.data.viewTableVos
        defaultViewId.value = res.data.defaultViewId
        defaultViewName.value = res.data.defaultViewName
        // console.log(res.data.viewTableVos,'res.data.viewTableVos')
        // console.log(currentViews.value, 'views')
      }
      ElMessageBox.alert('删除方案成功', '提示', {
        confirmButtonText: '好的',
        type: 'success'
      })
    })
  })
}
// 监视 views 的变化，长度为0切换到“全部视图”
watch(
  // () => props.views,
  () => currentViews.value,
  (newViews, oldViews) => {
    if (newViews.length === 0) {
      showAll()
    }
  },
  { deep: true }
)
// 用于回显筛选条件

watch(
  () => props.viewColumn,
  (newValue, oldValue) => {
    // 不是“全部”视图时，从viewColumn里面获取列
    if (currentViewId.value != -1) {
      const uniqueColumnsMap = new Map() // 用于去重
      if (props.viewColumn.length > 0) {
        props.viewColumn.forEach((item) => {
          if (!uniqueColumnsMap.has(item.colId)) {
            uniqueColumnsMap.set(item.colId, {
              id: item.id,
              colId: item.colId,
              chColName: item.chColName,
              voColName: item.voColName
            })
          }
        })
        // 从 Map 对象中提取去重后的值
        currentColumn.value = Array.from(uniqueColumnsMap.values())

        // console.log('执行watch了')
        // 筛选出来判断条件不为空的值，这个就是要回显的筛选条件，而为null的就是视图列，不展示
        currentOption.value = props.viewColumn.filter(
          (item) => item.valueOperator != null
        )
        // console.log(currentOption.value, 'currentOption')
      }
    }
  }
)
// 监控currentOption的值
watch(
  () => currentOption.value,
  (newValue) => {
    emit('getCurrentOption', newValue)
  },
  { immediate: true }
)

// 监控当前currentViewId,用于显示用户设定的方案
watch(
  () => props.currentViewId,
  (newValue, oldValue) => {
    currentViewId.value = props.currentViewId
    currentViewName.value = props.currentViewName
    emit('lookView', currentViewId.value, currentViewName.value)
  }
)
onMounted(() => {
  if (currentViewId.value == -1) {
    showAll()
  }
  currentViewName.value = props.currentViewName
  // 获取视图列表
  getViews(tableId.value).then((res) => {
    // console.log(res,'res')
    if (res.code == 200) {
      currentViews.value = res.data.viewTableVos
      defaultViewId.value = res.data.defaultViewId
      defaultViewName.value = res.data.defaultViewName
      currentViewName.value = res.data.defaultViewName
    }
  })
})
// 为了获取默认页所有的列
watchEffect(() => {
  if (
    props.columnNames &&
    props.columnNames.length > 0 &&
    currentViewId.value == -1
  ) {
    currentColumn.value = props.columnNames
  }
})
// 监控搜索结果
// watch(
//   () => props.searchResult,
//   (newVal) => {
//     console.log('执行了watch')
//     // 每当 searchResult 改变时，这里的代码会被执行
//     console.log(newVal, 'searchResult')
//     if (newVal.length == 0) {
//       console.log('searchResult为空')
//       searchResult.value = []
//     } else {
//       searchResult.value = newVal.map((item) => ({ value: item }))
//     }
//     console.log(searchResult.value, 'searchResult111')
//   }
// )

// 保存方案的方法
function savePlan() {
  if (currentViewId.value == -1) {
    ElMessageBox.alert('无法修改默认方案', '提示', {
      confirmButtonText: '好的',
      type: 'info'
    })
    return
  }
  const data = ref({
    viewId: currentViewId.value,
    tableId: tableId.value,
    cols: []
    //   .map((item) => ({
    //   colId: item.colId,
    //   valueOperator: item.valueOperator,
    //   chColName: item.chColName,
    //   voColName: item.voColName,
    //   colValue: item.colValue
    // }))
  })
  if (Object.keys(props.currentOrder).length != 0) {
    data.value.cols.push(props.currentOrder)
  }
  if (currentOption.value) {
    data.value.cols.push(...currentOption.value)
  }

  saveView(data.value).then((res) => {
    ElMessageBox.alert('保存筛选成功', '提示', {
      confirmButtonText: '好的',
      type: 'success'
    })
  })
  // console.log(data.value, '保存方案')
  // console.log(currentOption.value,'筛选条件')
}
// 打开新增方案时的一些初始化
function openAddScheme() {
  isAll.value = false
  selectedColumns.value = []
  dialogVisible.value = true
  isDefault.value = false
}
// 新增方案时传递给后端的参数
function addPlan() {
  const data = ref({
    tableId: tableId.value,
    viewName: viewName.value,
    isDefault: isDefault.value,
    // viewId:currentViewId.value,
    cols: selectedColumns.value.map((col) => ({ colId: col.id })) //colId是普通的列名
  })
  console.log(selectedColumns.value, '新增方案')
  if (viewName.value) {
    saveView(data.value)
      .then((res) => {
        if (res.code == 200) {
          ElMessageBox.alert('新增方案成功', '提示', {
            confirmButtonText: '好的',
            type: 'success'
          })
        } else if (res.code == 201) {
          ElMessageBox.alert(res.message, '提示', {
            confirmButtonText: '好的',
            type: 'error'
          })
        }
        getViews(tableId.value).then((res) => {
          if (res.code == 200) {
            currentViews.value = res.data.viewTableVos
            defaultViewId.value = res.data.defaultViewId
            defaultViewName.value = res.data.defaultViewName
          }
        })
      })
      .catch((error) => {
        ElMessageBox.alert('新增方案失败，请联系管理员', '提示', {
          confirmButtonText: '好的',
          type: 'error'
        })
      })
  } else {
    ElMessageBox.alert('方案名不能为空', '提示', {
      confirmButtonText: '好的',
      type: 'info'
    })
    return
  }

  selectedColumns.value = []
  viewName.value = ''
  isAll.value = false
  dialogVisible.value = false
}
// 修改方案时传递给后端的参数
function updatePlan() {
  const data = ref({
    tableId: tableId.value,
    viewName: currentViewName.value,
    isDefault: isDefault.value,
    viewId: currentViewId.value,
    cols: selectedColumns.value.map((col) => ({ colId: col.id })) //colId是普通的列名
  })
  // console.log(data.value, '修改方案')
  saveView(data.value).then((res) => {
    // emit('getViews', tableId.value)
    getViews(tableId.value).then((res) => {
      if (res.code == 200) {
        currentViews.value = res.data.viewTableVos
        defaultViewId.value = res.data.defaultViewId
        defaultViewName.value = res.data.defaultViewName
      }
    })
    emit('lookView', currentViewId.value, currentViewName.value)
    ElMessageBox.alert('修改方案成功', '提示', {
      confirmButtonText: '好的',
      type: 'success'
    })
  })
  isDefault.value = false
  dialogUpdate.value = false
}
// 新增方案时的取消
function cancel() {
  selectedColumns.value = []
  viewName.value = []
  isAll.value = false
  isDefault.value = false
  dialogVisible.value = false
  dialogUpdate.value = false
}
</script>

<style>
.outPlan > .el-row {
  flex-wrap: nowrap;
}
.addScheme .el-dialog {
  --el-dialog-padding-primary: 0;
  padding: 1.5rem 1.5rem;
  border-radius: 0.75rem;
}
.planName .el-button {
  border-radius: 0rem;
}
.planName .el-button:hover {
  background-color: #0053b5;
  color: #fff !important;
}
.planName .selected {
  background-color: #0053b5;
  color: #fff !important;
}
.commonPlan .bottomPlan {
  display: flex;
  background-color: #f1f4f6;
  align-items: center;
}
.commonPlan .bottomPlan button {
  width: 100%;
  display: flex;
  background-color: #f1f4f6;
  border: none;
  cursor: pointer;
  padding: 6px;
  font-size: 12px;
  color: #0053b5;
  align-items: center;
  justify-content: center;
  gap: 3px;
}
.commonPlan .el-checkbox {
  color: #000;
}
</style>
<style scoped lang="less">
.containerPlan {
  display: flex;
  background-color: #f1f4f6;
  box-sizing: border-box;
  // flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  // height: 72px;
  .first_row {
    display: flex;
    width: calc(100% - 3rem);
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1.5rem 0rem 1.5rem;
  }
  .box {
    padding: 6px 6px 6px 36px;
    box-sizing: border-box;
    font-size: 13px;
    height: 36px;
    color: #000;
    align-items: center;
  }
  .all {
    // height: 36px;
    padding: 6px 24px;
  }
  .box span {
    display: flex;
    height: 36px;
    align-items: center;
  }
  .closeIcon {
    padding: 6px;
    padding-left: 0px;
    margin-left: 12px;
    visibility: hidden;
    font-size: 16px;
    align-items: center;
  }
  .box:hover .closeIcon {
    visibility: visible; /* 当鼠标悬停在按钮上时，显示关闭图标 */
  }
  .filter:hover .closeIcon {
    visibility: visible; /* 当鼠标悬停在按钮上时，显示关闭图标 */
    cursor: pointer;
  }
  .closeIcon:hover {
    visibility: visible;
  }
  .filter .closeIcon {
    margin-left: 0;
    padding-right: 0;
  }

  .one {
    height: 3rem;
    align-items: center;
    // margin-right: 2.5rem;
    .white {
      color: #00417b;
    }
  }
  .blue {
    background-color: #1d89e9;
  }
  .head {
    height: 3rem;
    width: 100%;
    background-color: #f1f4f6;
  }
  .head button {
    border: none;
    background-color: #f1f4f6;
    padding: 0;
    line-height: 3rem;
    padding: 0 1.5625rem;
  }
  .head button:hover {
    background-color: #0053b5;
    cursor: pointer;
    color: #fff;
  }
  .selectAll {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  h3 {
    margin: 0;
    font-size: 0.875rem;
    font-weight: 400;
  }
  .black {
    color: #000;
  }
  .addScheme input {
    border: none;
    outline: none; // 去除选中状态边框
    background-color: rgba(0, 0, 0, 0); // 透明背景
  }
  .addScheme input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #aab2bd;
    /* placeholder字体大小  */
    font-size: 0.75rem; /* placeholder位置  */
    text-align: left;
  }
  .dialog-footer {
    display: flex;
    // flex-direction: row-reverse;
    justify-content: center;
    margin-top: 20px;
  }
  .confirm {
    margin-left: 20px;
  }
  .normal {
    padding: 8px 15px;
    border: 2px solid rgb(220, 223, 230);
    background-color: #fff;
    margin-left: 10px;
  }
  .el-checkbox-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0rem;
    column-gap: 0.3125rem;
  }
  .second_row {
    // height: 300px;
    // width: 100%;
    // width: calc(100vw - 300px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    flex-direction: row;
  }
  // .second_row .el-select{
  //   // width: 120px;
  // }
  .row_filter {
    display: grid;
    // width: calc(100vw - 300px);
    grid-template-columns: 1fr 1fr 1fr;
    flex: 1;
    padding: 12px 0;
    // padding-right: 12px;
    gap: 10px;
  }
  .filter {
    display: grid;
    width: 100%;
    grid-template-columns: 1.2fr 1fr 1fr 0.3fr;
    align-items: center;
    gap: 5px;
  }
  .addOption {
    width: 120px;
    height: 32px;
    border: none;
    display: flex;
    align-items: center;
    background-color: #f1f4f6;
    cursor: pointer;
    gap: 5px;
    // color: #000;
  }
  .addOption .el-icon {
    font-weight: bold;
    font-size: 14px;
  }
  .row_search {
    width: 100px;
  }
  .bottomPlan {
    display: flex;
    width: 100%;
    background-color: #f1f4f6 !important;
    justify-content: center;
  }
  .bottomPlan button {
    width: 100%;
    background-color: #f1f4f6;
  }
}
</style>
