"use strict";

//打开侧边栏和遮罩层
function open_sidebar() {
	document.getElementsByClassName("mask")[0].style.display = "block";
	document.getElementsByClassName("sidebar")[0].style.display = "block";
}
//关闭侧边栏和遮罩层
function close_sidebar() {
	document.getElementsByClassName("mask")[0].style.display = "none";
	document.getElementsByClassName("sidebar")[0].style.display = "none";
}
//方式1：点击关闭按钮
document.getElementsByClassName("close_sidebar")[0].onclick = close_sidebar;
//方式2：点击遮罩层
document.getElementsByClassName("mask")[0].onclick = close_sidebar;

//转换登录/注册
let turn_to_login_or_signup = document.getElementById(
	"turn_to_login_or_signup"
);
turn_to_login_or_signup.onclick = function () {
	var login_or_signup_button = document.getElementById(
		"login_or_signup_button"
	);
	if (turn_to_login_or_signup.innerHTML == "已有账号?") {
		turn_to_login_or_signup.innerHTML = "还未注册?";
		login_or_signup_button.innerHTML = "登录";
	} else if (turn_to_login_or_signup.innerHTML == "还未注册?") {
		turn_to_login_or_signup.innerHTML = "已有账号?";
		login_or_signup_button.innerHTML = "注册";
	}
};

//关闭登录/注册界面，打开主页和顶部导航栏
function open_mainpage() {
	document.getElementsByClassName("login_or_signup")[0].style.display =
		"none";
	document.getElementsByClassName("navigator")[0].style.display = "block";
	document.getElementsByClassName("post_items")[0].style.display = "block";
}

//退出登录，关闭主页、顶部导航栏和侧边栏，显示登录/注册界面
function logout() {
	document.getElementsByClassName("login_or_signup")[0].style.display =
		"block";
	document.getElementsByClassName("navigator")[0].style.display = "none";
	document.getElementsByClassName("post_items")[0].style.display = "none";
	close_sidebar();
}

//登录/注册
axios.defaults.baseURL = "http://localhost:8080/";

var qs = Qs;
axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";

function login_or_signup() {
	//flag = "login"/"register"
	let button = document.getElementById("login_or_signup_button");
	let flag = button.innerHTML == "登录" ? "login" : "signup";
	let num = document.getElementById("stu_number");
	let psw = document.getElementById("password");

	return new Promise((resolve, reject) => {
		axios
			.post(
				"user/" + flag,
				qs.stringify({
					flag: flag,
					student_number: num.value,
					password: psw.value,
				})
			)
			.then((response) => {
				console.log(response);
				open_mainpage();
				resolve("done");
			})
			.catch((error) => {
				alert(error);
				reject(error);
			});
	});
}

//修改密码【注意】：这里很不确定写对了没有qwq
function change_password() {
	let old_psw = document.getElementById("old_password");
	let new_psw = document.getElementById("new_password");
	let confirm_new_psw = document.getElementById("confirm_new_password");
	return new Promise((resolve, reject) => {
		axios
			.post(
				qs.stringify({
					oldpsw: old_psw.value,
					newpsw: new_psw.value,
					confirmnewpsw: confirm_new_psw.value,
				})
			)
			.then((response) => {
				console.log(response);
				alert("修改成功！");
				resolve("done");
			})
			.catch((error) => {
				alert(error);
				reject(error);
			});
	});
}

//树洞详情页中，刷新逆序收藏（或取消收藏）
function refresh(){
    //刷新的代码
}
function reverse(){
    //反转的代码
}
function collect(){
    let collect = document.getElementById("collect");
    if(collect.innerHTML=="收藏"){
        collect.innerHTML="已收藏";
        //收藏的代码
    }else if(collect.innerHTML=="已收藏"){
        collect.innerHTML="收藏";
        //取消收藏的代码
    }
}


//修改背景图片
const uploadBtn = document.getElementById("uploadBtn");
uploadBtn.addEventListener("click", function (event) {
	event.preventDefault(); // 阻止表单提交的默认行为
	const file = document.getElementById("fileUpload").files[0];
	const fileReader = new FileReader();
	fileReader.readAsDataURL(file); // 读取文件，并将文件转换为base64格式
	fileReader.onload = function () {
		const dataURL = fileReader.result;
		const image = new Image();
		image.src = dataURL;
		image.onload = function () {
			// 检查文件格式是否为图片
			if (image.width > 0 && image.height > 0) {
				// 如果是图片，则将图片设为背景
				document.body.style.backgroundImage = `url(${dataURL})`;
			} else {
				alert("请选择图片文件！");
			}
		};
	};
});

//发树洞（不确定，而且没刷新）
function submit_post() {
	let input = document.getElementById("post_input");
	let content = input.value;
	return new Promise((resolve, reject) => {
		axios
			.post(
				qs.stringify({
					content: content,
				})
			)
			.then((response) => {
				console.log(response);
				alert("发表成功！");
				resolve("done");
			})
			.catch((error) => {
				alert(error);
				reject(error);
			});
	});
}

