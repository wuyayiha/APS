<template>
  <keep-alive>
    <div
      class="card"
      v-loading="Scheduling.loading"
      element-loading-text="正在运行中，可能需要十五秒左右，请耐心等待···"
    >
      <el-card class="one update" :style="cardStyle1">
        <template #header>
          <div class="card-header">
            <span>第一步（数据更新）</span>
            <el-button class="button" @click="toggleCollapse">
              <el-icon><Remove /></el-icon>
            </el-button>
          </div>
        </template>
        <transition name="fade" class="body">
          <div v-if="!isCollapsed">
            <el-collapse>
              <el-collapse-item title="ERP" name="1">
                <el-checkbox
                  :indeterminate="indeterminateERP"
                  v-model="isAllERP"
                  @change="handleCheckAllERP"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="checkedERP"
                  @change="handleCheckedERP"
                  class="group"
                >
                  <el-checkbox label="1">即时库存</el-checkbox>
                  <el-checkbox label="2">用料清单</el-checkbox>
                  <el-checkbox label="4">委外/生产订单列表</el-checkbox>
                  <el-checkbox label="6">采购列表</el-checkbox>
                  <el-checkbox label="8">收料通知单列表</el-checkbox>
                  <el-checkbox label="9">锁库存列表</el-checkbox>
                  <el-checkbox label="10">物料清单列表</el-checkbox>
                  <el-checkbox label="11">出库申请单</el-checkbox>
                  <!-- 其他复选框 -->
                </el-checkbox-group>
              </el-collapse-item>
              <el-collapse-item title="MES" name="2">
                <el-checkbox
                  :indeterminate="indeterminateMES"
                  v-model="isAllMES"
                  @change="handleCheckAllMES"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="checkedMES"
                  @change="handleCheckedMES"
                  class="group"
                >
                  <el-checkbox label="33">MES 未完工</el-checkbox>
                  <!-- 其他复选框 -->
                </el-checkbox-group>
              </el-collapse-item>
            </el-collapse>
            <button class="check updateBtn" @click="handleUpdate">
              数据更新
            </button>
          </div>
        </transition>
      </el-card>
      <el-card class="one" :style="cardStyle2" style="width: 18vw">
        <template #header>
          <div class="card-header">
            <span>第二步（完整性检查）</span>
            <el-button class="button" @click="toggleCollapse">
              <el-icon><Remove /></el-icon>
            </el-button>
          </div>
        </template>
        <transition name="fade" class="body">
          <div v-if="!isCollapsed">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              class="group"
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                city
              }}</el-checkbox>
            </el-checkbox-group>
            <button class="check" @click="handleCheck">开始检查</button>
          </div>
        </transition>
      </el-card>
      <el-card class="two" :style="cardStyle3">
        <template #header>
          <div class="card-header">
            <span>第三步（排程选项）</span>
            <el-button class="button" @click="toggleCollapse">
              <el-icon><Remove /></el-icon>
            </el-button>
          </div>
        </template>
        <transition name="fade" class="body">
          <div v-if="!isCollapsed">
            <el-form :model="form" class="form">
              <el-form-item class="model_check">
                <h3>模型选择</h3>
                <div class="model">
                  <el-checkbox-group v-model="checkedLabels">
                    <el-checkbox label="考虑物料" checked />
                    <el-checkbox label="考虑工序" />
                    <el-checkbox label="并行生产" checked />
                    <el-checkbox label="考虑未完成" checked />
                    <el-checkbox label="是否提前PO" />
                    <el-checkbox label="是否提前PR" />
                  </el-checkbox-group>
                  <div class="delay"></div>
                </div>
              </el-form-item>
              <el-form-item class="target">
                <h3>目标函数</h3>
                <el-radio-group v-model="form.target" class="mini_target">
                  <el-radio label="1" size="large">人员利用率最大</el-radio>
                  <el-radio label="2" size="large">成本最低</el-radio>
                  <el-radio label="3" size="large">交付率最高</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item class="lock">
                <h3>其他参数</h3>
                <div class="other">
                  <div class="mini_lock">
                    <div class="delay">
                      <span>需求计划延迟期</span>
                      <input type="number" v-model="form.delay_request" />
                      <span>寻优次数</span>
                      <input type="number" v-model="form.number_cycles" />
                      <span>生产计划周期</span>
                      <input type="number" v-model="form.scheduled_days_num" />
                    </div>
                  </div>
                  <div class="mini_product">
                    <div class="delay">
                      <span>采购计划延迟期</span>
                      <input type="number" v-model="form.buy_delay_days" />
                      <span>PO提前天数</span>
                      <input type="number" v-model="form.in_advance_po" />
                      <span>YG提前最大天数</span>
                      <input type="number" v-model="form.yg_delta" />
                    </div>
                  </div>
                </div>
              </el-form-item>
            </el-form>
            <div class="two_button">
              <button class="start" @click="startSchedule">开始排程</button>
              <button class="schedule" @click="handleOne">一键排程</button>
              <!-- <button class="update_data" @click="handleUpdate">数据更新</button> -->
            </div>
          </div>
        </transition>
      </el-card>
    </div>
  </keep-alive>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import UseScheduling from '@/store/modules/scheduling'

