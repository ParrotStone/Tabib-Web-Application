import * as Sentry from "@sentry/browser";

const init = () => {
  // Change the (debug - environment) variables upon staging/releasing the app
  const options = {
    dsn: "https://03d3cb6d685d4e8099029bc1e5bbcf20@sentry.io/5189489",
    release: "Tabib@1.0.0",
    debug: true,
    environment: "development",
  };

  Sentry.init(options);
};

const log = (error) => {
  // Logging the error to Sentry cloud service
  Sentry.captureException(error);
};

export default {
  init,
  log,
};
