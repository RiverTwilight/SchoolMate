import React from "react";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CallIcon from "@material-ui/icons/Call";
import { Grade } from "../../data/school.json";
import { setUserInfo } from "../../utils/userInfo";
import MD5 from "md5";
import Axios from 'axios';

class Login extends React.Component<
    {
        cbUrl: string
    },
    {
        username: string;
        password: string;
        remember: boolean;
        xcode: string;
        showPassword: boolean;
        classNum: unknown;
        grade: number;
        tel: number | string;
    }
    > {
    constructor(props: any) {
        super(props);
        this.state = {
            username: "",
            password: /*'123456',*/ "",
            grade: 2019,
            classNum: 8,
            remember: false,
            tel: "",
            xcode: "",
            showPassword: false,
        };
    }
    login() {
        const { username, grade, classNum, tel, password, remember } = this.state
        const { cbUrl } = this.props
        Axios({
            method: "post",
            url: "/api/login",
            withCredentials: false,
            data: {
                username,
                classNum,
                grade,
                tel,
                password
            },
        })
            .then((response) => {
                var json = JSON.parse(response.request.response);
                switch (json.code) {
                    case 201:
                        window.snackbar({ message: "账号或密码错误" });
                        break;
                    case 200:
                        var data = JSON.stringify(json.data);
                        setUserInfo(json.token, data, remember);
                        window.location.href = cbUrl;
                        break;
                }
            })
            .catch((e) => {
                window.snackbar({ message: e });
            })
            .then(() => {
                // window.loadHide();
            });
    }
    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };
    handleGradeChange = (e) => {
        this.setState({
            grade: e.target.value
        })
    };
    handleClassChange = (e: React.ChangeEvent<{
        name?: string;
        value: unknown;
    }>) => {
        this.setState({
            classNum: e.target.value
        })
    };

    render() {
        const {
            password,
            username,
            grade,
            classNum,
            tel,
            remember,
            showPassword,
        } = this.state;
        return (
            <>
                <DialogContent>
                    <FormControl>
                        <InputLabel id="grade-label">
                            年级
						</InputLabel>
                        <Select
                            labelId="grade-label"
                            id="grade"
                            value={grade}
                            onChange={this.handleGradeChange}
                        >
                            {Grade.map(({ value, text }) => (
                                <MenuItem key={value} value={value}>
                                    {text}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="class-label">
                            班级
						</InputLabel>
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
                                    <MenuItem key={i} value={i}>
                                        {`${i}班`}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl fullWidth>
                        <InputLabel htmlFor="username">姓名</InputLabel>
                        <Input
                            onChange={(e) => {
                                this.setState({
                                    username: e.target.value,
                                });
                            }}
                            value={username}
                            id="username"
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
                        <InputLabel htmlFor="username">电话</InputLabel>
                        <Input
                            onChange={(e) => {
                                this.setState({
                                    tel: e.target.value,
                                });
                            }}
                            value={tel}
                            id="tel"
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
                                });
                            }}
                            placeholder="初始密码为123456"
                            value={password}
                            id="password"
                            type={showPassword ? "text" : "password"}
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
                    <FormControlLabel
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
                    />
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
        );
    }
}

const LoginDialog = (props: any) => {
    return (
        <Dialog {...props}>
            <DialogTitle id="simple-dialog-title">登录</DialogTitle>
            <Login cbUrl={props.cbUrl} />
        </Dialog>
    );
};

export default LoginDialog;
