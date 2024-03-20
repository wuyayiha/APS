<template>
  <div class="container">
    <div class="head">
      <button @click="fresh"><span class="first">刷新</span></button>
      <button @click="downloadData"><span>导出</span></button>
    </div>
    <div class="main" ref="tableContainer">
      <div class="common" ref="commonPlan">
        <common-plan
          class="plan"
          :columnNames="process.lastPlanList.column"
          :viewColumn="process.lastPlanList.viewColumn"
          :currentViewId="currentViewId"
          :currentViewName="currentViewName"
          :apiUrl="'/masterData/searchLike'"
          :currentTableId="63"
          :currentOrder="currentOrder"
          @lookView="lookView"
          @searchView="searchView"
          @getCurrentOption="getCurrentOption"
        />
      </div>
      <el-table
        :data="process.lastPlanList.data"
        border
        :cell-style="{ borderColor: '#9db9d6', textAlign: 'center' }"
        :header-cell-style="{
          borderColor: '#9db9d6',
          background: '#d9e9f8',
          color: '#000',
          textAlign: 'center',
          fontWeight: '500'
        }"
        row-key="id"
        @selection-change="handleChange"
        @row-dblclick="changeRow"
        :max-height="tableMaxHeight"
        @sort-change="onSortChange"
      >
        <!-- <el-table-column type="selection" :reserve-selection="true" label="" width="35" class="one"/> -->
        <el-table-column
          prop="productFamily"
          label="产品族"
          width="170"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.productFamily"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="currentProcessScheme"
          label="当前工艺方案"
          width="250"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.currentProcessScheme"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template v-slot:default="scope">
            <a @click="handleLinkClick(scope.row)">{{
              scope.row.currentProcessScheme
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="optimalProcessPlan"
          label="最优工艺方案"
          width="250"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.optimalProcessPlan"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template v-slot:default="scope">
            <a @click="handleOptimalPlan(scope.row)">{{
              scope.row.optimalProcessPlan
            }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="经济批量"
          width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.orderNumber"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.orderNumber" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ formatNumber(row.orderNumber) }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="人数"
          width="90"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.number"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="productionLineBalanceRate"
          label="产线平衡率"
          width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.productionLineBalanceRate"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="completionTime"
          label="完成时间(h)"
          width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.completionTime"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="releasableStaffCount"
          label="可以释放人数"
          width="130"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.releasableStaffCount"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="totalReleaseTime"
          label="释放总时间(h)"
          width="200"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.totalReleaseTime"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div
        class="bottom"
        :style="{
          width: userMenu.isCollapse
            ? 'calc(100vw - 50px)'
            : 'calc(100vw - 250px)'
        }"
      >
        <Pagination
          :total="process.lastPlanList.totalPages"
          @change-page="handlePages"
          @update-size="handleSizeChange"
          :totalRows="process.lastPlanList.total"
          :currentPage="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  reactive,
  computed,
  onBeforeUnmount
} from 'vue'
import { renderSortIcon } from '@/utils/sortIcon'
import CommonPlan from '@/components/CommonPlan.vue'
import processManage from '../../../store/modules/metaData/processManage'
import { useRouter } from 'vue-router'
import useUserStore from '../../../store/modules/user'
import useUserMenu from '@/store/modules/menu'
const userMenu = useUserMenu()
const process = processManage()
const router = useRouter()

let currentPage = ref(1)
let currentSize = ref(100)
let currentViewId = ref(null) //当前视图id
let currentViewName = ref('') //当前视图名字
const plan = ref({}) //当前方案各个列的true和false
const tableContainer = ref(null) //点击其他视图或者点击下一页时自动滑动到顶部
const commonPlan = ref(null)
const commonPlanHeight = ref(0)
const tableId = ref(63)
const localCurrentOption = ref([]) //子组件中传过来的currentOption
const currentOrder = ref({}) //当前排序的字段
let column = reactive([]) //所有列名
let viewColumn = reactive([]) //当前视图的所拥有的列名

