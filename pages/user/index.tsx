import React, { useState } from "react";
import Layout from "../../components/Layout";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { clearCookie } from "../../utils/cookies";

export async function getStaticProps() {
    const config = await import(`../../data/config.json`);

    return {
        props: {
            siteConfig: config.default,
            currentPage: {
                title: "用户中心",
                path: "/user",
            }
        },
    };
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});


/**
 * 用户中心
 * // TODO 修改密码
 */
const User = ({ userData }) => {
    const handleQuit = () => {
        clearCookie("TOKEN");
        location.href = "/"
    }
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {userData ? userData.name : "用户名"} - {""}
                        <Typography gutterBottom variant="subtitle1" component="span">
                            {userData ? `高${userData.grade}${['一', '二', '三', '四', '五', '六', '七', '八'][userData.class - 1]}班` : '高2019级八班'}
                        </Typography>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {userData ? userData.tel : "12345678910"}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    修改密码
        </Button>
                <Button size="small" color="primary" onClick={handleQuit}>退出
        </Button>
            </CardActions>
        </Card>
    )
}

const Page = ({ siteConfig, locale, currentPage, userData }) => {
    return (
        <Layout
            currentPage={currentPage}
            locale={locale}
            siteConfig={siteConfig}
        >
            <User userData={userData} />
        </Layout>
    );
};

export default Page;
