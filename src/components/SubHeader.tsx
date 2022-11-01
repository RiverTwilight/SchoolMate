import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme: Theme) => {
    console.log(theme, theme.palette.primary)
    return createStyles({
        title: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
    })
})

const SubHeader: React.FC<{
    title: string
    handleAction?: () => void
}> = ({ title, handleAction }) => {
    const classes = useStyles()
    return (
        <AppBar elevation={0} color="inherit" position="static">
            <Toolbar>
                {handleAction && (
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        aria-label="open drawer"
                        onClick={handleAction}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                )}
                <Typography className={classes.title} variant="h6" noWrap>
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default SubHeader
