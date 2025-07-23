# Jambofy Browser Extension

![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white)
![Mozilla Firefox](https://img.shields.io/badge/Mozilla%20Firefox-FF7139?style=for-the-badge&logo=Firefox&logoColor=white)
![Opera](https://img.shields.io/badge/Opera-FF1B2D?style=for-the-badge&logo=Opera&logoColor=white)

![Chrome Web Store Last Updated](https://img.shields.io/chrome-web-store/last-updated/ecbedadooalalcgolmfgpnmphhccegei)
![Chrome Web Store Users](https://img.shields.io/chrome-web-store/users/ecbedadooalalcgolmfgpnmphhccegei)
![Chrome Web Store Rating Count](https://img.shields.io/chrome-web-store/rating-count/ecbedadooalalcgolmfgpnmphhccegei)
![Chrome Web Store Stars](https://img.shields.io/chrome-web-store/stars/ecbedadooalalcgolmfgpnmphhccegei?label=stars)

<p align="center">
  <img src="https://lh3.googleusercontent.com/Nw4bhfjeIqi9gXZXH1Jv9Qr7_oQb5ziM1r_yPh-PTZawSAan3M77cxazYB0CmR-nhlZIrAfrXB7JqXvcWJ4JkZK4=w640-h400-e365-rj-sc0x00ffffff" alt="Jambofy Image" width = "800" height="500" style="align-items=center; justify-content=center;" />
</p>

Programmed by [Liam](https://www.linkedin.com/in/liam-t-harrison/)

Ported to Firebox/Safari by [Sander](https://www.linkedin.com/in/sandercvonk)

Photoshopping and videos by [Peam](https://www.youtube.com/@Sopeamy)

This extension was originally made as a submission for Jshlatt's Shark Tank Pitch Stream in late 2023.

## Links
- Video: https://youtu.be/H5iqrUr4uYk?si=b0lR5J_ZlHQQlp2p
- Chrome Web Store: https://chromewebstore.google.com/detail/jambofy/ecbedadooalalcgolmfgpnmphhccegei

## Browser Compatibility

### Chrome/Chromium-based browsers
- Uses service worker background context
- Available on [Chrome Web Store](https://chromewebstore.google.com/detail/jambofy/ecbedadooalalcgolmfgpnmphhccegei)

### Firefox
- Uses background scripts context
- To install manually:
  1. Download or clone this repository
  2. Open Firefox and go to `about:debugging`
  3. Click "This Firefox"
  4. Click "Load Temporary Add-on"
  5. Select the `manifest.json` file

### Safari (Temporary - does not persist after quitting)
- Supports both contexts, will use service worker by default
- To install manually/temporarily:
  1. Download or clone this repository
  2. Open Safari's Settings->Developer menu
  3. Under "Extensions", check "Allow unsigned extensions" and press "Add Temporary Extension..."
  4. Select the folder that contains `manifest.json` and click "Open"
  5. Open YouTube, and if prompted, allow access by clicking on the extension icon to the left of the address bar

## Inspiration
The idea for this extension was inspired by the MrBeastify extension:
https://chromewebstore.google.com/detail/youtube-mrbeastify/dbmaeobgdodeimjdjnkipbfhgeldnmeb
