import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        height: 190,
        display: 'flex',
        justifyContent: 'space-between',
    },
    content: {
        boxShadow: 'white 9px -1px 11px 3px',
        zIndex: 2,
    },
    textContent: {
        height: 100,
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
})

const VoteItem: React.FC<{
    title: string
    description: string
    status: 'OPEN' | 'CLOSED'
    id: string
}> = ({ title, description, id, status }) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <div className={classes.content}>
                <CardContent className={classes.textContent}>
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
                        disabled={status === 'CLOSED'}
                        variant="outlined"
                        size="large"
                    >
                        {
                            {
                                OPEN: '参与',
                                CLOSED: '已结束',
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

export default VoteItem
