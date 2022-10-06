import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
