<template>
  <div class="container">
      <div class="head">
        <button @click="addRow"><span class="first">新增</span></button>
        <button @click="modifyRow"><span>修改</span></button>
        <button @click="deleteSelectedRows"><span>删除</span></button>
        <button @click="refresh"><span>刷新</span></button>
        <button><span>导入</span></button>
        <button><span>导出</span></button>
      </div>
      <div class="main">
        <el-table :data="RolesManage.roles" border 
        class="exporttable" 
        :cell-style="{borderColor:'#9db9d6',textAlign:'center'}" 
        :header-cell-style="{borderColor:'#9db9d6',background:'#d9e9f8',color:'#000',textAlign:'center',fontWeight:'500'}"
        row-key="id"
        @selection-change="handleChange"
        @row-dblclick="changeRow"
        >
          <el-table-column type="selection" :reserve-selection="true" label="" width="35" class="one"/>
          <el-table-column prop="id" label="序号" width="127" />
          <el-table-column prop="roleName" label="角色名称" width="150">
            <template #default="{ row }">
              <template v-if="row.editable">
                <el-input v-model="row.roleName" @keyup.enter="saveRow(row)" />
              </template>
              <template v-else>
                {{ row.roleName }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="roleCode" label="角色码" width="150">
            <template #default="{ row }">
              <template v-if="row.editable">
                <el-input v-model="row.roleCode" @keyup.enter="saveRow(row)" />
              </template>
              <template v-else>
                {{ row.roleCode }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述" width="150">
            <template #default="{ row }">
              <template v-if="row.editable">
                <el-input v-model="row.description" @keyup.enter="saveRow(row)" />
              </template>
              <template v-else>
                {{ row.description }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="dataScope" label="数据范围" width="150">
            <template #default="{ row }">
              <template v-if="row.editable">
                <el-input v-model="row.dataScope" @keyup.enter="saveRow(row)" />
              </template>
              <template v-else>
                {{ row.dataScope }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="250"/>
          <el-table-column prop="updateTime" label="更新时间" width="250"/>
        </el-table>
      </div>
  </div>  
</template>


<script setup>
import { ref, watch } from 'vue'
// 引入生命周期函数时，在之前基础上加上on
import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import useRolesManage from '@/store/modules/permission/rolesManage'
import { useRoute, useRouter } from 'vue-router';

const RolesManage = useRolesManage()
const route = useRoute();     //用于获取和访问当前路由的信息
const router = useRouter();   //用于执行路由导航的操作

const newRow = {
  id: '',
  roleName: '',
  roleCode: '',
  description:'',
  dataScope:'',
  createTime: '',
  updateTime: '',
  editable: true // 新增的行默认为可编辑状态
}
const selectedRows = ref([]); // 存储选中的行数据

// 监控路由，切换页面时自动刷新表格数据
watch(() => route.path, () => {
  refresh()
})

onBeforeMount(() => {
  refresh()
})

function changeRow(row) {
  row.editable=true
}
function modifyRow() {
  // selectedRows.value[0].editable = true
  selectedRows.value.forEach(row => {
        row.editable=true
    });
}


function addRow() {
  RolesManage.roles.push({ ...newRow })
}

function saveRow(row) {
  // 这里可以添加保存数据的逻辑，例如将数据发送到后端
  // 修改数据
  // console.log(row.id,RolesManage.roles.length,'@@')
  if (row.id <= RolesManage.roles.length && row.id) {
    // console.log('修改数据',row.roleName,row.roleCode,row.description,row.dataScope)
    RolesManage.updateRole(row.roleName, row.roleCode, row.description, row.dataScope)
      .then((res) => {
        console.log('角色修改成功')
    }).catch((error) => {
        console.log(error)
        console.log('vue角色修改失败')
      })
    row.editable=false
  }
  // 新增数据
  else {
      RolesManage.addRole(row.roleName, row.roleCode, row.description, row.dataScope)
      .then((res) => {
        console.log('角色添加成功')

        // 找到临时行的索引
        const tempRowIndex = RolesManage.roles.findIndex(r => r === row);
        console.log(tempRowIndex,'1')

        if (tempRowIndex !== -1) {
          // 替换临时行为后端返回的数据
          RolesManage.roles.splice(tempRowIndex, 1, res);
        }

        // 删除临时行
        RolesManage.roles.splice(tempRowIndex, 1);

      }).catch((error) => {
        console.log(error)
        console.log('vue角色添加失败')
      })

    // 获取当前时间并分配给创建时间字段
    row.createTime = new Date().toLocaleString(); // 使用当前日期时间格式化字符串
    row.updateTime = new Date().toLocaleString(); // 使用当前日期时间格式化字符串
    // 序号自动加1
    row.id = RolesManage.roles.length;
    // 保存成功后可以在这里更新状态或执行其他操作
    row.editable = false; // 保存后将行设置为不可编辑状态
  }
}
function deleteSelectedRows() {
  // 在这里处理删除选中行的逻辑，可以从 selectedRows 中获取选中行的数据
  // console.log('删除选中的行:', selectedRows.value[0].id);

  // 批量删除
  if (selectedRows.value.length > 1) {
    const list = []
    selectedRows.value.forEach(row => {
        list.push(row.id)
    });
    // console.log(list)
    RolesManage.removeMoreRole(list)
      .then((res) => {
        console.log('vue批量角色删除成功')
    }).catch((error) => {
        console.log(error)
        console.log('vue批量角色删除失败')
      })
  }
  // 单删一个
  else if (selectedRows.value.length == 1) {
    RolesManage.removeRole(selectedRows.value[0].id)
      .then((res) => {
        console.log('vue角色删除成功')
    }).catch((error) => {
        console.log(error)
        console.log('vue角色删除失败')
      })
  }
  // 接下来你可以实现具体的删除操作
  // 添加一个延迟
}
function handleChange(selection) {
    // 更新 selectedRows
  selectedRows.value = selection;
}
function refresh() {
  RolesManage.findAll().then((res) => {
    console.log('查询所有角色',res)
  })
}
</script>

<style scoped>
  .container{
    display: flex;
    height: 555px;
    margin: 24px 32px;
    flex-direction: column;
    /* background-color: red; */
  }
  .head{
    height: 60px;
    width: 100%;
    background-color: #f1f4f6;
  }
  span{
    margin-right:50px;
    line-height: 60px;
    cursor: pointer;
  }
  .first{
    margin-left: 40px;
  }
  button{
    border: none;
    
    background-color: #f1f4f6;
    padding: 0;
  }
  .main{
    /* background-color: blue; */
    width: 100%;
    flex: 1;
    margin-top: 20px;
    }
    .el-table {
      border: 1px solid #9db9d6;
      /* background-color: red; */
    }
    
  
</style>