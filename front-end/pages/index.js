import React from "react";
import PostItem from "../components/PostItem";
// import Marquee from "../components/Marquee";
import Tab from "../components/Tab";
import Layout from "../components/Layout";
import Link from "next/link";
import Text from "../utils/i18n";
import { postList } from "../data/i18n.json";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";

export async function getStaticProps({ locale, locales }) {

    const config = await import(`../data/config.json`);
    return {
        props: {
            siteConfig: config.default,
            locale,
        },
    };
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "all",
        };
    }
    render() {
        const { siteConfig, locale } = this.props;
        const { channel } = this.state;
        return (
            <Layout
                currentPage={{
                    text: "首页",
                    path: "/",
                }}
                config={siteConfig}
                locale={locale}
            >
                dsgdgf
            </Layout>
        );
    }
}

export default HomePage;