// 获取到子组件中currentOption的值
function getCurrentOption(currentOption) {
  localCurrentOption.value = currentOption
}

// 字段的排序
function onSortChange(sortDetails) {
  // prop 即为当前排序的字段
  // order 即为排序的方式
  // 1. 升序 order = 'ascending'
  // 2. 降序 order = 'descending'
  // 3. 取消排序 order = null
  //子组件传过来currentOption,还有根据prop对应column中的voColName,提取出colId
  if (viewColumn.length != 0) {
    const id = viewColumn.find((item) => item.voColName == sortDetails.prop).id //视图列id
    currentOrder.value.id = id
  }
  const colId = column.find((item) => item.voColName == sortDetails.prop).id //全部列id
  currentOrder.value.valueOperator = sortDetails.order
  currentOrder.value.colId = colId
  let param = {
    tableId: tableId.value,
    viewId: currentViewId.value,
    cols: [currentOrder.value]
  }

  // 判断有没有筛选条件，传的参数不一样
  if (localCurrentOption.value) {
    param.cols.push(...localCurrentOption.value)
  }

  // console.log(localCurrentOption.value, 'localCurrentOption.value')
  process
    .getMetaData(param, currentPage.value, currentSize.value)
    .then((res) => {
      if (res.code == 201) {
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '好的'
        })
      } else {
        const scrollContainer = tableContainer.value.querySelector(
          '.el-scrollbar__wrap'
        )
        if (scrollContainer) {
          scrollContainer.scrollTop = 0 // 滚动到顶部
        }
        console.log('获取成品計劃数据成功')
      }
    })
    .catch((error) => {})
}

// 动态计算表格高度
const tableMaxHeight = computed(() => {
  return `calc(100vh - ${190 + commonPlanHeight.value}px)`
})

onMounted(() => {
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      commonPlanHeight.value = entry.target.offsetHeight
    }
  })

  if (commonPlan.value) {
    observer.observe(commonPlan.value)
  }

  onBeforeUnmount(() => {
    if (commonPlan.value) {
      observer.unobserve(commonPlan.value)
    }
  })
})

// 给剩余的列拼上false
function transformColumns(column, viewColumn) {
  // 从 column1 创建初始对象，所有值设为 false
  const result = column.reduce((acc, item) => {
    acc[item.voColName] = false
    return acc
  }, {})

  // 更新 result 对象，将 scheme1 中存在的字段设置为 true
  viewColumn.forEach((col) => {
    if (col.voColName in result) {
      result[col.voColName] = true
    }
  })
  return result
}

// 查看视图
function lookView(viewId, viewName) {
  currentViewId.value = viewId
  currentViewName.value = viewName
  // if (currentViewId.value != -1) {
    currentPage.value = 1
  // }

  process
    .getMetaData(
      {
        viewId: currentViewId.value,
        tableId: tableId.value
      },
      currentPage.value,
      currentSize.value
    )
    .then((res) => {
      if (res.code == 201) {
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '好的'
        })
      }
      viewColumn = process.lastPlanList.viewColumn
      // console.log(viewColumn,'viewColumn')
      if (viewId == '-1') {
        plan.value = column.reduce((acc, item) => {
          acc[item.voColName] = true
          return acc
        }, {})
      } else {
        plan.value = transformColumns(column, viewColumn)
      }
      const scrollContainer = tableContainer.value.querySelector(
        '.el-scrollbar__wrap'
      )
      if (scrollContainer) {
        scrollContainer.scrollTop = 0 // 滚动到顶部
      }
    })
    .catch((error) => {})

  // console.log(viewId,viewName,'111')
}
// 搜索视图
function searchView(param) {
  currentPage.value = 1
  process
    .getMetaData(param, currentPage.value, currentSize.value)
    .then((res) => {
      if (res.code == 201) {
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '好的'
        })
      }
      const scrollContainer = tableContainer.value.querySelector(
        '.el-scrollbar__wrap'
      )
      if (scrollContainer) {
        scrollContainer.scrollTop = 0 // 滚动到顶部
      }
      console.log('获取分页表格数据成功')
    })
    .catch((error) => {})
}


