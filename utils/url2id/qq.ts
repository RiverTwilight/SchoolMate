// e.g. https://i.y.qq.com/v8/playsong.html?songid=311047963#webchat_redirect
import Axios from "axios";

export default async (url) => {
    const realUrl = await Axios.get(url);
    console.log(realUrl);
};
