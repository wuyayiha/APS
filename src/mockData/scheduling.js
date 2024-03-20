import Mock from 'mockjs';

// 使用 Mock.js 拦截获取排程界面的接口
// 排程的数据更新
Mock.mock('/scheduling/dataUpdate', 'post', () => {
    // const responses = [
    //     {
    //         "code": 200,
    //         "message": "成功",
    //         "data": null
    //     },
    //     {
    //         "code": 201,
    //         "message": "xxx正在使用了！",
    //         "data": null
    //     },
    //     {
    //         "code": 201,
    //         "message": "更新数据库过程中请稍后~~~",
    //         "data": null
    //     }
    // ];
    // return Mock.Random.pick(responses);
    // return {
    //     code: 200,
    //     message: '成功',
    //     data:null
    // }
    return {
        code: 201,
        message: "更新数据库过程中请稍后~~~",
        data:null
    }
    // return {
    //     code: 201,
    //     message: "xxx正在使用了！",
    //     data:null    
    // }
});

Mock.mock('/scheduling/closeLock', 'post', () => {
    return {
        code: 200,
        message: '关锁成功'
    }
});

Mock.mock('/scheduling/getPageLock', 'post', () => {
    return {
        code: 201,
        // message:'获取锁成功'
        message:'获取锁失败，有人正在使用'
    }
})

Mock.mock('/scheduling/lockRenewal', 'post', () => {
    return {
        code: 200,
        message:'锁续期成功'
    }
})

Mock.mock('/scheduling/startScheduling', 'post', () => {
    return {
        code: 200,
        message:'排程成功'
    }
})

Mock.mock('/scheduling/integrityChecker', 'post', () => {
    return {
        code: 200,
        message:'排程成功'
    }
})