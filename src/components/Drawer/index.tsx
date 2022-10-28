import React from 'react'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import ActiveLink from '@/components/AcitiveLink'
import GitHubIcon from '@material-ui/icons/GitHub'
import ArticleIcon from '@material-ui/icons/RssFeed'
import SupportIcon from '@material-ui/icons/ContactSupport'
import CommentIcon from '@material-ui/icons/Comment'
import Image from 'next/legacy/image'

interface DrawerProps {
    mobileOpen?: boolean
    setMobileOpen?: (state: boolean) => void
}

interface DrawerState {
    open: boolean
}

const drawerWidth = 220

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    copyright: {
        position: 'absolute',
        bottom: '20px',
        left: 0,
        right: 0,
    },
}))

const LeftMenu: React.FC<DrawerProps> = ({ mobileOpen, setMobileOpen }) => {
    const classes = useStyles()
    const theme = useTheme()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <Image src="/illustration/city.svg" width={200} height={100} />
            <List>
                {[
                    {
                        text: '投票广场',
                        href: '/',
                        icon: <InboxIcon />,
                    },
                    {
                        text: '新闻室',
                        href: '/newsroom',
                        icon: <ArticleIcon />,
                    },
                    {
                        text: '万能墙',
                        href: '/newsroom',
                        icon: <CommentIcon />,
                    },
                ].map((item, index) => (
                    <ActiveLink href={item.href} activeClassName="Mui-selected">
                        <ListItem href={item.href} button key={item.text}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    </ActiveLink>
                ))}
            </List>
            <Divider />
            <div className={classes.copyright}>
                {' '}
                <List>
                    {[
                        {
                            link: 'https://github.com/rivertwilight/cflsgxmate',
                            text: '开放源代码',
                            icon: <GitHubIcon />,
                        },
                        {
                            link: 'https://github.com/rivertwilight/cflsgxmate',
                            text: '获取支持',
                            icon: <SupportIcon />,
                        },
                    ].map((item, index) => (
                        <ListItem
                            component="a"
                            button
                            href={item.link}
                            key={index}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Typography color="textSecondary" align="center">
                    Made By RiverTwilight
                </Typography>
            </div>
        </div>
    )

    return (
        <nav className={classes.drawer} aria-label="drawer">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </nav>
    )
}

export default LeftMenu
