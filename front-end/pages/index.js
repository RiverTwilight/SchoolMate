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

const MusicItem = ({
    title,
}) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
        </Typography>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
        </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
          <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">投票</Button>
            </CardActions>
        </Card>
    )
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "all",
            data: [
                {
                    title: "第一周投票",
                    tickets: 4
                }
            ]
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
                {data.length && data.map((item, i) => <MusicItem {...item} />)}
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
