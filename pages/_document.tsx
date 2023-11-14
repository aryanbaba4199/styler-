// _document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <meta name="google-site-verification" content="google5d6bde75488aa843" />
        <meta name="msvalidate.01" content="07D0EE7A15FC1B6280F3A12F401BE094" />

          <link rel="icon" href="/favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
