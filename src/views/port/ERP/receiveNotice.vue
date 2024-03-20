<template>
  <div class="container">
    <div class="head">
      <button @click="addRow"><span class="first">新增</span></button>
      <button @click="modifyRow"><span>修改</span></button>
      <button @click="deleteSelectedRows"><span>删除</span></button>
      <button @click="fresh"><span>刷新</span></button>
      <button @click="downloadData"><span>导出</span></button>
    </div>
    <div class="main" ref="tableContainer">
      <div class="common" ref="commonPlan">
        <common-plan
          class="plan"
          :columnNames="ImmediateInventory.receiveNotice.column"
          :viewColumn="ImmediateInventory.receiveNotice.viewColumn"
          :currentViewId="currentViewId"
          :currentViewName="currentViewName"
          :apiUrl="'/interface/searchLike'"
          :currentTableId="8"
          :currentOrder="currentOrder"
          @lookView="lookView"
          @searchView="searchView"
          @getCurrentOption="getCurrentOption"
        />
      </div>
      <el-table
        ref="myTable"
        :data="ImmediateInventory.receiveNotice.data"
        :row-class-name="tableRowClassName"
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
        @sort-change="onSortChange"
        :max-height="tableMaxHeight"
      >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          label=""
          width="35"
          class="one"
        />
        <el-table-column
          prop="billNo"
          label="单据编号"
          width="150"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.billNo"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.billNo" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ row.billNo }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="materialId"
          label="物料编码"
          width="150"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.materialId"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.materialId" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ row.materialId }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="materialName"
          label="物料名称"
          width="250"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.materialName"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="mustQty"
          label="实收数量"
          width="120"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.mustQty"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.mustQty" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ formatNumber(row.mustQty) }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="checkQty"
          label="检测数量"
          width="120"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.checkQty"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.checkQty" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ formatNumber(row.checkQty) }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="receiveQty"
          label="合格数量"
          width="120"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.receiveQty"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.receiveQty" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ formatNumber(row.receiveQty) }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="csnReceiveBaseQty"
          label="让步接收数量(基本数量)"
          width="200"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.csnReceiveBaseQty"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input
                v-model="row.csnReceiveBaseQty"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ formatNumber(row.csnReceiveBaseQty) }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="inStockQty"
          label="入库数量"
          width="120"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.inStockQty"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.inStockQty" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ formatNumber(row.inStockQty) }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="chVersion"
          label="版本号"
          width="120"
          :sort-orders="['ascending', 'descending']"
          sortable="custom"
          v-if="plan.chVersion"
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
          :total="ImmediateInventory.receiveNotice.pages"
          @change-page="handlePages"
          @update-size="handleSizeChange"
          :totalRows="ImmediateInventory.receiveNotice.total"
          :currentPage="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onUnmounted,
  onMounted,
  reactive,
  computed,
  onBeforeUnmount
} from 'vue'
import CommonPlan from '@/components/CommonPlan.vue'
import { renderSortIcon } from '@/utils/sortIcon'
import useImmediateInventory from '../../../store/modules/port/ERP/immediateInventory'
import Pagination from '@/components/Pagination.vue'
import useUserStore from '@/store/modules/user'
import useUserMenu from '@/store/modules/menu'
const userMenu = useUserMenu()
const ImmediateInventory = useImmediateInventory()