const Scheduling = UseScheduling()
const checkedLabels = ref([])
const form = ref({
  // model: [],
  target: '1',
  delay_request: 3,
  number_cycles: 2,
  scheduled_days_num: 240,
  in_advance_po: 7,
  buy_delay_days: 5,
  yg_delta: 90,
  consider_the_material: true,
  consider_the_process: false,
  produce_in_parallel: true,
  consider_history: true,
  advance_PO: false,
  advance_PR: false
})
watch(checkedLabels, (newLabels) => {
  form.value.produce_in_parallel = newLabels.includes('并行生产')
  form.value.consider_the_process = newLabels.includes('考虑工序')
  form.value.consider_the_material = newLabels.includes('考虑物料')
  form.value.consider_history = newLabels.includes('考虑未完成')
  form.value.advance_PO = newLabels.includes('是否提前PO')
  form.value.advance_PR = newLabels.includes('是否提前PR')
  // ... update other properties based on newLabels
})

const checkedERP = ref(['1', '2', '4', '6', '8', '9', '10', '11'])
const checkedMES = ref(['33'])
const isAllERP = ref(true)
const isAllMES = ref(true)
const indeterminateERP = computed(() => {
  return checkedERP.value.length > 0 && checkedERP.value.length < 8
})
const indeterminateMES = computed(() => {
  return checkedMES.value.length > 0 && checkedMES.value.length < 1
})
function handleCheckAllERP(val) {
  checkedERP.value = val ? ['1', '2', '4', '6', '8', '9', '10', '11'] : []
}
function handleCheckedERP(value) {
  isAllERP.value = value.length === 8
}

function handleCheckAllMES(val) {
  checkedMES.value = val ? ['33'] : []
}
function handleCheckedMES(value) {
  isAllMES.value = value.length === 1
}

const isCollapsed = ref(false)
const checkAll = ref(true)
const isIndeterminate = ref(false)
// const checkedCities = ref(['BOM', '工艺路径与标准工时', '人员','日历','库存主数据', 'MOQ','机器'])
const checkedCities = ref([
  'BOM',
  '工艺路径与标准工时',
  '人员',
  '日历',
  '库存主数据',
  'MOQ',
  '机器'
])
const cities = [
  'BOM',
  '工艺路径与标准工时',
  '人员',
  '日历',
  '库存主数据',
  'MOQ',
  '机器'
]

const updateData = ['ERP', 'MES']
const checkedData = ref(['ERP', 'MES'])
const checkAllData = ref(true)
const isIndeterminateData = ref(false)

