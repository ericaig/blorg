import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
