import React, { useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import Text from "../utils/i18n";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const fetcher = (url) => fetch(url).then((res) => res.json());

export async function getServerSideProps({ locale, locales }) {
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
 * @param {string} description 描述
 * @param {number} id ID
 */
const MusicItem = ({ title, description, id, statu }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    由
					<Typography variant="inherit" color="primary">
                        学生会
					</Typography>
					发起的
				</Typography>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={`/music?id=${id}`}>
                    <Button disabled={statu != 0} variant="outlined" size="large">
                        {{
                            '0': '投票',
                            '1': '已结束'
                        }[statu]}
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: "all",
            data: [],
        };
    }
    async componentDidMount() {
        fetch(`/api/music/getMusicList`)
            .then((res) => res.json())
            .then((data) => {
                this.setState({ data: data.data.list });
            });
    }
    render() {
        const { siteConfig, locale } = this.props;
        const { data } = this.state;
        return (
            <Layout
                currentPage={{
                    text: "成高生活圈",
                    path: "/",
                }}
                config={siteConfig}
                locale={locale}
            >
                <Grid container spacing={3}>
                    {data.length &&
                        data.map((item, i) => (
                            <Grid xs={12} sm={6} item>
                                <MusicItem key={i} {...item} />
                            </Grid>
                        ))}
                </Grid>

                {data.length === 0 && (
                    <Typography
                        align="center"
                        variant="h5"
                        color="textSecondary"
                    >
                        暂时没有投票
                    </Typography>
                )}
            </Layout>
        );
    }
}

export default HomePage;
