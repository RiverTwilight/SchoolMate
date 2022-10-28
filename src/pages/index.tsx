import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Loader from '../components/Loader'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Link from 'next/link'
import clsx from 'clsx'
import zIndex from '@material-ui/core/styles/zIndex'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        display: 'flex',
        justifyContent: 'space-between',
    },
    sortOption: {
        width: '100%',
        padding: '10px 20px',
        borderRadius: '5px',
    },
    content: {
        boxShadow: 'white 9px -1px 11px 3px',
        zIndex: 2,
    },
    cover: {
        width: 140,
        zIndex: 1,
        '& img': {
            backgroundPosition: 'cover',
        },
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
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
})

const fetcher = (url) => fetch(url).then((res) => res.json())

export function getStaticProps() {
    return {
        props: {
            currentPage: {
                title: '首页',
                path: '/',
            },
        },
    }
}

const MusicItem = ({ title, description, id, status }) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <div className={classes.content}>
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
                    <Button
                        component={Link}
                        href={`/music?id=${id}&title=${title}`}
                        disabled={status != 0}
                        variant="outlined"
                        size="large"
                    >
                        {
                            {
                                0: '参与',
                                1: '已结束',
                            }[status]
                        }
                    </Button>
                </CardActions>
            </div>
            <CardMedia
                className={classes.cover}
                image="/illustration/music.svg"
                title="Live from space album cover"
            />
        </Card>
    )
}

const HomePage = ({ userData }) => {
    const [data, setData] = useState({
        isLoading: true,
    })

    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('createDate')

    const handleSortChange = (e) => {
        setSort(e.target.value)
    }

    // See https://stackoverflow.com/questions/63570597/typeerror-func-apply-is-not-a-function
    useEffect(() => {
        // TODO 分页
        // TODO 防止返回数据异常 TypeError: Cannot read property 'length' of undefined
        ;(async () => {
            const res = await fetcher(
                `/api/music/getVoteList?page=${page}$sort=${sort}`
            )
            res.data && setData(res.data)
        })()
    }, [sort, page])

    const classes = useStyles()

    return (
        <>
            <div className={classes.actions}>
                {userData && !!userData.isAdmin && (
                    <Link href="/music/create">
                        <Button color="primary" variant="contained">
                            创建投票
                        </Button>
                    </Link>
                )}
                <div className={clsx(classes.sortOption, 'MuiButton-outlined')}>
                    <FormControl className={classes.formControl}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            onChange={handleSortChange}
                        >
                            <MenuItem value={'createDate'}>创建日期</MenuItem>
                            <MenuItem value={'hot'}>热度</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

            <br />

            <Grid container spacing={3}>
                {!!data.length &&
                    data.map((item, i) => (
                        <Grid xs={12} sm={6} item>
                            <MusicItem key={i} {...item} />
                        </Grid>
                    ))}
            </Grid>
            {JSON.stringify(data) === '[]' && (
                <Typography align="center" variant="h5" color="textSecondary">
                    暂时没有投票
                </Typography>
            )}
            {!!data.isLoading && (
                <Grid container spacing={3}>
                    {Array(4)
                        .fill(0)
                        .map(() => (
                            <Grid xs={12} sm={6} item>
                                <Loader />
                            </Grid>
                        ))}
                </Grid>
            )}
        </>
    )
}

export default HomePage
