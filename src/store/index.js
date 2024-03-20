// index.js

import { createStore } from 'vuex';
import userModule from './modules/user'; // 此处根据实际路径进行调整
import menuModule from './modules/menu';
import usersManage from './modules/permission/usersManage';
import rolesManage from './modules/permission/rolesManage';
import scheduling from './modules/scheduling';
import useGtt from './modules/gtt';
import processManage from './modules/metaData/processManage';
import productionPlan from './modules/productionPlan'
import machineManagement from './modules/metaData/machineManagement';
import immediateInventory from './modules/port/ERP/immediateInventory';
import dailyDataUpload from './modules/port/MES/dailyDataUpload';
import fimRequest from './modules/port/FIM/fimRequest';
import rawBasicData from './modules/metaData/materialBasicData/rawBasicData';
import finishedProduct from './modules/metaData/materialBasicData/finishedProduct';
import semiFinished from './modules/metaData/materialBasicData/semiFinished';
import attendanceManagement from './modules/metaData/attendanceManagement'

export default createStore({
  modules: {
    user:userModule,
    menu: menuModule,
    rolesManage: rolesManage,
    usersManage: usersManage,
    scheduling: scheduling,
    useGtt: useGtt,
    processManage: processManage,
    productionPlan: productionPlan,
    machineManagement: machineManagement,
    immediateInventory: immediateInventory,
    dailyDataUpload: dailyDataUpload,
    fimRequest:fimRequest,
    rawBasicData: rawBasicData,
    finishedProduct: finishedProduct,
    semiFinished: semiFinished,
    attendanceManagement:attendanceManagement
  },
});
