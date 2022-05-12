import Head from 'next/head';
import Login from '../auth/Login';
import SignIn from '../auth/SignIn';
import { Navbar, SideMenu } from '../ui';


export const MainLayout = ({ children, title, pageDescription }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>

            <meta name="description" content={ pageDescription } />
            
            
            <meta name="og:title" content={ title } />
            <meta name="og:description" content={ pageDescription } />
{/* 
            {
                imageFullUrl && (
                    <meta name="og:image" content={ imageFullUrl } />
                )
            } */}

        </Head> 

        <nav>
            <Navbar />
        </nav>

        <SideMenu />
        <main>
            { children }
            <Login/>
            <SignIn/>
        </main>

        {/* Footer */}
        <footer>
            {/* TODO: mi custom footer */}
        </footer>

    </>
  )
}


