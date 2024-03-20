import { dynamicRoutes } from '@/router/index';
import router from '@/router'; // 导入你的路由配置

// 过滤路由或其他逻辑
function filterRoutes(routes) {
  // 例如：过滤掉不需要的路由
  return routes; // 返回经过过滤的路由
}


// 注册所有的路由
export function generateRoutes() {
  const menuArray = [];

  dynamicRoutes.forEach(route => {
    if (route.children) {
      route.children.forEach((childRoute) => {
        // childRoute.component = loadComponent(childRoute.component);

        if (childRoute.children) {
        //   childRoute.children.forEach((grandChildRoute) => {
        //     grandChildRoute.component = loadComponent(grandChildRoute.component);
        //   });
          menuArray.push(...childRoute.children); 
        } else {
          menuArray.push(childRoute);
        }
      });
    } else {
      // route.component = loadComponent(route.component);
      menuArray.push(route);
    }
  });

  // console.log(menuArray,'menuArray')
  const filteredRoutes = filterRoutes(menuArray);

  filteredRoutes.forEach((item) => {
    router.addRoute("home", item);
  });

  return filteredRoutes;
}
