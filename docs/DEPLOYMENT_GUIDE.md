# Deployment Guide

To deploy LSCS v2 to the Chrome Web Store:

1. **Test Production Build**
   Run `npm run build` locally. Verify that the output in the `/dist` directory is minified and correctly bundles all background, content, and popup scripts.

2. **Verify Manifest Permissions**
   Ensure `manifest.json` requests only required host permissions. `activeTab` and `storage` are the primary permissions required.

3. **Package Extension**
   ZIP the contents of the `/dist` directory. Do not ZIP the root folder.
   `cd dist && zip -r ../lscs-v2-release.zip *`

4. **Upload to Chrome Web Store**
   - Go to Chrome Developer Dashboard.
   - Click "New Item".
   - Upload `lscs-v2-release.zip`.
   - Fill out the store listing details, attach screenshots, and justify the required permissions.

5. **Publish**
   Submit for review. The review process typically takes 1-3 days.
