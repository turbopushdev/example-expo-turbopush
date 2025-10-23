# Turbopush Expo Demo

Complete example application demonstrating Turbopush integration with Expo, allowing you to test over-the-air (OTA) updates in minutes.

## 📋 What you will find here

- **Pre-built APK** - Ready-to-test APK via QR Code, no building required
- Publish OTA updates to your app
- Test the speed of update distribution to your users
- Troubleshooting tips for common issues

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/turbopushdev/example-expo-turbopush.git
cd example-expo-turbopush
```

### 2. Install Dependencies

**With npm:**
```bash
npm install
```

**With yarn:**
```bash
yarn install
```

### 3. Log in to Turbopush

> **Tip:** If you already did this before, you can skip this step.

**With npm:**
```bash
npx turbopush login
```

**With yarn:**
```bash
yarn turbopush login
```

This will open your browser for authentication. After authenticating, you can close the browser and continue with the next steps.

### 4. Create an App on Turbopush

**With npm:**
```bash
npx turbopush app add <app-name-android>
```

**With yarn:**
```bash
yarn turbopush app add <app-name-android>
```

**Important:** Copy the **Staging Deployment Key** and keep it handy, you'll need it in the next steps.

### 5. Install the App

#### Option A: QR Code (Recommended for quick testing)

> **Want to test without building?** We have a pre-built APK ready for you.

1. Scan the QR Code provided in the [official documentation](https://docs.turbopush.org/examples/expo/#5-install-app)
2. Install the app on your device
3. Skip to step 6

#### Option B: Build from Scratch

1. Copy the environment variables example file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and paste the **Staging Deployment Key** you copied in step 4.

3. Build and run the app:

   **Android (npm):**
   ```bash
   npm run android -- --variant Release
   ```

   **Android (yarn):**
   ```bash
   yarn android --variant Release
   ```

   **iOS (npm):**
   ```bash
   npm run ios -- --configuration Release
   ```

   **iOS (yarn):**
   ```bash
   yarn ios --configuration Release
   ```

### 6. Configure Deployment Key

Paste the **Staging Deployment Key** you copied in step 4 into the `.env` file:

Use different deployment keys for Android and iOS.

```env
EXPO_PUBLIC_CODE_PUSH_KEY_ANDROID=your-key-here
EXPO_PUBLIC_CODE_PUSH_KEY_IOS=your-key-here
```

### 7. Test an Over-the-Air Update

Now let's publish an update to test the OTA functionality:

1. Make a change in the **`src/app/playground.tsx`** file, in the `config` object at the top of the file.

2. Publish the update using the Turbopush CLI:

   **With npm:**
   ```bash
   npx turbopush release-expo <app-slug> android 1.0.0 -d Staging --mandatory
   ```

   **With yarn:**
   ```bash
   yarn turbopush release-expo <app-slug> android 1.0.0 -d Staging --mandatory
   ```

   > **Note:** Replace `<app-slug>` with your app slug (defined in `app.config.ts`: `turbopush-expo-demo`)

3. Click the **"sync"** button in the initial screen.

4. Watch the update download and install automatically!

5. Click the **"Playground"** button in the initial screen to see the change you made.

6. That's it! 🎉 You've successfully published an update to your app and tested it over-the-air.

## 📱 Project Structure

```
src/
├── app/
│   ├── _layout.tsx       # Main layout (stack navigation)
│   ├── index.tsx         # Home screen with sync and playground buttons
│   └── playground.tsx    # Demo screen to test updates
├── components/
│   └── logger.tsx        # Logger component
├── useCodepush/
│   └── index.tsx         # Custom hook for Turbopush
└── storage.ts            # Storage with MMKV to persist the deployment key
```

## 🐛 Troubleshooting

### Updates not appearing?

1. Check that the update's target binary version matches your app version
2. Verify your deployment keys are correct in the `.env` file
3. Check the logs in screen to see if there are any errors

### build failing?

Try running prebuild again:
   ```bash
   yarn prebuild --clean
   ```

### Still not working?

[Open an issue](https://github.com/turbopushdev/example-expo-turbopush/issues) or check the [official documentation](https://docs.turbopush.org).

## 📚 Next Steps

- [Official Turbopush Documentation](https://docs.turbopush.org)
- Getting started [Turbopush](https://docs.turbopush.org/)
- Learn about [releasing updates](https://docs.turbopush.org/cli/releasing-updates/overview)
- See how to [rollback updates](https://docs.turbopush.org/cli/rolling-back-updates)

---

Built with ❤️ using [Turbopush](https://turbopush.org)