function handleCheckAllChange(val) {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
function handleCheckAllDataChange(val) {
  checkedData.value = val ? updateData : []
  isIndeterminateData.value = false
}
function handleCheckedCitiesChange(value) {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}
function handleCheckedDataChange(value) {
  const checkedCount = value.length
  checkAllData.value = checkedCount === updateData.length
  isIndeterminateData.value =
    checkedCount > 0 && checkedCount < updateData.length
}

function handleUpdate() {
  // console.log(checkedData.value)
  const data = checkedERP.value.concat(checkedMES.value)

  console.log(data)
  Scheduling.loading = true
  Scheduling.updateData(data)
    .then((res) => {
      // Scheduling.loading=false

      ElMessageBox.alert(res.message, '提示', {
        confirmButtonText: '好的'
      })

      console.log('数据更新请求成功！')
    })
    .catch((error) => {
      console.log(error, '数据更新请求出错了')
      ElMessageBox.alert('未知错误，请联系管理员', '提示', {
        confirmButtonText: '好的'
      })
    })
}

function handleCheck() {
  const data = []
  if (checkedCities.value.includes('BOM')) {
    data.push(1)
  }
  if (checkedCities.value.includes('工艺路径与标准工时')) {
    data.push(2)
  }
  if (checkedCities.value.includes('人员')) {
    data.push(3)
  }
  if (checkedCities.value.includes('日历')) {
    data.push(4)
  }
  if (checkedCities.value.includes('库存主数据')) {
    data.push(5)
  }
  if (checkedCities.value.includes('MOQ')) {
    data.push(6)
  }
  if (checkedCities.value.includes('机器')) {
    data.push(7)
  }
  Scheduling.loading = true
  // console.log(Scheduling.loading)

  Scheduling.integrityChecker()
    .then((res) => {
      if (res.code == 200) {
        Scheduling.loading = false
        ElMessageBox.alert('数据均完整', '提示', {
          type: 'success',
          confirmButtonText: '好的'
        })
        // console.log(res.code,'integrityChecker')
      } else if (res.code == 202) {
        Scheduling.loading = false
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '下载错误信息',
          callback: (action) => {
            if (action == 'confirm') {
              Scheduling.downloadIntegrityChecker()
                .then((res) => {
                  console.log('下载不完整数据成功')
                })
                .catch((error) => {})
            }
          }
        })
      }
      //
      else if (res.code == 201) {
        Scheduling.loading = false
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '好的'
        })
      }
    })
    .catch((error) => {
      ElMessageBox.alert('未知错误，请联系管理员', '提示', {
        confirmButtonText: '好的'
      })
      Scheduling.loading = false
    })
}

function startSchedule() {
  // console.log(form.value, '@@@')
  Scheduling.startScheduling(form.value)
    .then((res) => {
      if (res.code == 200) {
        ElMessageBox.alert('开始排程', '提示', {
          confirmButtonText: '确定'
        })
      } else {
        ElMessageBox.alert(res.message, '提示', {
          confirmButtonText: '确定'
        })
      }
    })
    .catch((error) => {})
}

function handleOne() {
  Scheduling.loading = true
  Scheduling.oneKeyScheduling(form.value)
    .then((res) => {
      Scheduling.loading = false
      ElMessageBox.alert(res.message, '提示', {
        confirmButtonText: '确定'
      })
    })
    .catch((error) => {
      ElMessageBox.alert('未知错误，请联系管理员', '提示', {
        confirmButtonText: '好的'
      })
      Scheduling.loading = false
    })
}

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

const cardStyle1 = computed(() => {
  return {
    height: isCollapsed.value ? '68.8px' : '490px' // 调整卡片的高度
  }
})
const cardStyle2 = computed(() => {
  return {
    height: isCollapsed.value ? '68.8px' : '490px' // 调整卡片的高度
  }
})
const cardStyle3 = computed(() => {
  return {
    height: isCollapsed.value ? '68.8px' : '490px' // 调整卡片的高度
  }
})
</script>

<style lang="less">
.el-form-item__content {
  flex-direction: column;
}
.el-form-item {
  margin-bottom: 0;
}
.el-checkbox__inner,
.el-radio__inner {
  border: 1px solid #0053b5;
}
.mini_product > .el-checkbox {
  margin: 0;
}
.el-collapse {
  --el-collapse-content-bg-color: #f1f4f6 !important;
  --el-collapse-header-bg-color: #f1f4f6 !important;
}
.el-collapse-item__content {
  padding: 0;
}
</style>

