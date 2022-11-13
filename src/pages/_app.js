// import App from "next/app";
import Header from '../components/Header'
import Footer from '../components/Footer'
import Login from '../components/Login'
import GlobalContext from '../components/GlobalContext'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../components/Layout'
import './App.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        background: '#f6f6f6',
        justifyContent: 'center',
    },
    content: {
        flexGrow: 0.9,
        position: 'relative',
    },
    route: {
        maxWidth: '900px',
        minHeight: '90vh',
        padding: '8px',
    },
    toolbar: theme.mixins.toolbar,
}))

function MyApp({ Component, pageProps }) {
    const {
        currentPage = {
            title: '404',
        },
        siteConfig,
        locale,
    } = pageProps
    // console.log(currentPage);
    const classes = useStyles()
    const [userData, setUserData] = useState({})
    const [open, setOpen] = useState(false)
    useEffect(() => {
        !!!userData.name &&
            fetch(`/api/userInfo`, { method: 'GET' })
                .then((res) => res.json())
                .then(({ data }) => {
                    console.log(data)
                    if (data) {
                        setUserData(data)
                    } else {
                        // setOpen(true);
                    }
                })
    }, [Component])
    const handleLoginClose = () => {
        setOpen(false)
    }
    const handleLogin = () => {
        setOpen(true)
    }
    return (
        <>
            <GlobalContext.Provider value={{ userData }}>
                <Layout
                    siteConfig={siteConfig}
                    locale={locale}
                    currentPage={currentPage}
                >
                    <div className={classes.root}>
                        <Header
                            userData={userData}
                            handleLogin={handleLogin}
                            title={currentPage.title}
                        />
                        <Login
                            cbUrl={`${currentPage.path}`}
                            onClose={handleLoginClose}
                            open={open}
                        />
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            <div className={classes.route}>
                                <Component userData={userData} {...pageProps} />
                            </div>
                            {/* <Footer /> */}
                        </main>
                    </div>
                </Layout>
            </GlobalContext.Provider>
        </>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     console.log(appProps);

//     return { ...appProps };
// };

export default MyApp
