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
          :columnNames="ImmediateInventory.immediateInventory.column"
          :viewColumn="ImmediateInventory.immediateInventory.viewColumn"
          :currentViewId="currentViewId"
          :currentViewName="currentViewName"
          :apiUrl="'/interface/searchLike'"
          :currentTableId="1"
          :currentOrder="currentOrder"
          @lookView="lookView"
          @searchView="searchView"
          @getCurrentOption="getCurrentOption"
        />
      </div>
      <div>
        <!-- <div
          class="outContainer"
          ref="outContainer"
          :style="{ height: containerHeigth }"
        > -->
          <!-- 数据列表 -->
          <!-- <div class="list" :style="{ top: listTop }"> -->
            <el-table
              ref="myTable"
              :data="ImmediateInventory.immediateInventory.data"
              :style="{ height: containerHeigth }"
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
                prop="materialId"
                label="物料编码"
                width="160"
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
                    <el-input
                      v-model="row.materialId"
                      @keyup.enter="saveRow(row)"
                    />
                  </template>
                  <template v-else>
                    {{ row.materialId }}
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                prop="materialName"
                label="物料名称"
                width="300"
                v-if="plan.materialName"
                :sort-orders="['ascending', 'descending']"
                sortable="custom"
              >
                <template v-slot:header="{ column }">
                  <div>
                    {{ column.label }}
                    <span v-html="renderSortIcon(column)"></span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="stockName"
                label="仓库名称"
                width="150"
                :sort-orders="['ascending', 'descending']"
                sortable="custom"
                v-if="plan.stockName"
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
                      v-model="row.stockName"
                      @keyup.enter="saveRow(row)"
                    />
                  </template>
                  <template v-else>
                    {{ row.stockName }}
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                prop="baseQty"
                label="库存量(基本单位)"
                width="180"
                :sort-orders="['ascending', 'descending']"
                sortable="custom"
                v-if="plan.baseQty"
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
                      v-model="row.baseQty"
                      @keyup.enter="saveRow(row)"
                    />
                  </template>
                  <template v-else>
                    {{ formatNumber(row.baseQty) }}
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                prop="avbQty"
                label="可用量(主单位)"
                width="180"
                :sort-orders="['ascending', 'descending']"
                sortable="custom"
                v-if="plan.avbQty"
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
                      v-model="row.avbQty"
                      @keyup.enter="saveRow(row)"
                    />
                  </template>
                  <template v-else>
                    {{ formatNumber(row.avbQty) }}
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                prop="lot"
                label="批号"
                width="130"
                :sort-orders="['ascending', 'descending']"
                sortable="custom"
                v-if="plan.lot"
              >
                <template v-slot:header="{ column }">
                  <div>
                    {{ column.label }}
                    <span v-html="renderSortIcon(column)"></span>
                  </div>
                </template>
                <template #default="{ row }">
                  <template v-if="row.editable">
                    <el-input v-model="row.lot" @keyup.enter="saveRow(row)" />
                  </template>
                  <template v-else>
                    {{ row.lot }}
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                prop="expiryDate"
                label="有效期至"
                width="180"
                :sort-orders="['ascending', 'descending']"
                sortable="custom"
                v-if="plan.expiryDate"
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
                      v-model="row.expiryDate"
                      @keyup.enter="saveRow(row)"
                    />
                  </template>
                  <template v-else>
                    {{ row.expiryDate }}
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
            <!-- 用于撑开高度的元素 -->
            <!-- <div class="bar" :style="{ height: barHeigth }"></div> -->
          <!-- </div> -->
        <!-- </div> -->
      </div>
      <div
        class="bottom"
        :style="{
          width: userMenu.isCollapse
            ? 'calc(100vw - 50px)'
            : 'calc(100vw - 250px)'
        }"
      >
        <Pagination
          :total="ImmediateInventory.immediateInventory.pages"
          @change-page="handlePages"
          @update-size="handleSizeChange"
          :totalRows="ImmediateInventory.immediateInventory.total"
          :currentPage="currentPage"
        />
      </div>
    </div>

    <div class="importData">
      <el-dialog title="导入文件" v-model="dialogVisible" width="30%">
        <!-- 文件上传 -->
        <el-upload
          class="upload-demo"
          drag
          :auto-upload="false"
          :file-list="fileList"
          :on-change="handleFileChange"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <!-- 底部操作按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="overUpload" class="confirm normal"
            >覆盖导入</el-button
          >
          <el-button @click="addUpload" class="normal">追加导入</el-button>
          <el-button @click="downloadModel" class="normal">下载模板</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  reactive,
  computed,
  watch,
  onBeforeUnmount,
  nextTick
} from 'vue'
import { renderSortIcon } from '@/utils/sortIcon'
import CommonPlan from '@/components/CommonPlan.vue'
import useImmediateInventory from '../../../store/modules/port/ERP/immediateInventory'
import Pagination from '@/components/Pagination.vue'
import useUserStore from '@/store/modules/user'
import useUserMenu from '@/store/modules/menu'
import { transform } from 'lodash'
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
const tableId = ref(1)
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
      viewColumn = ImmediateInventory.immediateInventory.viewColumn
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
// 导出
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
const dialogVisible = ref(false)
const fileToUpload = ref(null)
const fileList = ref([])
const importType = ref(1)

