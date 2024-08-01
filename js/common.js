function $(selector) {
    return document.querySelector(selector)
}

function $$(selector) {
    return document.querySelectorAll(selector)
}

function $$$(tagName) {
    return document.createElement(tagName)
}

function dateFormat(time) {
    const dateObj = new Date(time)
    let year = dateObj.getFullYear(),
        month = dateObj.getMonth() + 1,
        date = dateObj.getDate(),
        hour = dateObj.getHours(),
        minute = dateObj.getMinutes(),
        second = dateObj.getSeconds()
    month = month < 10 ? '0' + month : month
    date = date < 10 ? '0' + date : date
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}
