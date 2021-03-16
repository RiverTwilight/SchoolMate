import { AES, enc } from "crypto-js";
const SECRET = "0412";

//设置cookie
function setCookie(cname: any, cvalue: any, exdays: any) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = "expires=" + d.toUTCString();
	document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

//获取cookie
function getCookie(cname: any) {
	var name = cname + "=";
	var ca = document.cookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
}

//清除cookie
function clearCookie(name: any) {
	document.cookie = `${name}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT;`;
}

const removeUserInfo = () => {
	clearCookie("userInfo");
	sessionStorage.userInfo && sessionStorage.removeItem("userInfo");
};

const setUserInfo = (token: string, data: any, remember: any) => {
	const encryptedData = AES.encrypt(data, SECRET);
	setCookie("TOKEN", token, 30);
	sessionStorage.setItem("userInfo", String(encryptedData));
};

const getUserInfo = (): (userInfoFromLocal | null) => {
	const dataStr = sessionStorage.userInfo || getCookie("userInfo");
	if (!dataStr) return null;
	const data: userInfoFromLocal = JSON.parse(
		enc.Utf8.stringify(AES.decrypt(dataStr, SECRET))
	);

	return data;
};

export { getUserInfo, removeUserInfo, setUserInfo };