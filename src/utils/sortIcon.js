// 字段排序图标的设置
export function renderSortIcon(column) {
    if (column.order === 'ascending') {
      return getAscendingIcon()
    } else if (column.order === 'descending') {
      return getDescendingIcon()
    }
    return '' // 当没有排序时返回空字符串
  }
  
  export function getAscendingIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width: 12px; height: 12px">
                  <path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"></path>
                </svg>`
  }
  export function getDescendingIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" style="width: 12px; height: 12px">
                  <path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path>
                </svg>`
  }