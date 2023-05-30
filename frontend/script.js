"use strict";
var id = "1900012997"; //等会修改成从后端获取的id
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
	document.getElementsById("post_items")[0].style.display = "block";
}

//退出登录，关闭主页、顶部导航栏和侧边栏，显示登录/注册界面
function logout() {
	document.getElementsByClassName("login_or_signup")[0].style.display =
		"block";
	document.getElementsByClassName("navigator")[0].style.display = "none";
	document.getElementsById("post_items")[0].style.display = "none";
	close_sidebar();
}

//每次刷新页面，加载背景，主页请求帖子

let start_index = 1
let post_num = 10
let avatar_url = ""


function formatUnixTime(unixTimestamp) {
	const dateObj = new Date(unixTimestamp * 1000); // 将秒数转化为毫秒数
	const now = new Date(); // 当前时间
  
	// 计算相差的总秒数、总分钟数、总小时数和总天数
	const diffSeconds = Math.floor((now - dateObj) / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);
  
	// 判断输出内容
	if (diffDays > 0) {
	  return `${diffDays}天${diffHours % 24}小时${diffMinutes % 60}分钟前`;
	} else if (diffHours > 0) {
	  return `${diffHours}小时${diffMinutes % 60}分钟前`;
	} else {
	  return `${diffMinutes}分钟前`;
	}
  }

function init() {
	//从cookie中获取学号，如果过期，则跳转到登录界面
	// id = document.cookie;
	id = document.cookie.replace(/(?:(?:^|.*;\s*)id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	console.log(document.cookie)
	console.log(id)
	if (id == "") {
		console.log("quit")
		logout();
		return;
	}
	//加载背景
	axios
		.post("user/queryStudentInfo", { student_number: id })
		.then((response) => {
			let backgroundURL = response.data.backgroundURL;
			console.log(backgroundURL);
			avatar_url = response.data.avatarURL;
			document.body.style.backgroundImage = `url(${backgroundURL})`;
		}).catch((error) => {
			console.error(error);
		});
	//主页请求帖子
	axios
		.post("treehole/queryPost", { student_number: id ,startIndex:start_index,postNum:post_num})
		.then((response) => {
			let post_list = response.data.postList;
			let post_items = document.getElementById("post_items");
			console.log(post_list)
			for(let i=0;i<post_list.length;++i){
				let content = document.createElement("div");
				content.setAttribute("class","item");

				let post_id = document.createElement("span");
				post_id.setAttribute("class","post_id");
				post_id.innerHTML = "#" + post_list[i].postId;
				content.appendChild(post_id)

				let is_favour = document.createElement("span");
				is_favour.setAttribute("class","isfavored");
				if(post_list[i].isFavour == "true"){
					is_favour.innerHTML = "已收藏"//收藏的图标
				}else{
					is_favour.innerHTML = "未收藏"//未收藏的图标
				}
				content.appendChild(is_favour)

				let post_time = document.createElement("span");
				post_time.setAttribute("class","post_time");
				post_time.innerHTML = formatUnixTime(post_list[i].sendTime);
				content.appendChild(post_time)

				let sub_content = document.createElement("div");
				sub_content.setAttribute("class","sub_content");

				let post_content = document.createElement("span");
				post_content.setAttribute("class","host_element");
				post_content.innerHTML = post_list[i].content;
				sub_content.appendChild(post_content);

				let sub_img = document.createElement("img");
				sub_img.setAttribute("class","host_head_icon");
				sub_img.src = avatar_url;

				let comment_list = document.createElement("ul");
				comment_list.setAttribute("class","comment_element");
				for(let j=0;j<post_list[i].CommentList.length;++j){
					let comment = document.createElement("li");
					comment.setAttribute("class","comment_preview");
					comment.innerHTML = post_list[i].CommentList[j].content;
					comment_list.appendChild(comment);
				}
				sub_content.appendChild(comment_list);
				content.appendChild(sub_content);
				content.onclick = function(){
					open_post(post_list[i].postId);
				}
				post_items.appendChild(content);
			}
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
				console.log("id: ",id)
				document.cookie = "id=" + id;
				console.log("cookie: ",document.cookie)
				init();
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
			avatar_url = response.data.avatarURL;
			let avatarURL = response.data.avatarURL;
			console.log("Avatar URL:", avatarURL);
			//将avatar的src属性设置为avatarURL
			avatar.src = avatarURL;			
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
		.post("treehole/querySinglePost", {student_number:id ,postId: post_number})
		.then((response) => {
			let detailed_content = document.getElementById("detailed_content");
			while (detailed_content.firstChild) { // 不断遍历子节点列表直到为空
				detailed_content.removeChild(detailed_content.firstChild); // 删除第一个子节点
			}
			let comment_list = response.data.singlePost.CommentList;
			
			let detailed_item = document.createElement("li");

			let post_id = document.createElement("span");
			post_id.setAttribute("class","post_id");
			post_id.innerHTML = "#" + response.data.singlePost.postId;
			detailed_item.appendChild(post_id)

			let post_time = document.createElement("span");
			post_time.setAttribute("class","post_time");
			post_time.innerHTML = formatUnixTime(response.data.singlePost.sendTime);
			detailed_item.appendChild(post_time)

			let sub_item = document.createElement("div");

			let sub_img = document.createElement("img");
			sub_img.setAttribute("class","host_head_icon");
			sub_img.src = avatar_url;
			sub_item.appendChild(sub_img);

			let sub_content = document.createElement("span");
			sub_content.setAttribute("class","detailed_text");
			sub_content.innerHTML = response.data.singlePost.content;
			sub_item.appendChild(sub_content);

			detailed_item.appendChild(sub_item);
			detailed_content.appendChild(detailed_item);

			for(let i=0;i<comment_list.length;++i){
				let detailed_item = document.createElement("li");

				let post_id = document.createElement("span");
				post_id.setAttribute("class","post_id");
				post_id.innerHTML = "#" + comment_list[i].commentId;
				detailed_item.appendChild(post_id)
	
				let post_time = document.createElement("span");
				post_time.setAttribute("class","post_time");
				post_time.innerHTML = formatUnixTime(comment_list[i].sendTime);
				detailed_item.appendChild(post_time)
	
				let sub_item = document.createElement("div");
	
				// let sub_img = document.createElement("img");
				// sub_img.setAttribute("class","host_head_icon");
				// sub_img.src = avatar_url;
				// sub_item.appendChild(sub_img);
	
				let sub_content = document.createElement("span");
				sub_content.setAttribute("class","detailed_text");
				sub_content.innerHTML = comment_list[i].content;
				sub_item.appendChild(sub_content);
	
				detailed_item.appendChild(sub_item);
				detailed_content.appendChild(detailed_item);
			}
		}).catch((error) => {
			console.error(error);
		});
}

//树洞详情页中，刷新逆序收藏（或取消收藏）
function refresh() {
	//刷新就是
















}
function reverse() {
	//反转的代码









}
function collect() {
	let collect = document.getElementById("collect");
	if (collect.innerHTML == "收藏") {
		collect.innerHTML = "已收藏";
		//向后端发东西



	} else if (collect.innerHTML == "已收藏") {
		collect.innerHTML = "收藏";
		//向后端发东西


		
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
		document.getElementById("user_avatar").style.src = dataURL;
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
