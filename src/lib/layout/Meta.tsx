import { Helmet } from "react-helmet";

const APP_NAME = "Gnars App";

const Meta = () => {
  return (
    <Helmet>
      <title>{APP_NAME}</title>
      <meta name="description" content="Gnarly App" />

      <meta name="application-name" content={APP_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={APP_NAME} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#228B22" />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={APP_NAME} />
      <meta property="og:description" content="Skateboarders App" />
      <meta property="og:image" content="https://www.gnars.wtf/images/logo.png" />
      <meta property="og:url" content="https://stoken.wtf" />
      <meta property="og:type" content="website" />
      <meta property="twitter:image" content="https://www.gnars.wtf/images/logo.png" />
      <meta property="twitter:description" content="Gnaly Social Media"></meta>

      <link rel="shortcut icon" href="https://www.gnars.wtf/images/logo.png" />
      <link rel="manifest" href="./manifest.json" />
    </Helmet>
  );
};

export default Meta;
