// import App from "next/app";
import Header from "../components/Header";
import Login from "../components/Login";
import GlobalContext from "../components/GlobalContext";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
    console.log(Component);
    const [userData, setUserData] = useState({});
    const [open, setOpen] = useState(false);
    useEffect(() => {
        fetch(`/api/getUserInfo`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.user) {
                    setUserData(data.user);
                } else {
                    setOpen(true);
                }
            });
    }, [Component]);
    const handleLoginClose = () => {
        setOpen(false);
    };
    const handleLogin = () => {
        setOpen(true);
    };
    return (
        <>
            <GlobalContext.Provider value={{ userData }}>
                <Header
                    userData={userData}
                    handleLogin={handleLogin}
                    // {...this.props}
                />
                <Login
                    cbUrl={`${123}`}
                    onClose={handleLoginClose}
                    open={open}
                />
                <Component {...pageProps} />
            </GlobalContext.Provider>
        </>
    );
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

export default MyApp;
