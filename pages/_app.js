import "../styles/globals.css";

//Internal Import

import{NavBar, Footer} from '../Components';

export default function App({ Component, pageProps }) {
  return (
   <>
   <NavBar />
   <Component {...pageProps}/>
   <Footer/>
   </>
  );
}
