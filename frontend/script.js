"use strict";
var id = "1919810996"; //等会修改成从后端获取的id
//axios的配置
axios.defaults.baseURL = "http://localhost:8080/";
var qs = Qs;
axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded";

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

//每次刷新页面，加载背景，主页请求帖子
function init() {
	//从cookie中获取学号，如果过期，则跳转到登录界面
	id = document.cookie;
	if (document.cookie == "") {
		logout();
		return;
	}
	//加载背景
	axios
		.post("user/queryStudentInfo", { student_number: id })
		.then((response) => {
			let backgroundURL = response.backgroundURL;
			document.body.style.backgroundImage = `url(${backgroundURL})`;
		}).catch((error) => {
			console.error(error);
		});
	//主页请求帖子
	axios
		.post("user/queryPost", { student_number: id })
		.then((response) => {







//`````````````………………………………………………………………………………………………………………………………………………………………………………







		}).catch((error) => {
			console.error(error);
		});
}
init();

//打开侧边栏和遮罩层
function open_sidebar() {
	document.getElementsByClassName("mask")[0].style.display = "block";
	document.getElementsByClassName("sidebar")[0].style.display = "block";
}
//关闭侧边栏和遮罩层
function close_sidebar() {
	//让每种侧边栏的内容都不显示，【包括sidebar_title/buttons】（然后再打开指定的侧边栏内容）
	document.getElementById("sidebar_title").style.display = "none";
	document.getElementsByClassName("sidebar_buttons")[0].style.display =
		"none";
	for (let i = 0; i < 4; i++) {
		document.getElementsByClassName("sidebar_content")[i].style.display =
			"none";
	}
	//然后关闭整个的侧边栏和遮罩层
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

//登录/注册
function login_or_signup() {
	//flag = "login"/"register"
	let button = document.getElementById("login_or_signup_button");
	let flag = button.innerHTML == "登录" ? "login" : "signup";
	let num = document.getElementById("stu_number"); //num.value是个字符串，所以无需转化
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
			).then((response) => {
				console.log(response);
				open_mainpage();
				resolve("done");
				//缓存学号，用cookie
				id = num.value;
				document.cookie = id;
			}).catch((error) => {
				alert(error);
				reject(error);
			});
	});
}

//修改密码【注意】：这里很不确定写对了没有qwq
function change_password() {
	let old_psw = document.getElementById("old_password");
	let new_psw = document.getElementById("new_password");
	return new Promise((resolve, reject) => {
		axios
			.post(
				qs.stringify({
					student_number: id,
					student_number: old_psw.value,
					newPassword: new_psw.value,
				})
			).then((response) => {
				console.log(response);
				alert("修改成功！");
				resolve("done");
			}).catch((error) => {
				alert(error);
				reject(error);
			});
	});
}

//导航栏的搜索，发洞，收藏，待办，账户按钮
//搜索（不确定）
function search() {
	let search_content = document.getElementById("search").value;
	close_sidebar();
	return new Promise((resolve, reject) => {
		axios
			.post(
				qs.stringify({
					content: search_content,
				})
			)
			.then((response) => {
				console.log(response);
				//从后端返回？刷新？还不晓得怎么写捏


















				resolve("done");
			})
			.catch((error) => {
				//搜索应该只有“搜索为空”这种error，再不还有个“过长”的error
				alert(error);
				reject(error);
			});
	});
}
//调出发洞页面
function call_post_page() {
	close_sidebar();
	open_sidebar();
	document.getElementById("sidebar_title").style.display = "inline";
	document.getElementById("edit_post").style.display = "block";
	document.getElementById("sidebar_title").innerHTML = "编辑树洞";
}
//调出收藏页面
function call_collection_page() {
	close_sidebar();
	//未完待续~~~~~~~~~~~~~~~~~~
}




//调出todolist，兼具刷新之用
function call_todolist_page() {
	close_sidebar();
	open_sidebar();
	document.getElementById("sidebar_title").style.display = "inline";
	document.getElementById("todolist").style.display = "block";
	document.getElementById("sidebar_title").innerHTML = "待办";
	//向后端请求toddolist的内容

















}
//添加待办条目
function add_todo(){

}

//修改待办条目
function change_todo(todo_id){
	
}




