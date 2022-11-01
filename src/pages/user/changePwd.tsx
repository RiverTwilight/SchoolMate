import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { clearCookie } from '../../utils/cookies'
import siteConfig from '@/config/site'
import SubHeader from '@/components/SubHeader'

export async function getStaticProps() {
    return {
        props: {
            currentPage: {
                title: '用户中心',
                path: '/user',
            },
        },
    }
}

const useStyles = makeStyles({
    root: {
        padding: '20px',
    },
    media: {
        height: 140,
    },
    formItem: {
        marginBottom: '20px',
        maxWidth: '500px',
        minWidth: '300px',
        display: 'block',
    },
})

const ChangePwd = () => {
    const [oldPwd, setOldPwd] = useState('')
    const [newPwd, setNewPwd] = useState('')

    const handleSubmit = () => {
        console.log(oldPwd, newPwd)
    }

    const classes = useStyles()

    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return (
        <>
            <SubHeader handleAction={handleBack} title="修改密码" />
            <Card className={classes.root}>
                <FormControl className={classes.formItem}>
                    <TextField
                        value={oldPwd}
                        onChange={(e) => {
                            setOldPwd(e.target.value)
                        }}
                        type="password"
                        variant="outlined"
                        label="旧密码"
                        name="oldPwd"
                        required
                    ></TextField>
                </FormControl>
                <FormControl className={classes.formItem}>
                    <TextField
                        value={newPwd}
                        onChange={(e) => {
                            setNewPwd(e.target.value)
                        }}
                        variant="outlined"
                        type="password"
                        label="新密码"
                        name="newPwd"
                        required
                    ></TextField>
                </FormControl>
                <Button variant="outlined" onClick={handleSubmit}>
                    确认
                </Button>
            </Card>
        </>
    )
}

export default ChangePwd
