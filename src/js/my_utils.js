//设定 cookie 函数
function setCookie(key,value,time){
    const nowTime = new Date();
    let t = nowTime.getTime() - (8*60*60*1000) + time*1000;
    nowTime.setTime(t);
    document.cookie = `${key}=${value};expires=${time === undefined ? '' : nowTime };path=/`;
}

//获取 cookie 函数
function getCookie(cookieStr){
    const obj = {};
    const arr1 = cookieStr.split('; ');
    arr1.forEach((item)=>{ 
        const newArr = item.split('=');
        obj[newArr[0]] = newArr[1];
    })
    return obj;
}

//gat ajax 方式
function getAjax(url , cb ){
    const xhr = new XMLHttpRequest();
    xhr.open('get' , url);
    xhr.send();
    xhr.onload = function(){
        cb(xhr.response);
    }
}

//post ajax 方式
function postAjax(url , cb , dataStr){
    const xhr = new XMLHttpRequest();
    xhr.open('post' , url);
    xhr.setRequestHeader('content-type' , 'application/x-www-form-urlencoded');
    xhr.send(dataStr);
    xhr.onload = function(){
        cb(xhr.response);
    }
}