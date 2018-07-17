// This is an example of an environment file. This file should be copied to a
// new file, called "environment.mjs," and then it can be invoked as such:
//
// import config from "./environment";
//
// which provides the config object, so the apiKey can be gotten via:
//
// config().newsApiKey

export default function() {
  return {
    newsApiKey: "ba69330e8028431b8409c31ccab1913b"
  };
};