let currentPage = ref(1)
let currentSize = ref(100)
let currentViewId = ref(null) //当前视图id
let currentViewName = ref('') //当前视图名字
const plan = ref({}) //当前方案各个列的true和false
const tableContainer = ref(null) //点击其他视图或者点击下一页时自动滑动到顶部
const commonPlan = ref(null)
const commonPlanHeight = ref(0)
const tableId = ref(8)
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
  ImmediateInventory.getPageFiltrate(
    param,
    currentPage.value,
    currentSize.value
  )
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
  currentPage.value = 1
  ImmediateInventory.getPageFiltrate(
    {
      tableId: tableId.value,
      viewId: currentViewId.value
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
      viewColumn = ImmediateInventory.receiveNotice.viewColumn
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
  ImmediateInventory.getPageFiltrate(
    param,
    currentPage.value,
    currentSize.value
  )
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

// 处理千分位
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
      ImmediateInventory.downloadInterfaceDate({
        type: 3,
        page: currentPage.value,
        size: currentSize.value,
        ...param
      }).then((res) => {
        if (res.code == 200) {
          ElMessage({
            type: 'success',
            message: '导出当前页成功'
          })
        } else if (res.code == 201) {
          ElMessage({
            type: 'error',
            message: res.message
          })
        }

        // console.log(res,'res')
      })
    })
    .catch((action) => {
      if (action === 'cancel') {
        ImmediateInventory.downloadInterfaceDate({
          type: 4,
          ...param
        }).then((res) => {
          ElMessage({
            type: 'success',
            message: '导出全部页成功'
          })
        })
      }
    })
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
  ImmediateInventory.getPageFiltrate(
    param,
    currentPage.value,
    currentSize.value
  )
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

const selectProcessName = ref([])
const selectProductFamily = ref([])
// const selectPackagingMethod = ref([])

const querySearch = (queryString, cb) => {
  const results = queryString
    ? selectProcessName.value.filter(createFilter(queryString))
    : selectProcessName.value
  cb(results)
}
const querySearchProductFamily = (queryString, cb) => {
  const results = queryString
    ? selectProductFamily.value.filter(createFilter(queryString))
    : selectProductFamily.value
  cb(results)
}

const createFilter = (queryString) => {
  return (item) => {
    return item.value.indexOf(queryString) !== -1
  }
}

let addAble = true //限制每次只能新增一行

const newRow = {
  billNo: '',
  materialId: '',
  materialName: '',
  mustQty: '',
  checkQty: '',
  receiveQty: '',
  csnReceiveBaseQty: '',
  inStockQty: '',
  chVersion: '',
  editable: true
}
const selectedRows = ref([]) // 存储选中的行数据

// 监控路由，切换页面时自动刷新表格数据
// watch(
//   () => route.path,
//   () => {
//     refresh();
//   }
// );

onMounted(() => {
  refresh()
  window.addEventListener('keydown', handleEsc);
})
// 处理 Esc 键按下的事件
const handleEsc = (event) => {
  if (event.keyCode === 27) {
    refreshContent();
  }
};
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc);
});
onUnmounted(() => {
  ImmediateInventory.resetState()
})

function changeRow(row) {
  row.editable = true
}
function modifyRow() {
  // selectedRows.value[0].editable = true
  if (selectedRows.value.length == 0) {
    ElMessageBox.alert('请选中一行修改', '提示', {
      confirmButtonText: '好的'
    })
  } else {
    selectedRows.value.forEach((row) => {
      row.editable = true
    })
  }
}

const myTable = ref(null)
function addRow() {
  if (addAble) {
    const scrollContainer = tableContainer.value.querySelector(
      '.el-scrollbar__wrap'
    )
    if (scrollContainer) {
      scrollContainer.scrollTop = 0 // 滚动到顶部
    }
    ImmediateInventory.receiveNotice.data.unshift({ ...newRow })
    addAble = false
  } else {
    return
  }
}

