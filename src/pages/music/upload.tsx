import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import clsx from 'clsx'
import ListItemText from '@material-ui/core/ListItemText'
import { useRouter } from 'next/router'
import parseFormData from '../../utils/parseFormData'
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import url2id from '../../utils/url2id/163'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import SubHeader from '@/components/SubHeader'
import Axios from 'axios'

const useStyles = makeStyles((theme: Theme) => {
    console.log(theme, theme.palette.primary)
    return createStyles({
        container: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        platform: {
            height: '80px',
            width: '100%',
            fontSize: '1.2rem',
            borderRadius: '5px',
            paddingLeft: '40px',
        },
        platformSelected: {
            fontWeight: 'bold',
            border: `2px solid ${theme.palette.primary.main}`,
        },
        bg: {
            position: 'absolute',
            transform: 'translate(-0%, -50%)',
            left: '5px',
            opacity: 0.5,
            top: '40px',
            width: '40px',
            height: ' 40px',
        },
        parseBtn: {
            transform: 'translate(-0%, 50%)',
            width: '100%',
        },
    })
})

export async function getServerSideProps(context) {
    const { id, title } = context.query

    return {
        props: {
            id,
            title,
            currentPage: {
                title: '歌曲投稿',
                path: '/music/add',
            },
        },
    }
}

const Platform = ({
    text,
    icon,
    selected,
    onClick,
    disabled,
}: {
    selected: boolean
    text: string
    icon: string
    disabled?: boolean
    onClick: () => void
}) => {
    const classes = useStyles()
    return (
        <Button
            onClick={() => {
                onClick && onClick()
            }}
            disabled={disabled}
            className={clsx(classes.platform, {
                [classes.platformSelected]: selected,
            })}
            variant="outlined"
        >
            <img className={classes.bg} src={icon} />
            {text}
        </Button>
    )
}

