import React from "react";
import Layout from "../../components/Layout";

export async function getServerSideProps(context) {
    console.log(context)
    const config = await import(`../../data/config.json`);

    return {
        props: {
            siteConfig: config.default
        },
    }
}

/**
 * 投票详情
 */

const Music = ({ id, siteConfig, locale }) => {
    console.log(siteConfig)
    return (
        <Layout
            currentPage={{
                text: "",
                path: "/music/" + id,
            }}
            locale={locale}
            config={siteConfig}
        >

        </Layout>
    );
};

export default Music;