function saveRow(row) {
  // 这里可以添加保存数据的逻辑，例如将数据发送到后端
  // 修改数据
  //   console.log('修改数据', row)
  if (row.id) {
    ImmediateInventory.update(
      {
        id: row.id,
        billNo: row.billNo,
        materialId: row.materialId,
        materialName: row.materialName,
        mustQty: row.mustQty,
        checkQty: row.checkQty,
        receiveQty: row.receiveQty,
        csnReceiveBaseQty: row.csnReceiveBaseQty,
        inStockQty: row.inStockQty
      },
      8
    )
      .then((res) => {
        console.log('产能修改成功')
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
        refreshContent()
      })
      .catch((error) => {
        ElMessage({
          type: 'error',
          message: '修改失败'
        })
        refreshContent()
        console.log(row.id)
        console.log('产能修改失败')
      })
    // console.log('修改工序名')
    row.editable = false
  }
  // 新增数据
  else {
    // console.log(addAble,'@@@')
    ImmediateInventory.add(
      {
        billNo: row.billNo,
        materialId: row.materialId,
        materialName: row.materialName,
        mustQty: row.mustQty,
        checkQty: row.checkQty,
        receiveQty: row.receiveQty,
        csnReceiveBaseQty: row.csnReceiveBaseQty,
        inStockQty: row.inStockQty
      },
      8
    )
      .then((res) => {
        addAble = true
        if (res.code == 200) {
          ElMessage({
            type: 'success',
            message: '添加成功'
          })
          console.log('产能添加成功')
        } else {
          ElMessageBox.alert('数据不能为空', '添加数据失败', {
            confirmButtonText: '好'
          })
        }
        refreshContent()
      })
      .catch((error) => {
        ElMessage({
          type: 'error',
          message: '添加失败'
        })
        console.log(error)
        console.log('产能添加失败')
        refreshContent()
      })

    // 序号自动加1
    // row.id = process.processNames.length;
    // 保存成功后可以在这里更新状态或执行其他操作
    row.editable = false // 保存后将行设置为不可编辑状态
    // addAble = true;
  }
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

  ImmediateInventory.getPageFiltrate(
    param,
    currentPage.value,
    currentSize.value
  )
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
  // console.log(list,'批量删除工序名称')
  if (list.length == 0) {
    ElMessageBox.alert('请选中至少一行删除', '提示', {
      confirmButtonText: '好的'
    })
  } else {
    ElMessageBox.confirm('确定删除这些工序吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        ImmediateInventory.deleteData(list, 8)
          .then((res) => {
            console.log('删除产能成功')
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
            console.log('批量删除产能失败')
          })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除'
        })
      })
  }
}
// 只刷新查到的内容
function refreshContent() {
  addAble = true
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
  ImmediateInventory.getPageFiltrate(
    param,
    currentPage.value,
    currentSize.value
  )
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

function handleChange(selection) {
  // 更新 selectedRows
  selectedRows.value = selection
}

function refresh() {
  addAble = true
  currentSize.value = useUserStore().pageSize
  // 获取所有视图
  ImmediateInventory.getViews(tableId.value).then((res) => {
    currentViewId.value = ImmediateInventory.receiveNotice.defaultViewId
    currentViewName.value = ImmediateInventory.receiveNotice.defaultViewName
    // 获取所有的列
    ImmediateInventory.getCols(tableId.value).then((res) => {
      // 获取到列名和视图列后再赋值给column和viewColumn
      column = ImmediateInventory.receiveNotice.column
      viewColumn = ImmediateInventory.receiveNotice.viewColumn
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
      ImmediateInventory.getPageFiltrate(
        { tableId: tableId.value, viewId: currentViewId.value },
        currentPage.value,
        currentSize.value
      )
        .then((res) => {
          if (res.code == 201) {
            ElMessageBox.alert(res.message, '提示', {
              confirmButtonText: '好的'
            })
          }
        })
        .catch((error) => {})
      myTable.value.clearSelection()
    })
  })
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
  /* padding: .5rem 0; */
}
</style>

<style scoped>
.container {
  display: flex;
  /* height: 34.6875rem; */
  margin: 1.5rem 24px;
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
span {
  font-size: 14px;
}
.main {
  flex: 1;
}
.el-table {
  border: 0.0625rem solid #9db9d6;
  /* background-color: red; */
}
.bottom {
  position: fixed;
  bottom: 0;
}
</style>
