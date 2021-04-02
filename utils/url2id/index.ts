const url2Id = (url: any) => {
    const pattweb = /id=(\d+)/,
        pattmob = /\/(playlist)\/(\d+)\//,
        pattid = /^\d+$/;

    if (url.search(pattid) !== -1) return url; //如果是纯数字(id)

    if (url.search(pattmob) !== -1 || url.search(pattweb) !== -1) {
        if (url.search(pattmob) !== -1) {
            //类似http://music.163.com/playlist/10222067/11720510/?userid=11720510的链接
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            return pattmob.exec(url)[2];
        } else {
            //类似https://music.163.com/#/my/m/music/playlist?id=2995734275的链接
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            return pattweb.exec(url)[1];
        }
    } else {
        //既不是ID，又不是合法链接
        return false;
    }
};

export default url2Id