const AddMusic: React.FC<{
    userData: any
    id: string
    title: string
}> = ({ userData, id, title }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isParsing, setIsParsing] = useState(false)
    const [showDetailForm, setShowDetailForm] = useState(false)
    const [platform, setPlatform] = useState(0)

    const [songTitle, setSongTitle] = useState('')
    const [songAr, setSongAr] = useState('')
    const [songLrc, setSongLrc] = useState('')

    const router = useRouter()
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.target)
        Axios.post(
            '/api/music/uploadMusic',
            Object.assign(
                { id },
                parseFormData(
                    ['musicUrl', 'reason', 'title', 'artist', 'lyrics'],
                    formData
                )
            )
        )
            .then((res) => {
                switch (res.status) {
                    case 200:
                        window.snackbar({
                            message: res.data.message,
                        })
                        break
                    case 201:
                        router.push(`/music?id=${res.data.id}&title=${title}`)
                        break
                }
            })
            .catch(function (error) {
                console.warn(error)
            })
            .then(() => {
                setIsLoading(false)
            })
    }
    const handleBack = () => {
        router.back()
    }

    // TODO qq音乐

    const parseUrl = async () => {
        const formData = new FormData(form.current)
        const musicUrl = formData.get('musicUrl')
        const musicId = url2id(musicUrl)
        if (!musicId) {
            window.snackbar({ message: '链接不合法' })
        } else {
            switch (platform) {
                case 0:
                    setIsParsing(true)

                    let songId = url2id(musicUrl)

                    Axios.all([
                        Axios.get(
                            `https://netease-cloud-music-api-wine-alpha.vercel.app/lyric?id=${songId}`
                        ),
                        Axios.get(
                            `https://netease-cloud-music-api-wine-alpha.vercel.app/song/detail?ids=${songId}`
                        ),
                    ])
                        .then(
                            Axios.spread((...res) => {
                                console.log(res)
                                setSongTitle(res[1].data.songs[0].name)
                                setSongAr(
                                    res[1].data.songs[0].ar
                                        .map((ar) => ar.name)
                                        .join('/')
                                )
                                setSongLrc(
                                    res[0].data.nolyric
                                        ? '暂无歌词'
                                        : res[0].data.lrc.lyric
                                )
                            })
                        )
                        .catch((err) => {
                            window.snackbar({
                                message: '解析出错，请重试或者手动填写',
                            })
                        })
                        .then(() => {
                            setShowDetailForm(true)
                            setIsParsing(false)
                        })
                    break
                case 1:
                    // setIsParsing(true)

                    // let songId = url2id(musicUrl)

                    // Axios.all([
                    //     Axios.get(
                    //         `https://netease-cloud-music-api-wine-alpha.vercel.app/lyric?id=${songId}`
                    //     ),
                    //     Axios.get(
                    //         `https://netease-cloud-music-api-wine-alpha.vercel.app/song/detail?ids=${songId}`
                    //     ),
                    // ])
                    //     .then(
                    //         Axios.spread((...res) => {
                    //             console.log(res)
                    //             setSongTitle(res[1].data.songs[0].name)
                    //             setSongAr(
                    //                 res[1].data.songs[0].ar
                    //                     .map((ar) => ar.name)
                    //                     .join('/')
                    //             )
                    //             setSongLrc(
                    //                 res[0].data.nolyric
                    //                     ? '暂无歌词'
                    //                     : res[0].data.lrc.lyric
                    //             )
                    //         })
                    //     )
                    //     .catch((err) => {
                    //         window.snackbar({
                    //             message: '解析出错，请重试或者手动填写',
                    //         })
                    //     })
                    //     .then(() => {
                    //         setShowDetailForm(true)
                    //         setIsParsing(false)
                    //     })
                    break
                // http://api.qq.jsososo.com/song?songmid=0039MnYb0qxYhV
            }
        }
    }

    const classes = useStyles()
    const form = React.createRef()

    return (
        <Paper
            component={'form'}
            ref={form}
            className={classes.container}
            onSubmit={handleSubmit}
        >
            <SubHeader title={title} handleAction={handleBack} />
            <Typography color="textSecondary" variant="body1">
                将歌曲的平台链接粘贴到输入框中，我们将自动为您解析歌曲信息，无需手动填写。
            </Typography>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={6} sm={4}>
                    <Platform
                        onClick={() => {
                            setPlatform(0)
                        }}
                        selected={platform === 0}
                        icon="/image/netease.png"
                        text="网易云音乐"
                    />
                </Grid>
                <Grid item xs={6} sm={4}>
                    <Platform
                        onClick={() => {
                            setPlatform(1)
                        }}
                        selected={platform === 1}
                        icon="/image/qq_music.png"
                        text="QQ音乐"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={8}>
                    <FormControl fullWidth>
                        <TextField
                            type="url"
                            label="歌曲平台链接"
                            required
                            name="musicUrl"
                            // helperText="可通过分享-复制链接获得"
                        ></TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        disabled={isParsing}
                        onClick={parseUrl}
                        className={classes.parseBtn}
                        variant="outlined"
                    >
                        {isParsing ? '正在解析...' : '解析链接'}
                    </Button>
                </Grid>
            </Grid>
            <div
                style={{
                    display: showDetailForm ? 'block' : 'none',
                }}
            >
                <FormControl fullWidth>
                    <TextField
                        value={songTitle}
                        onChange={(e) => {
                            setSongTitle(e.target.value)
                        }}
                        label="歌曲名称"
                        name="title"
                        required
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        value={songAr}
                        onChange={(e) => {
                            setSongAr(e.target.value)
                        }}
                        type="text"
                        label="歌手"
                        name="artist"
                    ></TextField>
                </FormControl>
                <FormControl fullWidth>
                    <TextField
                        value={songLrc}
                        onChange={(e) => {
                            setSongLrc(e.target.value)
                        }}
                        multiline
                        type="text"
                        label="歌词"
                        rows={4}
                        name="lyrics"
                    ></TextField>
                </FormControl>
            </div>
            <br />
            <br />
            <FormControl fullWidth>
                <TextField
                    type="text"
                    label="投票理由"
                    rows={3}
                    multiline
                    name="reason"
                    required
                    variant="outlined"
                ></TextField>
            </FormControl>
            <br />
            <br />
            <List>
                <ListItem>
                    <ListItemIcon>
                        <InfoTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText secondary="每人每期只有一次投稿机会，歌曲一经上传无法撤回，若发现恶意投稿者将封禁账号，请慎重。" />
                </ListItem>
            </List>
            <Button
                disabled={isLoading}
                variant="contained"
                color="primary"
                type="submit"
            >
                确定
            </Button>
        </Paper>
    )
}

export default AddMusic
