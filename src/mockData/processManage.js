import Mock from 'mockjs';

// 新增和修改工序池名字
Mock.mock('/process/updateProcessName', 'post', () => {
    return {
        code: 200,
        message: 'mock修改或新增用户成功',
        data: null,
      };
});

Mock.mock('/process/getProcessNamePools', 'get', () => {
    return {
        code: 200,
        message: 'mock查询所有工序池成功',
        data: [
          {
              id: '1',
              processName:'主板程序烧录'
          },
          {
              id: '2',
              processName:'转接板程序烧录'
          },
          {
              id: '3',
              processName:'转接板分板'
          },
        ],
      };
});

Mock.mock('/process/deleteProcessName', 'post', () => {
    return {
        code: 200,
        message: 'mock删除工序成功',
        data: null,
      };
});

Mock.mock('/process/deleteProcessName', 'post', () => {
  return {
      code: 200,
      message: 'mock删除工序成功',
      data: null,
    };
});

Mock.mock('/process/getAllPackagingMethod', 'get', () => {
  return {
      code: 200,
      message: 'mock获取包装方式',
      data: ["整箱","散装"],
    };
});

Mock.mock('/process/getAllProductFamily', 'get', () => {
  return {
      code: 200,
      message: 'mock获取包装方式',
      data: ["tf-02-i","tf-02-pro","tf-04-mini"]
    };
});

Mock.mock('/process/addOrUpdateProcessCapacity', 'post', () => {
  return {
      code: 200,
      message: 'mock添加或修改产能',
      data: null
    };
});

Mock.mock('/process/deleteProcessCapacity', 'post', () => {
  return {
      code: 200,
      message: 'mock删除产能',
      data: null
    };
});

Mock.mock('/process/getProcessCapacity/1/25', 'get', () => {
  return {
      code: 200,
      message: 'mock获取分页产能',
      data:  {
        "page": 1,
        "size": 25,
        "total": 17,
        "apsProcessCapacityVo": [ 
          {
            "id": 2,
            "belongingProcess": "组装",
            "processName": "主板程序烧录",
            "processNumber": 1,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "4.10",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 3,
            "belongingProcess": "组装",
            "processName": "转接板程序烧录",
            "processNumber": 2,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "5.59",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 4,
            "belongingProcess": "组装",
            "processName": "转接板分板",
            "processNumber": 3,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "6.95",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 5,
            "belongingProcess": "组装",
            "processName": "粘贴SN标签",
            "processNumber": 4,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "15.50",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 6,
            "belongingProcess": "组装",
            "processName": "后壳穿线",
            "processNumber": 5,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "29.07",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 7,
            "belongingProcess": "组装",
            "processName": "后壳点胶",
            "processNumber": 6,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "55.18",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 8,
            "belongingProcess": "组装",
            "processName": "密封圈安装",
            "processNumber": 7,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "20.98",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 9,
            "belongingProcess": "组装",
            "processName": "镜片安装",
            "processNumber": 8,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "31.24",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 10,
            "belongingProcess": "组装",
            "processName": "发射/接受透镜安装",
            "processNumber": 9,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "39.10",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 11,
            "belongingProcess": "组装",
            "processName": "发射/接受透镜固定",
            "processNumber": 10,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "41.61",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 12,
            "belongingProcess": "组装",
            "processName": "主板分板",
            "processNumber": 11,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "14.14",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 13,
            "belongingProcess": "组装",
            "processName": "前壳模组安装",
            "processNumber": 12,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "24.40",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 14,
            "belongingProcess": "组装",
            "processName": "主板端子安装",
            "processNumber": 13,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "3.00",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 15,
            "belongingProcess": "组装",
            "processName": "校准测试",
            "processNumber": 14,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "119.00",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 16,
            "belongingProcess": "组装",
            "processName": "转接板安装",
            "processNumber": 15,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "86.14",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 17,
            "belongingProcess": "测试",
            "processName": "定点测试",
            "processNumber": 16,
            "productFamily": "tf-02-i",
            "packagingMethod": null,
            "standardTime": "44.45",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 18,
            "belongingProcess": "包装",
            "processName": "包装",
            "processNumber": 17,
            "productFamily": "tf-02-i",
            "packagingMethod": "整箱",
            "standardTime": "29.68",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 19,
            "belongingProcess": "包装",
            "processName": "包装",
            "processNumber": 18,
            "productFamily": "tf-02-i",
            "packagingMethod": "单品",
            "standardTime": "89.40",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 25,
            "belongingProcess": "组装",
            "processName": "主板分板+安装主板",
            "processNumber": 1,
            "productFamily": "tf-02-pro",
            "packagingMethod": null,
            "standardTime": "28.04",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 20,
            "belongingProcess": "组装",
            "processName": "主板程序烧录",
            "processNumber": 2,
            "productFamily": "tf-02-pro",
            "packagingMethod": null,
            "standardTime": "3.99",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 21,
            "belongingProcess": "组装",
            "processName": "镜片贴合",
            "processNumber": 3,
            "productFamily": "tf-02-pro",
            "packagingMethod": null,
            "standardTime": "12.54",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          {
            "id": 22,
            "belongingProcess": "组装",
            "processName": "镜片压合+粘贴SN标签",
            "processNumber": 4,
            "productFamily": "tf-02-pro",
            "packagingMethod": null,
            "standardTime": "18.24",
            "maxPersonnel": 1,
            "minPersonnel": 1
          },
          
          
        ]
      }
    };
});

Mock.mock('/process/getProcessCapacityByProductFamily?productFamily=tf-02-pro', 'get', () => {
  return {
      code: 200,
      message: 'mock根据产品族获取产品工序',
      data:  [
        {
          "id": 1,
          "belongingProcess": "77",
          "processId": "14",
          "processName": "中国",
          "processNumber": 1,
          "productFamily": "tf-luna-m",
          "packagingMethod": "整箱",
          "standardTime": "1451.00",
          "maxPersonnel": 1,
          "minPersonnel": 1
        },
        {
          "id": 2,
          "belongingProcess": "88",
          "processId": "14",
          "processName": "中国",
          "processNumber": 2,
          "productFamily": "tf-luna-m",
          "packagingMethod": "整箱",
          "standardTime": "0.00",
          "maxPersonnel": 0,
          "minPersonnel": 0
        },
        {
          "id": 3,
          "belongingProcess": "88",
          "processId": "14",
          "processName": "中国",
          "processNumber": 3,
          "productFamily": "tf-luna-m",
          "packagingMethod": "整箱",
          "standardTime": "0.00",
          "maxPersonnel": 0,
          "minPersonnel": 0
        },
        {
          "id": 4,
          "belongingProcess": "88",
          "processId": "14",
          "processName": "中国",
          "processNumber": 4,
          "productFamily": "tf-luna-m",
          "packagingMethod": "整箱",
          "standardTime": "0.00",
          "maxPersonnel": 0,
          "minPersonnel": 0
        }
      ]
    };
});

Mock.mock('/process/saveProcessScheme', 'post', () => {
  return {
      code: 200,
      message: 'mock创建保存基础方案',
      data: null
    };
});

Mock.mock('/process/updateProcessScheme', 'post', () => {
  return {
      code: 200,
      message: 'mock更新基础方案',
      data: null
    };
});