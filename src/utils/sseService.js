import { EventSourcePolyfill } from 'event-source-polyfill';
import { getToken } from './auth'

let eventSource; // 在外部声明一个变量

function connectToSSE() {
    // 替换为你的服务器地址
    const serverUrl = "https://www.aps.benewake.top/benewake"; // 示例：测试服务器
    // const serverUrl = "https://aps.benewake.com/benewake"; // 示例：正式服务器
    // const serverUrl = "https://apstest.benewake.com/benewake"

    const token = getToken()
    // const eventSource = new EventSource(`${serverUrl}/sse/connect?token=${token}`);

    eventSource = new EventSourcePolyfill(`${serverUrl}/sse/connect`, {
        headers: {
          'token':token
        }
      });

    eventSource.onopen = function () {
        console.log("SSE连接已建立");
    };

    eventSource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        
        if (data != '1') {
            ElNotification({
                title: '排程提醒',
                message: data.message,
                duration: 0,
                type: data.state
            })
            console.log(data)
        }
        
    };

    eventSource.onerror = function (error) {
        console.error("SSE连接发生错误:", error);
    };
}
function closeConnect() {
    if (eventSource) {
        eventSource.close();
        console.log('关闭SSE链接');
    } else {
        console.log('SSE链接未被初始化');
    }
}
export { connectToSSE,closeConnect }; 