import { defineStore } from 'pinia'

const usersManage = defineStore(
    'userManage',
    {
        state: () => ({
            users: [
                {
                    id: 1,
                    username: '张三',
                    password: '123',
                    deptname: '财务部',
                    status: '正常',
                    create_time: '2023-10-1',
                    update_time: '2023-10-2',
                },
                {
                    id: 2,
                    username: '李四',
                    password: '456',
                    deptname: '行政部',
                    status: '正常',
                    create_time: '2023-9-21',
                    update_time: '2023-9-28',
                },
            ],
        }),
        actions: {
            
        }
    }
)
export default usersManage