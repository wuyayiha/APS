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
      >
        <el-option
          v-for="item in process.productFamily"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
      <span>人数：</span>
      <input
        id="selectNumber"
        type="number"
        v-model="process.createBasePlan.number"
        @keyup.enter="handleSelect"
        :disabled="process.createBasePlan.Edited"
      />
      <button @click="grouping" class="group fengzu">
        <span>分组</span>
      </button>
      <el-dialog
        class="employee"
        v-model="dialogVisible"
        title="请选择你的员工"
        width="30%"
        :before-close="handleClose"
      >
        <el-radio-group v-model="employee">
          <el-radio v-for="n in employeeNumbers" :key="n" :label="n"
            >员工{{ n }}</el-radio
          >
        </el-radio-group>
        <!-- <span>员工1</span> -->
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEmployee">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <button @click="savePlan" class="group save">
        <span>保存</span>
      </button>
    </div>
    <div class="main">
      <el-table
        :data="process.createBasePlan.data"
        :cell-class-name="getRowClassName"
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
        <el-table-column prop="employeeName" label="员工姓名" width="120">
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

const formatNumber = (value) => {
    if (value) {
      // 创建一个新的Intl.NumberFormat实例
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,  // 数字最少位数
      });
      // 返回格式化的数字
      return formatter.format(value);
    }
};
function handleSelect() {
  process
    .getProcessCapacityByProductFamily(process.createBasePlan.productFamily)
    .then((res) => {
      const selectNumber = document.getElementById('selectNumber')
      const selectProductFamily = document.getElementById('selectProductFamily')
      process.createBasePlan.Edited = true
      // 为这些元素添加 disabled 属性
      selectNumber.disabled = true
      selectProductFamily.disabled = true
    })
    .catch((error) => {})
  // console.log(process.createBasePlan.number,process.createBasePlan.productFamily,'开始渲染表格')
}
const dialogVisible = ref(false)
const employee = ref()

function handleProductFamily() {
  process
    .getAllProductFamily()
    .then((res) => {
      console.log('点开了产品族的下拉框')
    })
    .catch((error) => {})
}

function getRowClassName({ row, column, rowIndex, columnIndex }) {
  // console.log(row, 'row');
  if (column.property === 'employeeName') { 
    if (row.employeeName === '员工1') {
      return 'name1';
    } else if (row.employeeName === '员工2') {
      return 'name2';
    }
    else if (row.employeeName === '员工3') {
      return 'name3';
    }
    else if (row.employeeName === '员工4') {
      return 'name4';
    }
    else if (row.employeeName === '员工5') {
      return 'name5';
    }
    else if (row.employeeName === '员工6') {
      return 'name6';
    }
    else if (row.employeeName === '员工7') {
      return 'name7';
    }
    else if (row.employeeName === '员工8') {
      return 'name8';
    }
    else if (row.employeeName === '员工9') {
      return 'name9';
    }
    else if (row.employeeName === '员工10') {
      return 'name10';
    }
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
const selectedRows = ref([]) // 存储选中的行数据

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

function grouping() {
  if (process.createBasePlan.Edited == true) {
    console.log(process.createBasePlan.Edited)
    dialogVisible.value = true
  } else {
    ElMessageBox.alert('请按下回车确认人数', '提示', {
      type: 'info',
      confirmButtonText: '好的'
    })
  }
}
function savePlan() {
  process
    .saveProcessScheme({
      data: process.createBasePlan.data,
      number: process.createBasePlan.number
    })
    .then((res) => {
      if (res.code == 200) {
        ElMessageBox.alert('保存成功了', '保存成功', {
          type: 'success',
          confirmButtonText: '好的',
          callback: (action) => {
            // 跳转后要把顶部标签页给关了
            // router.push({ path: '/basePlan' })
            router.back()
            let item = userMenu.tabsList.find(
              (tab) => tab.name === 'createBasePlan'
            )
            userMenu.closeTab(item)
          }
        })
        process.createBasePlan.Edited = false
        process.createBasePlan.productFamily = ''
        process.createBasePlan.number = ''
        process.createBasePlan.data = []
      }
      if (res.code == 201) {
        ElMessageBox.alert(res.message, '无法保存', {
          type: 'error',
          confirmButtonText: '好的'
        })
      }
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
</style>
