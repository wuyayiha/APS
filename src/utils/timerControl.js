import useSchedule from '../store/modules/scheduling'

let timer = null

export function startTimer() {
  timer = setInterval(() => {
    //续上锁
    useSchedule()
      .lockRenewal()
      .then((res) => {
        console.log(res.message)
      })
      .catch((error) => {})
    // console.log('正在排程，定时向后端发送请求');
  }, 300000)
}

export function stopTimer() {
  clearInterval(timer)
  console.log('结束排程，关闭定时器')
}
