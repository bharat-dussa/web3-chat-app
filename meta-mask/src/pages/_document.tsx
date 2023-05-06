import Document, { Html, Head, Main, NextScript } from "next/document";

import { AppConfig } from "../utils/app-config";
import { Footer } from "../components/footer/footer.compoenent";

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
          <Footer />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