function handleFileChange(file) {
  // 存储用户选中的文件
  fileToUpload.value = file
}
// console.log(fileToUpload.value, 'fileToUpload')

async function addUpload() {
  if (!fileToUpload.value) {
    // console.log('没有选择文件')
    ElMessageBox.alert('请上传文件后导入', '提示', {
      type: 'info',
      confirmButtonText: '好的'
    })
    // dialogVisible.value = false
    return
  }

  const uploadData = {
    file: fileToUpload.value,
    type: importType.value // 您可以根据需要添加其他数据
  }
  ImmediateInventory.importInterfaceData(uploadData, 1).then((res) => {
    // console.log(res,'res')
    if (res.code == 200) {
      ElMessageBox.alert('导入成功', '提示', {
        type: 'success',
        confirmButtonText: '好的'
      })
    } else if (res.code == 201) {
      ElMessageBox.alert(res.message, '导入失败', {
        type: 'error',
        confirmButtonText: '好的'
      })
    }
    importType.value = 1
    refreshContent()
  })

  // 重置文件
  fileList.value = []
  fileToUpload.value = null
  dialogVisible.value = false
}
function overUpload() {
  ElMessageBox.confirm('该操作将会覆盖全部数据，是否执行？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      importType.value = 2 //设置成覆盖类型
      addUpload()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消覆盖导入'
      })
    })
}
function downloadModel() {
  ImmediateInventory.downloadInterfaceTemplate(1).then((res) => {
    dialogVisible.value = false
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
  id: '', // 或者给一个唯一值，如果这是必需的
  avbQty: null,
  materialId: '', // 确保这个字段是空字符串，如果这是你期望的
  baseQty: null,
  lot: '',
  expiryDate: '',
  stockName: '',
  materialName: '',
  // 其他必要的字段
  chVersion: '',
  editable: true
}
const selectedRows = ref([]) // 存储选中的行数据

// // 虚拟列表
// let originaData = ref([])
// //获取列表dom
// let scrollBar = ref(null)
// //需要展示单条数据的高度
// let size = 24
// //需要展示的起始下标
// let start = ref(0)
// // 需要展示数据的结束下标
// let end = ref(24)
// //每次渲染的节点个数
// let shownum = 24
// let showData = ref([])
// watch(
//   () => ImmediateInventory.immediateInventory.data,
//   (newArray, oldArray) => {
//     originaData.value = newArray
//     showData.value = originaData.value.slice(start.value, end.value)
//   },
//   { deep: true }
// )

// //容器的高度
// let containerHeigth = computed(() => {
//   return size * shownum + 'px'
// })
// //撑开容器内容高度的元素高度
// let barHeigth = computed(() => {
//   return size * originaData.length + 'px'
// })
// //列表项上滚动该表top值
// let listTop = computed(() => {
//   return start.value * size + 'px'
// })
// onMounted(()=>{
//   nextTick(()=>{
//     scrollBar = document.querySelector('.el-scrollbar')
//     console.log(scrollBar)
//     scrollBar.addEventListener('scroll',handleScroll)
//     console.log('已经添加了',scrollBar.addEventListener('scroll',handleScroll))
//   })
// })

// //容器的滚动事件
// function handleScroll() {
//   console.log('我触发了')
//   //获取容器顶部滚动条的尺寸
//   const scrollTop = scrollBar.value.scrollTop
//   //计算卷曲的数据条数，用计算的结果作为获取数据的起始和结束下标
//   //起始的下标就是卷去的数据条数，向下取整
//   start.value = Math.floor(scrollTop / size)
//   //结束下标就是起始下标加上需要展示的数据条数
//   end.value = start.value + shownum
// }

onMounted(() => {
  refresh()
  window.addEventListener('keydown', handleEsc)
})

// 处理 Esc 键按下的事件
const handleEsc = (event) => {
  if (event.keyCode === 27) {
    refreshContent()
  }
}
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEsc)
})

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
    ImmediateInventory.immediateInventory.data.unshift({ ...newRow })
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
        version: row.version,
        avbQty: row.avbQty,
        materialId: row.materialId,
        baseQty: row.baseQty,
        lot: row.lot,
        expiryDate: row.expiryDate,
        stockName: row.stockName,
        materialName: row.materialName
      },
      1
    )
      .then((res) => {
        ElMessage({
          type: 'success',
          message: '修改成功'
        })
        console.log('产能修改成功')
        refreshContent()
      })
      .catch((error) => {
        refreshContent()
        ElMessage({
          type: 'error',
          message: '修改失败'
        })
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
        avbQty: row.avbQty,
        materialId: row.materialId,
        baseQty: row.baseQty,
        lot: row.lot,
        expiryDate: row.expiryDate,
        stockName: row.stockName,
        materialName: row.materialName
      },
      1
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
        ImmediateInventory.deleteData(list, 1)
          .then((res) => {
            console.log('删除产能成功')
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            refreshContent()
          })
          .catch((error) => {
            ElMessage({
              type: 'error',
              message: '删除失败'
            })
            console.log(error)
            console.log('批量删除产能失败')
            refreshContent()
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
function handleChange(selection) {
  // 更新 selectedRows
  selectedRows.value = selection
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

// 一开始进入界面的大刷
function refresh() {
  addAble = true
  currentSize.value = useUserStore().pageSize
  // 获取所有视图
  ImmediateInventory.getViews(tableId.value).then((res) => {
    currentViewId.value = ImmediateInventory.immediateInventory.defaultViewId
    currentViewName.value =
      ImmediateInventory.immediateInventory.defaultViewName
    // 获取所有的列
    ImmediateInventory.getCols(tableId.value).then((res) => {
      // 获取到列名和视图列后再赋值给column和viewColumn
      column = ImmediateInventory.immediateInventory.column
      viewColumn = ImmediateInventory.immediateInventory.viewColumn
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
.dialog-footer {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 1.25rem;
}
.confirm {
  margin-left: 1.25rem;
}
.normal {
  padding: 0.5rem 0.9375rem;
  border: 0.125rem solid rgb(220, 223, 230);
  background-color: #fff;
  margin-left: 0.625rem;
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

.outContainer {
  overflow-y: scroll;
  /* overflow: auto; */
  line-height: 23px;
  width: auto;
  position: relative;
}

.list {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>