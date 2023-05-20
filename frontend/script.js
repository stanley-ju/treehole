"use strict"

//关闭侧边栏
//方式1：点击关闭按钮
document.getElementsByClassName("close_sidebar")[0].onclick = function () {
    document.getElementsByClassName("mask")[0].style.display = "none";
    document.getElementsByClassName("sidebar")[0].style.display = "none";
}
//方式2：点击遮罩层
document.getElementsByClassName("mask")[0].onclick = function () {
    document.getElementsByClassName("mask")[0].style.display = "none";
    document.getElementsByClassName("sidebar")[0].style.display = "none";
}

//打开侧边栏和遮罩层
function open_sidebar() {
    document.getElementsByClassName("mask")[0].style.display = "block";
    document.getElementsByClassName("sidebar")[0].style.display = "block";
}

//转换登录/注册
let turn_to_login_or_signup = document.getElementById("turn_to_login_or_signup");
turn_to_login_or_signup.onclick = function () {
    var login_or_signup_button = document.getElementById("login_or_signup_button");
    if(turn_to_login_or_signup.innerHTML == "已有账号?"){
        turn_to_login_or_signup.innerHTML = "还未注册?";
        login_or_signup_button.innerHTML = "登录";
    } else if (turn_to_login_or_signup.innerHTML == "还未注册?") {
        turn_to_login_or_signup.innerHTML = "已有账号?";
        login_or_signup_button.innerHTML = "注册";
    } 
}

//关闭登录/注册界面，打开主页和顶部导航栏
function open_mainpage(){
    document.getElementsByClassName("login_or_signup")[0].style.display = "none";
    document.getElementsByClassName("navigator")[0].style.display = "block";
    document.getElementsByClassName("post_items")[0].style.display = "block";
}

//退出登录，关闭主页和顶部导航栏，显示登录/注册界面
function logout(){
    document.getElementsByClassName("login_or_signup")[0].style.display = "block";
    document.getElementsByClassName("navigator")[0].style.display = "none";
    document.getElementsByClassName("post_items")[0].style.display = "none";
}

//登录/注册
axios.defaults.baseURL = 'http://localhost:8080/'

var qs = Qs
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

function login_or_signup (student_number, password, flag) {//flag = "login"/"register"
    return new Promise((resolve,reject) => {
        axios.post('user/'+flag,qs.stringify({
            flag:flag,
            student_number:student_number,
            password:password
        })).then(response => {
            console.log(response)
            open_mainpage()
            resolve("done")
        }).catch(error => {
            alert(error)
            reject(error)
        })
    })
}

/**
request｛
    flag: "login"/"register", //注意！！这里新增了这一句
	studentNumber: "0123456789",
    password:"****"
｝

response {
    respMessage : "success"/"fail"
} */
