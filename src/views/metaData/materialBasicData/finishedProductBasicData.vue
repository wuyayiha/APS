<template>
  <div class="container">
    <div class="head">
      <button @click="addRow"><span class="first">新增</span></button>
      <button @click="modifyRow"><span>修改</span></button>
      <button @click="deleteSelectedRows"><span>删除</span></button>
      <button @click="fresh"><span>刷新</span></button>
      <button @click="dialogVisible = true"><span>导入</span></button>
      <button @click="downloadData"><span>导出</span></button>
      <button @click="downloadDataInventory"><span>导出成品库存</span></button>
    </div>
    <div class="main" ref="tableContainer">
      <div class="common" ref="commonPlan">
        <common-plan
          class="plan"
          :columnNames="finishedProduct.finishedProduct.column"
          :viewColumn="finishedProduct.finishedProduct.viewColumn"
          :currentViewId="currentViewId"
          :currentViewName="currentViewName"
          :apiUrl="'/masterData/searchLike'"
          :currentTableId="65"
          :currentOrder="currentOrder"
          @lookView="lookView"
          @searchView="searchView"
          @getCurrentOption="getCurrentOption"
        />
      </div>
      <el-table
        ref="myTable"
        :data="finishedProduct.finishedProduct.data"
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
          prop="materialCode"
          label="物料编码"
          min-width="160"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.materialCode"
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
                v-model="row.materialCode"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.materialCode }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="materialName"
          label="物料名称"
          min-width="290"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
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
          prop="materialProperty"
          label="物料属性"
          min-width="90"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.materialProperty"
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
                v-model="row.materialProperty"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.materialProperty }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="materialGroup"
          label="物料分组"
          min-width="110"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.materialGroup"
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
                v-model="row.materialGroup"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.materialGroup }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="productType"
          label="产品类型"
          min-width="110"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.productType"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.productType" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ row.productType }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="productFamily"
          label="产品族"
          min-width="110"
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
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input
                v-model="row.productFamily"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.productFamily }}
            </template>
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
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-select
                v-model="row.packagingMethod"
                class="m-2"
                placeholder="Select"
                @click="handlePackage"
              >
                <el-option
                  v-for="item in process.packages"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </template>
            <template v-else>
              {{ row.packagingMethod }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="maxAssemblyPersonnel"
          label="组装人数MAX"
          min-width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.maxAssemblyPersonnel"
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
                v-model="row.maxAssemblyPersonnel"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.maxAssemblyPersonnel }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="minAssemblyPersonnel"
          label="组装人数MIN"
          min-width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.minAssemblyPersonnel"
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
                v-model="row.minAssemblyPersonnel"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.minAssemblyPersonnel }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="maxTestingPersonnel"
          label="测试人数MAX"
          min-width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.maxTestingPersonnel"
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
                v-model="row.maxTestingPersonnel"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.maxTestingPersonnel }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="minTestingPersonnel"
          label="测试人数MIN"
          min-width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.minTestingPersonnel"
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
                v-model="row.minTestingPersonnel"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.minTestingPersonnel }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="maxPackagingPersonnel"
          label="包装人数MAX"
          min-width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.maxPackagingPersonnel"
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
                v-model="row.maxPackagingPersonnel"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.maxPackagingPersonnel }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="minPackagingPersonnel"
          label="包装人数MIN"
          min-width="120"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.minPackagingPersonnel"
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
                v-model="row.minPackagingPersonnel"
                @keyup.enter="saveRow(row)"
              />
            </template>
            <template v-else>
              {{ row.minPackagingPersonnel }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="moq"
          label="MOQ"
          min-width="100"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.moq"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.moq" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ row.moq }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="mpq"
          label="MPQ"
          min-width="100"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.mpq"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.mpq" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ row.mpq }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          prop="safetyStock"
          label="安全库存"
          min-width="100"
          sortable="custom"
          :sort-orders="['ascending', 'descending']"
          v-if="plan.safetyStock"
        >
          <template v-slot:header="{ column }">
            <div>
              {{ column.label }}
              <span v-html="renderSortIcon(column)"></span>
            </div>
          </template>
          <template #default="{ row }">
            <template v-if="row.editable">
              <el-input v-model="row.safetyStock" @keyup.enter="saveRow(row)" />
            </template>
            <template v-else>
              {{ row.safetyStock }}
            </template>
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
          :total="finishedProduct.finishedProduct.pages"
          @change-page="handlePages"
          @update-size="handleSizeChange"
          :totalRows="finishedProduct.finishedProduct.total"
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
  onUnmounted,
  onMounted,
  reactive,
  computed,
  onBeforeUnmount
} from 'vue'
import { renderSortIcon } from '@/utils/sortIcon'
import CommonPlan from '@/components/CommonPlan.vue'
import Pagination from '@/components/Pagination.vue'
import useUserStore from '@/store/modules/user'
import processManage from '@/store/modules/metaData/processManage'
import useFinishedProduct from '@/store/modules/metaData/materialBasicData/finishedProduct'
import useUserMenu from '@/store/modules/menu'
const userMenu = useUserMenu()
const finishedProduct = useFinishedProduct()
const process = processManage()

