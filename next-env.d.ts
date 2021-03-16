/// <reference types="next" />
/// <reference types="next/types/global" />


interface Window {
    scrollListener: any;
    snackbar: (config: {
        message: string
    }) => void;
}

type userInfoFromLocal = {
    grade: string;
    class: string;
    username: string;
    tel: number | string;
    admin: boolean
}

interface userInfoFromCloud extends userInfoFromLocal {
    token: string;
}

interface ICurrentPage {
    text: string,
    path: string
}

// 词典
type dictionary = {
    [dicIndex: string]: {
        [langIndex: number]: string
    }
};

type lang = 'zh' | 'en' | 'jp'

interface ISiteConfig {
    title: string,
    keywords: string[],
    description: string,
    author: {
        name: string,
        image?: string,
        intro: {
            title: string,
            content: string
        }[]
    }
}

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
