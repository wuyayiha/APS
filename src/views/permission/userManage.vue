<template>
  <div class="container">
      <div class="head">
        <button @click="addRow"><span class="first">新增</span></button>
        <button><span>修改</span></button>
        <button @click="deleteSelectedRows" type="danger"><span>删除</span></button>
        <button><span>刷新</span></button>
        <button><span>导入</span></button>
        <button><span>导出</span></button>
      </div>
      <div class="main">
        <el-table :data="UsersManage.users" border 
        
        :cell-style="{borderColor:'#9db9d6',textAlign:'center'}" 
        :header-cell-style="{borderColor:'#9db9d6',background:'#d9e9f8',color:'#000',textAlign:'center',fontWeight:'500'}"
        row-key="id"
        @selection-change="handleChange"
        >
          <el-table-column type="selection" :reserve-selection="true" label="" width="35" class="one"/>
          <el-table-column prop="id" label="序号" width="147" />
          <el-table-column prop="username" label="用户名称" width="170">
            <template #default="{ row }">
              <template v-if="row.editable">
                <el-input v-model="row.username" @keyup.enter="saveRow(row)" />
              </template>
              <template v-else>
                {{ row.username }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="password" label="用户密码" width="170">
            <template #default="{ row }">
              <template v-if="row.editable">
                <el-input v-model="row.password" @keyup.enter="saveRow(row)" />
              </template>
              <template v-else>
                {{ row.password }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="deptname" label="部门名称">
            <template #default="{ row }">
              <template v-if="row.editable">
                <el-input v-model="row.deptname" @keyup.enter="saveRow(row)" />
              </template>
              <template v-else>
                {{ row.deptname }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="170">
            <template #default="{ row }">
              <template v-if="row.editable">
                <el-input v-model="row.status" @keyup.enter="saveRow(row)" />
              </template>
              <template v-else>
                {{ row.status }}
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="200">
          </el-table-column>
          <el-table-column prop="update_time" label="更新时间" width="200"/>
        </el-table>
      </div>
  </div>  
</template>


<script setup>
import { ref } from 'vue'
import useUsersManage from '@/store/modules/permission/usersManage'
const UsersManage = useUsersManage()
// console.log(usepermission.users)
const newRow = {
  id: '',
  username: '',
  password: '',
  deptname: '',
  status: '',
  create_time: '',
  update_time: '',
  editable: true // 新增的行默认为可编辑状态
}
const selectedRows = ref([]); // 存储选中的行数据

function addRow() {
  UsersManage.users.push({ ...newRow })
}

function saveRow(row) {
  // 这里可以添加保存数据的逻辑，例如将数据发送到后端
  // 获取当前时间并分配给创建时间字段
  row.create_time = new Date().toLocaleString(); // 使用当前日期时间格式化字符串
  row.update_time = new Date().toLocaleString(); // 使用当前日期时间格式化字符串
  // 序号自动加1
  row.id = UsersManage.users.length;
  console.log(row.id)
  // 保存成功后可以在这里更新状态或执行其他操作
  row.editable = false; // 保存后将行设置为不可编辑状态
}
function deleteSelectedRows() {
  // 在这里处理删除选中行的逻辑，可以从 selectedRows 中获取选中行的数据
  console.log('删除选中的行:', selectedRows.value);
  // 接下来你可以实现具体的删除操作
  // 添加一个延迟
}
function handleChange(selection) {
    // 更新 selectedRows
  selectedRows.value = selection;
}

</script>

<style scoped>
  .container{
    display: flex;
    /* height: 555px; */
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
    /* width: 100%; */
    flex: 1;
    margin-top: 20px;
    }
    .el-table {
      border: 1px solid #9db9d6;
      width: 100%;
      /* background-color: red; */
    }
    
  
</style>