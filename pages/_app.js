import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import '../styles/bigCard.css'
import ProgressBar from "@badrap/bar-of-progress";
import Router from 'next/router';
import { AuthProvider } from "../contexts/AuthContext";

const progress = new ProgressBar({
  size:5,
  color:"#FE595E",
  className: "z-50",
  delay:40,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp({ Component, pageProps }) {
  return(
  <>
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  </>
)
}

export default MyApp