//调出账户设置页面
function call_account_page() {
	close_sidebar();
	open_sidebar();
	document.getElementById("sidebar_title").style.display = "inline";
	document.getElementById("account_info").style.display = "block";
	document.getElementById("sidebar_title").innerHTML = "账户设置";
	//放上学号
	document.getElementById("user_id").innerHTML = "学号：" + id;
	//查询用户信息，返回头像url，背景url
	var avatar = document.getElementById("user_avatar");
	var background = document.getElementById("user_background");
	axios
		.post("user/queryStudentInfo", { student_number: id })
		.then((response) => {
			console.log(response)
			let avatarURL = response.data.avatarURL;
			let backgroundURL = response.data.backgroundURL;
			console.log("Avatar URL:", avatarURL);
			console.log("Background URL:", backgroundURL);
			//将avatar的src属性设置为avatarURL
			avatar.src = avatarURL;
			//将background的src属性设置为backgroundURL
			background.src = backgroundURL;
		})
		.catch((error) => {
			console.error(error);
		});
}

//打开某条树洞（未完待续）
function open_post(post_number) {
	//树洞号
	close_sidebar();
	open_sidebar();
	document.getElementsByClassName("sidebar_buttons")[0].style.display =
		"inline";
	document.getElementById("details").style.display = "block";
	//向后端请求内容
	axios
		.post("user/querySinglePost", { post_number: post_number })
		.then((response) => {















		}).catch((error) => {
			console.error(error);
		});
}

//树洞详情页中，刷新逆序收藏（或取消收藏）
function refresh() {
	//刷新














}
function reverse() {
	//反转的代码









}
function collect() {
	let collect = document.getElementById("collect");
	if (collect.innerHTML == "收藏") {
		collect.innerHTML = "已收藏";
	} else if (collect.innerHTML == "已收藏") {
		collect.innerHTML = "收藏";
	}
}

//修改背景图片
const background = document.getElementById("bgupload");
background.addEventListener("click", function (event) {
	event.preventDefault(); // 阻止表单提交的默认行为
	const file = document.getElementById("bgimg").files[0];
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
				//将图片文件上传到后端
				const formData = new FormData();
				formData.append("student_number", id);
				formData.append("background", file);
				axios
					.post("user/uploadBackground", formData)
					.then((response) => {
						console.log(response.data);
					}).catch((error) => {
						console.error(error);
					});
			} else {
				alert("请选择图片文件！");
			}
		};
		document.getElementById("user_background").src = dataURL;
	};
});

//修改头像
const avatar = document.getElementById("avatarupload");
avatar.addEventListener("click", function (event) {
	event.preventDefault(); // 阻止表单提交的默认行为
	const file = document.getElementById("avatar").files[0];
	const fileReader = new FileReader();
	fileReader.readAsDataURL(file); // 读取文件，并将文件转换为base64格式
	fileReader.onload = function () {
		const dataURL = fileReader.result;
		const image = new Image();
		image.src = dataURL;
		image.onload = function () {
			// 检查文件格式是否为图片
			if (image.width > 0 && image.height > 0) {
				// 如果是图片，则将图片直接上传到后端
				const formData = new FormData();
				formData.append("student_number", id);
				formData.append("avatar", file);
				axios
					.post("user/uploadAvatar", formData)
					.then((response) => {
						console.log(response.data);
					}).catch((error) => {
						console.error(error);
					});
			} else {
				alert("请选择图片文件！");
			}
		};
		//更新账户界面
		document.getElementById("user_avatar").src = dataURL;
	};
});

//发树洞
function submit_post() {
	let input = document.getElementById("post_input");
	let content = input.value;
	axios
		.post(
			qs.stringify({
				student_number: id,
				content: content,
			})
		).then((response) => {
			console.log(response);
			resolve("done");
			init();
		}).catch((error) => {
			alert(error);
			reject(error);
		});
}

//发评论
function submit_comment() {
	let input = document.getElementById("comment_input");
	let content = input.value;
	//【特别注意】：reply_id这个元素还没写！！！！！
	let replyId = document.getElementById("reply_id").innerHTML;
	axios
		.post("user/submitPost", { 
			senderId: id,
			content: content,
			replyId: replyId
		}).then((response) => {
			//open_post(post_number)来刷新
			open_post(post_number);
		}).catch((error) => {
			console.error(error);
		});
}
