// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  CHAT_SECRET:  "oauth:swgyfzqin7dza6rpgg9ygow4un9vis",
  TWITCH_LOGIN_URL : "https://id.twitch.tv",
  TWITCH_API_URL : "https://api.twitch.tv",
  TWITCH_WSS_URL : "wss://irc-ws.chat.twitch.tv:443",

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
