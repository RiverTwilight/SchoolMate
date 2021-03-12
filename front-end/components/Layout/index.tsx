import React from "react";
import Head from "next/head";
import Header from "../Header";
import {
    createStyles,
    Theme,
    withStyles,
    makeStyles,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../utils/theme";

const styles = (theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(1),
            paddingTop: "75px",
            minHeight: "100vh",
            position: "relative",
            maxWidth: "1000px"
        }
    })
}

// TODO RSS
class Layout extends React.Component<
    {
        /**网站配置 */
        config: ISiteConfig;
        /** 当前页面 */
        currentPage: ICurrentPage;
        /**目录 */
        catalog?: any[];
        locale?: string;
        classes: any;
    },
    {
    }
    > {
    constructor(props) {
        super(props);
    }
    render() {
        const { config, currentPage, catalog, locale, classes } = this.props;
        const { description, author, title } = config;
        const showTitle = `${
            currentPage ? `${currentPage.text} - ` : ""
            }${title}`;
        const childrenWithProps = React.Children.map(
            this.props.children,
            (child) => {
                // checking isValidElement is the safe way and avoids a typescript error too
                const props = { locale };
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, props);
                }
                return child;
            }
        );
        return (
            <ThemeProvider
                theme={theme({})}
            >
                <Head>
                    <meta name="description" content={description} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={showTitle} />
                    <meta
                        property="og:url"
                        content="https://ygk-blog.yunser.com"
                    />
                    <meta property="og:site_name" content={showTitle} />
                    <meta property="og:description" content={description} />
                    <meta property="og:locale" content="zh_CN" />
                    <meta property="article:author" content={author.name} />
                    <meta property="article:tag" content={author.name} />
                    <meta property="article:tag" content={showTitle} />
                    <meta name="google-site-verification" content="3yqvRLDwkcm7nwNQ5bSG06I4wQ5ASf23HUtcyZIaz3I" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="viewport" content="viewport-fit=cover" />
                    <meta
                        name="viewport"
                        content="width=device-width,initial-scale=1,maximum-scale=1,user-scaleable=0"
                    />
                    <title>{showTitle}</title>
                </Head>
                <main className={classes.root}>
                    <Header lang={locale} {...this.props} />
                    <div className={classes.content}>{childrenWithProps}</div>
                </main>
            </ThemeProvider>
        );
    }
}

export default withStyles(styles)(Layout);
