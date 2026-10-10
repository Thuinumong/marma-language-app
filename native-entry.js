// Bundled into www/native.js by the Android build. Lets the app open Google/Facebook login
// in the phone's real browser and catch the "come back to the app" link.
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

window.NativeAuth = {
  open: (url) => Browser.open({ url }),
  onUrl: (cb) =>
    App.addListener('appUrlOpen', (e) => {
      try { Browser.close(); } catch (x) {}
      cb(e.url);
    })
};