<style scoped>
.el-card {
  --el-card-padding: 0;
}

.card {
  display: flex;
}
.update {
  margin-right: 0;
}
.updateData {
  display: flex;
  flex-direction: row;
  height: 300px;
  overflow: auto;
}
.el-collapse {
  height: 312.4px;
  overflow: auto;
}
p {
  margin: 0;
}
.one {
  margin: 24px 32px;
  /* width: 250px; */
  /* width: 30%; */
  width: 20vw;
  overflow: hidden;
  /* height: 430px; */
  overflow: hidden; /* 为了实现收起效果，隐藏溢出内容 */
  transition: height 0.5s; /* 添加过渡动画 */
  background-color: #f1f4f6;
}
.update {
  margin-right: 0;
}
.two {
  margin: 24px 0;
  margin-right: 30px;
  /* width: 700px; */
  width: 45vw;
  /* height: 460px; */
  background-color: #f1f4f6;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1d89e9;
  height: 68.8px;
}
span {
  padding: 18px 20px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.el-button {
  padding: 0;
  height: 20px;
  box-sizing: border-box;
  background-color: #1d89e9;
  border: none;
}
.el-icon {
  font-size: 20px;
  color: white;
}
.button {
  cursor: pointer;
  margin-right: 20px;
}
.group {
  display: flex;
  flex-direction: column; /* 垂直排列多选框 */
  height: 292px;
}
.body {
  padding: 24px;
}
.check {
  width: 162px;
  height: 42px;
  background-color: #0053b5;
  color: #fff;
  /* margin: 15px auto; */
  margin: 0 auto;
  display: block;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}
.updateBtn {
  margin: 0 auto;
  margin-top: 20px;
  /* margin-bottom: 15px; */
}
.form {
  display: flex;
  flex-direction: row;
}
.model_check {
  width: 140px;
  height: 272px;
  display: flex;
  flex-direction: column;
}

h3 {
  margin: 0;
  color: #0053b5;
  font-weight: 600;
  font-size: 16px;
}
.target {
  width: 200px;
  height: 230px;
  /* background-color: #fff; */
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.model,
.mini_lock,
.mini_product {
  background-color: #fff;
  height: 200px;
}
.lock,
.product_line {
  margin-left: 20px;
}
.other {
  width: 15vw;
  background-color: #fff;
  display: flex;
  flex-direction: row;
}

.el-checkbox-group {
  /* text-align: center; */
  padding-top: 10px;
}

.delay > span {
  color: #000;
  font-weight: 400;
  font-size: 13px;
  padding: 0;
}
.delay > input {
  width: 75%;
  /* padding: 0 auto; */
  margin: 0 auto;
  border: 1px solid #0053b5;
  height: 24px;
}
.delay {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 7px;
}
.model_check .el-checkbox {
  /* margin: 0; */
  margin-left: 25px;
}
.mini_product .el-checkbox {
  /* margin-left: 0; */
  margin-right: 0;
}
.mini_product > .el-checkbox-group {
  text-align: left;
  margin-left: 25px;
}
.el-radio {
  margin: 0;
}
.target .el-radio-group {
  width: 170px;
  align-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 10px;
}
.el-radio-group {
  /* width: 140px; */
  align-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 10px;
  text-align: center;
}
.mini_target {
  padding-left: 30px;
  background-color: #fff;
  height: 200px;
  box-sizing: border-box;
}
.two_button {
  display: flex;
  justify-content: space-between;
  margin-top: 58px;
  /* flex-direction: row-reverse; */
  /* flex-direction: column-reverse; */
  /* margin-left: 480px; */
}

.start,
.schedule {
  width: 162px;
  height: 42px;
  background-color: #0053b5;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  /* margin-top: 10px; */
}
.schedule {
  /* margin-top: 20px; */
  background-color: #c4a01d;
}
.update_data {
  margin-right: 40px;
}
</style>