const formatNumber = (value) => {
  if (value) {
    // 创建一个新的Intl.NumberFormat实例
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, // 设置最小小数位数为 2
      maximumFractionDigits: 2 // 设置最大小数位数为 2
    })
    // 返回格式化的数字
    return formatter.format(value)
  }
}

function changeRow(row) {
  row.editable = true
}


function handleLinkClick(row) {
  process
    .getProcessSchemeById(row.id)
    .then((res) => {})
    .catch((error) => {})
  // console.log(row,'@@')
  router.push({ path: '/viewBasePlan' })
}

function downloadData() {
  let cols = []
  // 当 currentOrder.value 有键时，添加 currentOrder.value
  if (Object.keys(currentOrder.value).length !== 0) {
    cols.push(currentOrder.value)
  }

  // 当 localCurrentOption.value 存在时，添加 localCurrentOption.value
  if (localCurrentOption.value) {
    cols.push(...localCurrentOption.value)
  }
  const param = {
    tableId: tableId.value,
    viewId: currentViewId.value,
    cols: cols
  }
  ElMessageBox.confirm('请选择你要导出的数据', '提示', {
    distinguishCancelAndClose: true,
    confirmButtonText: '当前页',
    cancelButtonText: '全部页',
    type: 'warning'
  })
    .then(() => {
      process
        .downloadMetaData({
          type: 3,
          page: currentPage.value,
          size: currentSize.value,
          ...param
        })
        .then((res) => {
          if (res.code == 200) {
            ElMessage({
              type: 'success',
              message: '导出当前页成功'
            })
          }
          // console.log(res,'res')
        })
    })
    .catch((action) => {
      if (action === 'cancel') {
        process
          .downloadMetaData({
            type: 4,
            ...param
          })
          .then((res) => {
            if (res.code == 200) {
              ElMessage({
                type: 'success',
                message: '导出全部页成功'
              })
            }
          })
      }
    })
}

function refresh() {
  currentSize.value = useUserStore().pageSize
  // 获取所有视图
  process.getViews(tableId.value).then((res) => {
    currentViewId.value = process.lastPlanList.defaultViewId
    currentViewName.value = process.lastPlanList.defaultViewName
    // 获取所有的列
    process.getCols(tableId.value).then((res) => {
      // 获取到列名和视图列后再赋值给column和viewColumn
      column = process.lastPlanList.column
      viewColumn = process.lastPlanList.viewColumn
      // 如果是“全部”就给plan赋值
      if (currentViewId.value == -1) {
        plan.value = column.reduce((acc, item) => {
          acc[item.voColName] = true
          return acc
        }, {})
        // console.log(plan.value, 'plan11')
      } else {
        plan.value = transformColumns(column, viewColumn)
      }
      // 获取拥有的数据和所拥有的列
      process
        .getMetaData(
          { viewId: currentViewId.value, tableId: tableId.value },
          currentPage.value,
          currentSize.value
        )
        .then((res) => {
          if (res.code == 201) {
            ElMessageBox.alert(res.message, '提示', {
              confirmButtonText: '好的'
            })
          }
          console.log('查询产品计划列表')
        })
        .catch((error) => {})
    })
  })
}

// 只刷新内容
function refreshContent() {
  currentSize.value = useUserStore().pageSize
  // 刷新列
  let cols = []
  // 当 currentOrder.value 有键时，添加 currentOrder.value
  if (Object.keys(currentOrder.value).length !== 0) {
    cols.push(currentOrder.value)
  }

  // 当 localCurrentOption.value 存在时，添加 localCurrentOption.value
  if (localCurrentOption.value) {
    cols.push(...localCurrentOption.value)
  }
  const param = {
    tableId: tableId.value,
    viewId: currentViewId.value,
    cols: cols
  }
  process
    .getMetaData(param, currentPage.value, currentSize.value)
    .then((res) => {
      if (res.code == 201) {
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '好的'
        })
      }
    })
    .catch((error) => {})
}