let currentPage = ref(1)
let currentSize = ref(100)
let currentViewId = ref(null) //当前视图id
let currentViewName = ref('') //当前视图名字
const plan = ref({}) //当前方案各个列的true和false
const tableContainer = ref(null) //点击其他视图或者点击下一页时自动滑动到顶部
const commonPlan = ref(null)
const commonPlanHeight = ref(0)
const tableId = ref(65)
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
  finishedProduct
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
  currentPage.value = 1

  finishedProduct
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
      viewColumn = finishedProduct.finishedProduct.viewColumn
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
  finishedProduct
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
      finishedProduct
        .downloadMetaData({
          type: 3,
          page: currentPage.value,
          size: currentSize.value,
          ...param
        })
        .then((res) => {
            ElMessage({
              type: 'success',
              message: '导出当前页成功'
            })
          // console.log(res,'res')
        })
    })
    .catch((action) => {
      if (action === 'cancel') {
        finishedProduct
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

function downloadDataInventory() {
  finishedProduct.downloadInventoryFile({

  }).then(res => {
    
  }).catch(error => {
    console.log(error, 'error')
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
  finishedProduct.imporFinishedProduct(uploadData).then((res) => {
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
    refresh()
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
  finishedProduct.finishedProductTemplate().then((res) => {
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
  finishedProduct
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

let addAble = true //限制每次只能新增一行

const newRow = {
  materialCode: '',
  materialName: '',
  materialProperty: '',
  materialGroup: '',
  productType: '',
  productFamily: '',
  packagingMethod: '',
  maxAssemblyPersonnel: '',
  minAssemblyPersonnel: '',
  maxTestingPersonnel: '',
  minTestingPersonnel: '',
  maxPackagingPersonnel: '',
  minPackagingPersonnel: '',
  moq: '',
  mpq: '',
  safetyStock: '',
  editable: true
}
const selectedRows = ref([]) // 存储选中的行数据

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
  finishedProduct.resetState()
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
function handlePackage() {
  process
    .getAllPackagingMethod()
    .then((res) => {
      console.log('点开了包装方式的下拉框')
    })
    .catch((error) => {})
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
    finishedProduct.finishedProduct.data.unshift({ ...newRow })
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
    finishedProduct
      .addOrUpdateFinishedProduct({
        id: row.id,
        materialCode: row.materialCode,
        materialProperty: row.materialProperty,
        materialGroup: row.materialGroup,
        productType: row.productType,
        productFamily: row.productFamily,
        packagingMethod: row.packagingMethod,
        maxAssemblyPersonnel: row.maxAssemblyPersonnel,
        minAssemblyPersonnel: row.minAssemblyPersonnel,
        maxTestingPersonnel: row.maxTestingPersonnel,
        minTestingPersonnel: row.minTestingPersonnel,
        maxPackagingPersonnel: row.maxPackagingPersonnel,
        minPackagingPersonnel: row.minPackagingPersonnel,
        moq: row.moq,
        mpq: row.mpq,
        safetyStock: row.safetyStock
      })
      .then((res) => {
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
      })
    // console.log('修改工序名')
    row.editable = false
  }
  // 新增数据
  else {
    // console.log(addAble,'@@@')
    finishedProduct
      .addOrUpdateFinishedProduct({
        materialCode: row.materialCode,
        materialProperty: row.materialProperty,
        materialGroup: row.materialGroup,
        productType: row.productType,
        productFamily: row.productFamily,
        packagingMethod: row.packagingMethod,
        maxAssemblyPersonnel: row.maxAssemblyPersonnel,
        minAssemblyPersonnel: row.minAssemblyPersonnel,
        maxTestingPersonnel: row.maxTestingPersonnel,
        minTestingPersonnel: row.minTestingPersonnel,
        maxPackagingPersonnel: row.maxPackagingPersonnel,
        minPackagingPersonnel: row.minPackagingPersonnel,
        moq: row.moq,
        mpq: row.mpq,
        safetyStock: row.safetyStock
      })
      .then((res) => {
        addAble = true
        if (res.code == 200) {
          ElMessage({
              type: 'success',
              message: '添加成功'
            })
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

  finishedProduct
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
        finishedProduct
          .removeFinishedProduct(list)
          .then((res) => {
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

function refresh() {
  currentSize.value = useUserStore().pageSize
  // 获取所有视图
  finishedProduct.getViews(tableId.value).then((res) => {
    currentViewId.value = finishedProduct.finishedProduct.defaultViewId
    currentViewName.value = finishedProduct.finishedProduct.defaultViewName
    // 获取所有的列
    finishedProduct.getCols(tableId.value).then((res) => {
      // 获取到列名和视图列后再赋值给column和viewColumn
      column = finishedProduct.finishedProduct.column
      viewColumn = finishedProduct.finishedProduct.viewColumn
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
      finishedProduct
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
  finishedProduct
    .getMetaData(param, currentPage.value, currentSize.value)
    .then((res) => {
      if (res.code == 201) {
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '好的'
        })
      }
      myTable.value.clearSelection()
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
