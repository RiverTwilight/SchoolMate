import React from 'react'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import CallIcon from '@material-ui/icons/Call'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, withStyles } from '@material-ui/core/styles'
import { Grade } from '@/data/school.json'
import { setCookie, clearCookie } from '../../utils/cookies'
import sha256 from 'crypto-js/sha256'
import Axios from 'axios'
import { green } from '@material-ui/core/colors'

const styles = createStyles((theme) => ({
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

class Login extends React.Component<
    {
        cbUrl: string
    },
    {
        name: string
        password: string
        remember: boolean
        xcode: string
        showPassword: boolean
        classNum: unknown
        grade: number
        tel: number | string
    }
> {
    constructor(props: any) {
        super(props)
        this.state = {
            name: '',
            password: /*'123456',*/ '',
            grade: 2020,
            classNum: 3,
            remember: false,
            tel: '',
            xcode: '',
            showPassword: false,
        }
    }
    login() {
        const { name, grade, classNum, tel, password, remember } = this.state
        const { cbUrl } = this.props
        Axios({
            method: 'post',
            url: '/api/login',
            withCredentials: false,
            data: {
                name,
                classNum,
                grade,
                tel,
                password: sha256(password) + '',
            },
        })
            .then((response) => {
                var json = JSON.parse(response.request.response)
                switch (response.status) {
                    case 202:
                        window.snackbar({ message: json.message })
                        break
                    case 200:
                        setCookie('TOKEN', json.token, 10)
                        window.location.href = cbUrl
                        break
                }
            })
            .catch((e) => {
                window.snackbar({ message: e })
            })
            .then(() => {
                // window.loadHide();
            })
    }
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        })
    }
    handleGradeChange = (e) => {
        this.setState({
            grade: e.target.value,
        })
    }
    handleClassChange = (
        e: React.ChangeEvent<{
            name?: string
            value: unknown
        }>
    ) => {
        this.setState({
            classNum: e.target.value,
        })
    }

    render() {
        const { password, name, grade, classNum, tel, remember, showPassword } =
            this.state
        return (
            <>
                <DialogContent>
                    <FormControl>
                        <InputLabel id="grade-label">年级</InputLabel>
                        <Select
                            labelId="grade-label"
                            id="grade"
                            value={grade}
                            onChange={this.handleGradeChange}
                        >
                            {Grade.filter((grade) => !grade.hidden).map(
                                ({ value, text }) => (
                                    <MenuItem key={value} value={value}>
                                        {text}
                                    </MenuItem>
                                )
                            )}
                        </Select>
                    </FormControl>
                    &nbsp;
                    <FormControl>
                        <InputLabel id="class-label">班级</InputLabel>
                        <Select
                            labelId="class-label"
                            id="class"
                            value={classNum}
                            onChange={this.handleClassChange}
                        >
                            {Array(
                                Grade.filter((g) => g.value === grade)[0].class
                            )
                                .fill(0)
                                .map((_, i) => (
                                    <MenuItem key={i + 1} value={i + 1}>
                                        {`${i + 1}班`}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="name">姓名</InputLabel>
                        <Input
                            onChange={(e) => {
                                this.setState({
                                    name: e.target.value,
                                })
                            }}
                            value={name}
                            id="name"
                            placeholder="你的真实姓名"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br></br>
                    <br></br>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="tel">考号（可选）</InputLabel>
                        <Input
                            onChange={(e) => {
                                this.setState({
                                    tel: e.target.value,
                                })
                            }}
                            value={tel}
                            id="tel"
                            placeholder="例如：201908071"
                            startAdornment={
                                <InputAdornment position="start">
                                    <CallIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <br></br>
                    <br></br>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="password">密码</InputLabel>
                        <Input
                            onChange={(e) => {
                                this.setState({
                                    password: e.target.value,
                                })
                            }}
                            placeholder="初始密码为123456"
                            value={password}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                                <InputAdornment position="start">
                                    <VpnKeyIcon />
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    {/* <FormControlLabel
						control={
							<Checkbox
								checked={remember}
								onChange={(e) => {
									this.setState({
										remember: e.target.checked,
									});
								}}
								name="remember"
								color="primary"
							/>
						}
						label="下次自动登录"
					/> */}
                </DialogContent>
                <DialogActions>
                    {/* <Button
                        onClick={() => {
                            window.open("/user/forget");
                        }}
                    >
                        忘记密码
					</Button> */}
                    <Button onClick={this.login.bind(this)}>登录</Button>
                </DialogActions>
            </>
        )
    }
}

const LoginDialog = (props: any) => {
    return (
        <Dialog {...props}>
            <DialogTitle id="simple-dialog-title">登录</DialogTitle>
            <Login cbUrl={props.cbUrl} />
        </Dialog>
    )
}

export default LoginDialog
