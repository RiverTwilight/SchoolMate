import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Text from "../utils/i18n";
import Card from "@material-ui/core/Card";

export async function getStaticProps({ locale, locales }) {
    const config = await import(`../data/config.json`);
    return {
        props: {
            siteConfig: config.default,
            locale,
        },
    };
}

const MusicItem = () => {
    return null
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "all",
        };
    }
    componentDidMount(){
        // TODO 获取后台数据
    }
    render() {
        const { siteConfig, locale } = this.props;
        const { channel } = this.state;
        return (
            <Layout
                currentPage={{
                    text: "起床铃投稿",
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
