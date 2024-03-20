<template>
  <div class="container">
    <div class="head">
      <button @click="addRow"><span class="first">新增</span></button>
      <button @click="deleteSelectedRows"><span>删除</span></button>
      <button @click="fresh"><span>刷新</span></button>
      <button @click="downloadData"><span>导出</span></button>
    </div>
    <div class="main" ref="tableContainer">
      <div class="common" ref="commonPlan">
        <common-plan
          class="plan"
          :columnNames="process.basePlanList.column"
          :viewColumn="process.basePlanList.viewColumn"
          :currentViewId="currentViewId"
          :currentViewName="currentViewName"
          :apiUrl="'/masterData/searchLike'"
          :currentTableId="62"
          :currentOrder="currentOrder"
          @lookView="lookView"
          @searchView="searchView"
          @getCurrentOption="getCurrentOption"
        />
      </div>
      <el-table
        ref="myTable"
        :data="process.basePlanList.data"
        :row-class-name="tableRowClassName"
        :cell-class-name="employeeNameColor"
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
        :max-height="tableMaxHeight"
        @sort-change="onSortChange"
      >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          label=""
          width="35"
          class="one"
        />
        <el-table-column
          prop="currentProcessScheme"
          label="当前工艺方案"
          width="200"
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
          prop="belongingProcess"
          label="所属工序"
          width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.belongingProcess"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="productFamily"
          label="产品族"
          width="120"
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
          prop="processNumber"
          label="序号"
          width="60"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.processNumber"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="processName"
          label="工序名称"
          width="200"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.processName"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="switchTime"
          label="切换时间(s)"
          width="150"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.switchTime"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template v-slot:default="scope">
            {{ formatNumber(scope.row.switchTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="packagingMethod"
          label="包装方式"
          width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.packagingMethod"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="standardTime"
          label="标准工时(s)"
          width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.standardTime"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template v-slot:default="scope">
            {{ formatNumber(scope.row.standardTime) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="maxPersonnel"
          label="人员Max"
          width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.maxPersonnel"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="minPersonnel"
          label="人员Min"
          width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.minPersonnel"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="employeeName"
          label="员工姓名"
          width="90"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.employeeName"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="人数"
          width="80"
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
          prop="state"
          label="状态"
          width="80"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.state"
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
          :total="process.basePlanList.totalPages"
          @change-page="handlePages"
          @update-size="handleSizeChange"
          :totalRows="process.basePlanList.total"
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
import { useRoute, useRouter } from 'vue-router'
import useUserMenu from '../../../store/modules/menu'
import Pagination from '@/components/Pagination.vue'
import useUserStore from '../../../store/modules/user'
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
const tableId = ref(62)
const localCurrentOption = ref([]) //子组件中传过来的currentOption
const currentOrder = ref({}) //当前排序的字段
let column = reactive([]) //所有列名
let viewColumn = reactive([]) //当前视图的所拥有的列名

// 修改表格选中行的样式
// 这个方法返回一个类名，基于行是否被选中
function tableRowClassName({ row }) {
  // 检查当前行是否在selectedRows中
  const isRowSelected = selectedRows.value.some(
    (selectedRow) => selectedRow.id === row.id
  )
  return isRowSelected ? 'row-highlight' : ''
}

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
      viewColumn = process.basePlanList.viewColumn
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
      minimumFractionDigits: 0 // 数字最少位数
    })
    // 返回格式化的数字
    return formatter.format(value)
  }
}
function employeeNameColor({ row, column, rowIndex, columnIndex }) {
  // console.log(row, 'row');
  if (column.property === 'employeeName') {
    if (row.employeeName === '员工1') {
      return 'name1'
    } else if (row.employeeName === '员工2') {
      return 'name2'
    } else if (row.employeeName === '员工3') {
      return 'name3'
    } else if (row.employeeName === '员工4') {
      return 'name4'
    } else if (row.employeeName === '员工5') {
      return 'name5'
    } else if (row.employeeName === '员工6') {
      return 'name6'
    } else if (row.employeeName === '员工7') {
      return 'name7'
    } else if (row.employeeName === '员工8') {
      return 'name8'
    } else if (row.employeeName === '员工9') {
      return 'name9'
    } else if (row.employeeName === '员工10') {
      return 'name10'
    }
  }
}
function handleLinkClick(row) {
  process.getProcessSchemeById(row.id)
  console.log(row, '@@')
  router.push({ path: '/viewBasePlan' })
}

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

const selectedRows = ref([]) // 存储选中的行数据

// 监控路由，切换页面时自动刷新表格数据
// watch(() => route.path, () => {
//   refresh()
// })

onBeforeMount(() => {
  refresh()
})

function addRow() {
  process.createBasePlan.Edited = false
  process.createBasePlan.productFamily = ''
  process.createBasePlan.number = ''
  process.createBasePlan.data = []
  router.push({ path: '/createBasePlan' })
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

function deleteSelectedRows() {
  // 在这里处理删除选中行的逻辑，可以从 selectedRows 中获取选中行的数据
  // 批量删除
  const list = []
  selectedRows.value.forEach((row) => {
    list.push(row.id)
  })
  if (list.length == 0) {
    ElMessageBox.alert('请选中至少一行删除', '提示', {
      confirmButtonText: '好的'
    })
  } else {
    ElMessageBox.confirm('确定删除这些工序方案吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        process
          .deleteProcessScheme(list)
          .then((res) => {
            console.log('删除基础工艺方案成功')
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            refreshContent()
          })
          .catch((error) => {
            refreshContent()
            ElMessage({
              type: 'error',
              message: '删除失败'
            })
            console.log(error)
            console.log('批量删除基础工艺方案失败')
          })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除'
        })
      })
  }

  // console.log(list,'批量删除工序名称')
}
function handleChange(selection) {
  // 更新 selectedRows
  selectedRows.value = selection
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

const myTable = ref(null)
function refresh() {
  currentSize.value = useUserStore().pageSize
  // 获取所有视图
  process.getViews(tableId.value).then((res) => {
    currentViewId.value = process.basePlanList.defaultViewId
    currentViewName.value = process.basePlanList.defaultViewName
    // 获取所有的列
    process.getCols(tableId.value).then((res) => {
      // 获取到列名和视图列后再赋值给column和viewColumn
      column = process.basePlanList.column
      viewColumn = process.basePlanList.viewColumn
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
  myTable.value.clearSelection()
}

function fresh() {
  refreshContent()
  ElMessage({
    type: 'success',
    message: '刷新成功'
  })
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
  /* height: 555px; */
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

::v-deep .name1 {
  background-color: #ffc0cb; /* 某种颜色 */
}

::v-deep .name2 {
  background-color: #add8e6; /* 另一种颜色 */
}
::v-deep .name3 {
  background-color: #ffa500; /* 某种颜色 */
}

::v-deep .name4 {
  background-color: yellow; /* 另一种颜色 */
}
::v-deep .name5 {
  background-color: #e6e6fa; /* 另一种颜色 */
}
::v-deep .name6 {
  background-color: #ffffe0; /* 另一种颜色 */
}
::v-deep .name7 {
  background-color: #d3d3d3; /* 另一种颜色 */
}
::v-deep .name8 {
  background-color: #fafad2; /* 另一种颜色 */
}
::v-deep .name9 {
  background-color: #ffd1dc; /* 另一种颜色 */
}
::v-deep .name10 {
  background-color: #f5fffa; /* 另一种颜色 */
}
.bottom {
  position: fixed;
  bottom: 0;
}
</style>
