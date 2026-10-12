MARMA LANGUAGE - ALL-IN-ONE UPDATE
===================================
Ei zip-er sob file repo-r ROOT e copy koro (same naam-er file replace hobe):

  index.html            -> Word tab grid fix + iPhone/iOS meta tags + notun icon link
  manifest.json         -> notun logo diye PWA manifest
  icon-32/192/512.png, icon-maskable-192/512.png, apple-touch-icon.png
  android-res/          -> Android home-screen icon (sob size)
  .github/workflows/android.yml -> icon step soho APK build workflow
  extras/play-store-512.png     -> pore Play Store lagle (repo te dite hobe na)

Tarpor:
1. Commit & push (main branch) -> GitHub Actions APK build kore.
2. sw.js e cache version ekta bariye dao (jemon marma-v3 -> marma-v4).
3. Android: notun APK install koro (same key, tai purono app-er upor update hobe).
4. iPhone: Safari e website kholo -> Share -> Add to Home Screen.
