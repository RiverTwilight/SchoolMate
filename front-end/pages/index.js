import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Text from "../utils/i18n";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export async function getStaticProps({ locale, locales }) {
    const config = await import(`../data/config.json`);
    return {
        props: {
            siteConfig: config.default,
            locale,
        },
    };
}

/**
 * 投票项目
 * @param {string} title 标题
 * @param {string} subscription 描述
 * @param {number} id ID
 */
const MusicItem = ({
    title,
    subscription,
    id
}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    学生会发起的
        </Typography>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {subscription}
                </Typography>
                <Typography variant="body2" component="p">
                    {subscription}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={`/music/?id=${id}`}>
                    <Button size="small">投票</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

const MOCK_DATA = [
    {
        title: "第一周投票",
        tickets: 4,
        id: 1
    }
]

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "all",
            data: MOCK_DATA
        };
    }
    componentDidMount() {
        // TODO 获取后台数据
    }
    render() {
        const { siteConfig, locale } = this.props;
        const { data } = this.state;
        return (
            <Layout
                currentPage={{
                    text: "起床铃投稿",
                    path: "/",
                }}
                config={siteConfig}
                locale={locale}
            >
                {data.length && data.map((item, i) => <MusicItem key={i} {...item} />)}
                {!data.length && (
                    <Typography align="center" variant="h5" color="textSecondary">
                        暂时没有投票
                    </Typography>
                )}
            </Layout>
        );
    }
}

export default HomePage
