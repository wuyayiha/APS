<template>
  <!-- <common-plan class="plan"/> -->
  <div class="container">
    <div class="head">
      <span>产品族:</span
      ><el-select
        class="product"
        id="selectProductFamily"
        v-model="process.createBasePlan.productFamily"
        placeholder="Select"
        @click="handleProductFamily"
        @change="selectPF"
      >
        <el-option
          v-for="item in process.productFamily"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>

      <button @click="moveUp" class="group save first">
        <span>上移</span>
      </button>
      <button @click="moveDown" class="group save">
        <span>下移</span>
      </button>
      <button @click="savePlan" class="group save">
        <span>保存</span>
      </button>
    </div>
    <div class="main">
      <el-table
        :data="process.moveData"
        border
        :row-class-name="tableRowClassName"
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
        ref="myTable"
      >
        <el-table-column
          type="selection"
          :reserve-selection="true"
          label=""
          width="35"
          class="one"
        />
        <el-table-column prop="belongingProcess" label="所属工序" width="120">
        </el-table-column>
        <el-table-column prop="productFamily" label="产品族" width="130">
        </el-table-column>
        <el-table-column
          prop="processNumber"
          label="工序ID"
          width="110"
        ></el-table-column>
        <el-table-column prop="processName" label="工序名称"> </el-table-column>
        <el-table-column prop="packagingMethod" label="包装方式" width="120">
        </el-table-column>
        <el-table-column prop="standardTime" label="标准工时" width="120">
          <template v-slot:default="scope">
            {{ formatNumber(scope.row.standardTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="maxPersonnel" label="人员Max" width="120">
        </el-table-column>
        <el-table-column prop="minPersonnel" label="人员Min" width="120">
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="bottom">
        <div class="example-pagination-block">
          <el-pagination layout="prev, pager, next" :total=process.totalPages*10 @current-change="handlePages"/>
        </div>
      </div> -->
  </div>
</template>

<script setup>
import { ref, watch, onBeforeMount, computed } from 'vue'
import CommonPlan from '../../../components/CommonPlan.vue'
import processManage from '../../../store/modules/metaData/processManage'
import useUserMenu from '../../../store/modules/menu'
import { useRoute, useRouter } from 'vue-router'

const userMenu = useUserMenu()
const process = processManage()
const route = useRoute() //用于获取和访问当前路由的信息
const router = useRouter()
const dialogVisible = ref(false)
const employee = ref()
const selectedRows = ref([]) // 存储选中的行数据

// 修改表格选中行的样式
// 这个方法返回一个类名，基于行是否被选中
function tableRowClassName({ row }) {
  // 检查当前行是否在selectedRows中
  const isRowSelected = selectedRows.value.some(
    (selectedRow) => selectedRow.id === row.id
  )
  return isRowSelected ? 'row-highlight' : ''
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
function handleProductFamily() {
  process
    .getAllProductFamily()
    .then((res) => {
      console.log('点开了产品族的下拉框')
    })
    .catch((error) => {})
}
function selectPF(value) {
  // console.log(value)
  process
    .getProcessCapacityByProductFamily(value)
    .then((res) => {})
    .catch((error) => {})
}

function moveUp() {
  const selected = selectedRows.value // Assuming you have stored the selected rows in this.selectedRows
  if (selected.length !== 1) {
    ElMessageBox.alert('请选中一行移动', '提示', {
      confirmButtonText: '好的'
    })
    return
  }
  const index = process.moveData.indexOf(selected[0])
  if (index > 0) {
    const temp = process.moveData[index - 1]
    process.moveData[index - 1] = process.moveData[index]
    process.moveData[index] = temp
  }
}
function moveDown() {
  const selected = selectedRows.value // Assuming you have stored the selected rows in this.selectedRows
  if (selected.length !== 1) {
    ElMessageBox.alert('请选中一行移动', '提示', {
      confirmButtonText: '好的'
    })
    return
  }
  const index = process.moveData.indexOf(selected[0])
  if (index < process.moveData.length - 1) {
    const temp = process.moveData[index + 1]
    process.moveData[index + 1] = process.moveData[index]
    process.moveData[index] = temp
  }
}

let addAble = true //限制每次只能新增一行

const newRow = {
  belongingProcess: '',
  productFamily: '',
  processNumber: '',
  processName: '',
  packagingMethod: '',
  standardTime: '',
  maxPersonnel: 1,
  minPersonnel: 1,
  employeeName: '',
  editable: true
}

const employeeNumbers = computed(() => {
  // 生成一个从1到process.createBasePlan.number的数组
  return Array.from({ length: process.createBasePlan.number }, (_, i) => i + 1)
})

const myTable = ref(null)

function confirmEmployee() {
  // console.log(employee.value, '@@')
  const name = '员工' + employee.value
  selectedRows.value.forEach((row) => {
    row.employeeName = name
  })
  myTable.value.clearSelection()
  dialogVisible.value = false
}

const handleClose = () => {
  dialogVisible.value = false
}

function savePlan() {
  process
    .updateProcessNumber(process.moveData)
    .then((res) => {
      process.createBasePlan.productFamily = ''
      process.moveData = []
      // process.moveData.splice(0, process.moveData.length);
      router.back()
      let item = userMenu.tabsList.find((tab) => tab.name === 'moveData')
      userMenu.closeTab(item)
    })
    .catch((error) => {})
  console.log(process.createBasePlan.data)
}

function handleChange(selection) {
  // 更新 selectedRows
  selectedRows.value = selection
}
</script>

<style>
.el-table .el-table__cell {
  padding: 0;
  /* padding: 8px 0; */
}
.head > .product {
  width: 120px;
}
.employee .el-dialog__body {
  padding: 0;
  text-align: center;
}
</style>

<style scoped>
.container {
  display: flex;
  /* height: 555px; */
  margin: 24px 32px;
  flex-direction: column;
  /* background-color: red; */
}
input {
  width: 100px;
}
.plan {
  flex-direction: row-reverse;
}
.head {
  height: 60px;
  width: 100%;
  background-color: #f1f4f6;
  line-height: 60px;
}
.head > span {
  margin-left: 20px;
  margin-right: 10px;
}
button > span {
  margin-left: 60px;
  margin-right: 20px;
  font-size: 15px;
  cursor: pointer;
}
.fengzu {
  margin-left: 50px;
}
.first {
  margin-left: 30px;
}

.fengzu,
.save {
  border: none;
  background-color: #f1f4f6;
  padding: 0;
  line-height: 60px;
  padding: 0 30px;
}
.fengzu:hover,
.save:hover {
  background-color: #0053b5;
  cursor: pointer;
  color: #fff;
}
.el-dialog > button {
  background-color: #0053b5;
}
.group > span {
  margin-left: 0;
  margin-right: 0;
}
.group {
  /* margin-left: 50px; */
  border: none;
  background-color: #f1f4f6;
  padding: 0 30px;
}
.main {
  /* background-color: blue; */
  /* width: 100%; */
  flex: 1;
  margin-top: 20px;
}
.el-table {
  border: 1px solid #9db9d6;
  /* background-color: red; */
}

.example-pagination-block {
  /* margin-bottom: 16px; */
  margin-top: 10px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