function fresh() {
  refreshContent()
  ElMessage({
    type: 'success',
    message: '刷新成功'
  })
}

// 查看方案
function handleOptimalPlan(row) {
  process
    .getProcessSchemeById(row.optimalId)
    .then((res) => {
      router.push({ path: '/viewBasePlan' })
    })
    .catch((error) => {})
}
const selectedRows = ref([]) // 存储选中的行数据

// 监控路由，切换页面时自动刷新表格数据
// watch(() => route.path, () => {
//   refresh()
// })

onBeforeMount(() => {
  refresh()
})

function handleSizeChange(newSize) {
  currentSize.value = newSize
  let cols = []
  // 当 currentOrder.value 有键时，添加 currentOrder.value
  if (Object.keys(currentOrder.value).length !== 0) {
    cols.push(currentOrder.value)
  }

  // 当 localCurrentOption.value 存在时，添加 localCurrentOption.value
  if (localCurrentOption.value) {
    cols.push(...localCurrentOption.value)
  }
  const param = {
    tableId: tableId.value,
    viewId: currentViewId.value,
    cols: cols
  }
  process
    .getMetaData(param, currentPage.value, currentSize.value)
    .then((res) => {
      if (res.code == 201) {
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '好的'
        })
      }
      console.log('获取成品計劃数据成功')
    })
    .catch((error) => {})
}

function handlePages(page) {
  currentPage.value = page
  let cols = []
  // 当 currentOrder.value 有键时，添加 currentOrder.value
  if (Object.keys(currentOrder.value).length !== 0) {
    cols.push(currentOrder.value)
  }

  // 当 localCurrentOption.value 存在时，添加 localCurrentOption.value
  if (localCurrentOption.value) {
    cols.push(...localCurrentOption.value)
  }
  const param = {
    tableId: tableId.value,
    viewId: currentViewId.value,
    cols: cols
  }

  process
    .getMetaData(param, currentPage.value, currentSize.value)
    .then((res) => {
      if (res.code == 201) {
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '好的'
        })
      }
      const scrollContainer = tableContainer.value.querySelector(
        '.el-scrollbar__wrap'
      )
      if (scrollContainer) {
        scrollContainer.scrollTop = 0 // 滚动到顶部
      }
      console.log('获取分页表格数据成功')
    })
    .catch((error) => {})
}


function handleChange(selection) {
  // 更新 selectedRows
  selectedRows.value = selection
}
function saveRow(row) {
  process
    .updateProcessSchemeManagement(row)
    .then((res) => {
      console.log('更改最终工艺方案成功')
      refresh()
    })
    .catch((error) => {})
  row.editable = false
}
</script>

<style>
.el-table .el-table__cell {
  padding: 0;
  /* padding: 8px 0; */
}
</style>

<style scoped>
.container {
  display: flex;
  margin: 24px 24px;
  flex-direction: column;
  /* background-color: red; */
}
.plan {
  flex-direction: row-reverse;
  margin: 0;
  margin-top: 24px;
}
.head {
  height: 48px;
  width: 100%;
  background-color: #f1f4f6;
}
button {
  border: none;
  background-color: #f1f4f6;
  padding: 0;
  line-height: 48px;
  padding: 0 25px;
}
button:hover {
  background-color: #0053b5;
  cursor: pointer;
  color: #fff;
}
a {
  color: #0053b5;
}
a:hover {
  cursor: pointer;
  text-decoration: underline;
}
span {
  font-size: 14px;
}
.main {
  /* background-color: blue; */
  /* width: 100%; */
  flex: 1;
}
.el-table {
  border: 1px solid #9db9d6;
  /* background-color: red; */
}
.bottom {
  position: fixed;
  bottom: 0;
}
</style>
