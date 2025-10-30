# YCKF Mobile App Documentation

This document bundle contains the full documentation for the YCKF Mobile App submission: README, Implementation Guide, and Deployment & Maintenance instructions. Drop this file in your project root or copy the sections into separate files (`README.md`, `IMPLEMENTATION_GUIDE.md`, `DEPLOYMENT_MAINTENANCE.md`) as needed.

---

## README — Project Overview & Quick Start

(Place this section into `README.md`)

### Project

**YCKF Cybercrime Reporting Mobile App**

**Author:** Bienvenu Gbeti (replace if needed)

**Duration:** 23 Sep 2025 - 23 Nov 2025

**Submission email:** `yckfadmin@youngcyberknightsfoundation.org`

**App name (dev):** YCKF Mobile - v1.0.0

### Project overview

This Expo React Native mobile application mirrors the core features of the Young Cyber Knights Foundation website and extends reporting capabilities for faster response.

**Core features implemented**

* Home screen Quick Actions: Report Cybercrime, Contact YCKF, Share Current Location, Share Live Location
* Cybercrime Report Form (with validation, GPS capture, optional photo evidence)
* Contact form (Email and WhatsApp send options)
* Evidence SafeBox (offline save, submit when online)
* Case Tracker (mock status timeline for Phase 1)
* LocationShare screen (current & live location guidance)
* App contexts and services: `AppContext`, `LocationContext`, `StorageContext`, `LocationService`, `EmailService`, `WhatsAppService`
* Reusable UI components, validation (react-hook-form + yup), permissions handling

### Project structure (high level)

/src
  /components
  /contexts
  /navigation
  /screens
  /services
  /types
  /utils
App.tsx
package.json
README.md

### Quick start — run locally (novice-friendly)

Prereqs:

* Node.js (>=16)
* npm or yarn
* Expo CLI
* Expo Go app on phone (for physical testing) or Android/iOS simulator

Commands:

# install deps
npm install
# start expo
npx expo start
# or
expo start

Scan the QR with Expo Go or use a/i to open emulator.

### Build (recommended: EAS Build)

Install EAS CLI and run eas build --platform android or --platform ios after eas build:configure.

### Submission checklist

- Zipped project folder
- APK/AAB or TestFlight invite
- Documentation (README, Implementation Guide, Deployment & Maintenance)
- Demo video (3-5 minutes)
- Screenshots of features

---

## IMPLEMENTATION_GUIDE — Developer Notes

(Place this section into IMPLEMENTATION_GUIDE.md)

### Architecture overview

- Presentation: React Native + Expo managed workflow
- Navigation: React Navigation (Tab + Stack)
- State & Context: AppContext, LocationContext, StorageContext
- Services: LocationService, EmailService, WhatsAppService, permissionUtils
- Storage: AsyncStorage (Evidence SafeBox key: STORAGE_KEYS.EVIDENCE_SAFEBOX)

### Main files & mapping

- src/screens/HomeScreen.tsx — quick actions
- src/screens/CybercrimeReportScreen.tsx — reporting form and submission flows
- src/screens/ContactFormScreen.tsx — contact form and send options
- src/screens/EvidenceSafeBoxScreen.tsx — offline saved items management
- src/screens/CaseTrackerScreen.tsx — mock case tracker
- src/services/LocationService.ts — location functions, reverse geocode
- src/services/EmailService.ts — mail templates & MailComposer integration
- src/services/WhatsAppService.ts — WhatsApp deep-link logic

### Important implementation details

- Permissions: always request before accessing location/camera/media
- Offline flow: always save a copy to Evidence SafeBox before attempting online submission
- WhatsApp: deep linking requires WhatsApp on device. Provide fallback to mailto
- Email attachments: MailComposer availability varies per platform and client

### Known gotchas & recommendations

- Test location and WhatsApp flows on real devices
- Handle Android content URI differences for attachments
- Consider encrypting PII in AsyncStorage for privacy

### Remaining improvements (recommended)

- Add server-side API for official persistence and file uploads
- Add user authentication and push notifications for case updates
- Add automated E2E tests (Detox/Appium)

---

## DEPLOYMENT_MAINTENANCE — Hosting & Ops Guidance

(Place this section into DEPLOYMENT_MAINTENANCE.md)

### Mobile distribution

- EAS Build (recommended) — configured via eas.json
- Build commands: eas build -p android and eas build -p ios
- Upload artifacts to Google Play / App Store Connect

### Backend hosting (optional)

- Use Node.js + Postgres + S3 (or managed equivalents)
- Host small scale on Render, Railway, Fly; scale to AWS/GCP when needed

### Dockerfile (example)

FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json./ 
RUN npm ci --production
COPY . .
CMD ["node","dist/index.js"]

### Kubernetes (high-level)

- Use managed cluster (EKS/GKE/AKS)
- Deploy via Deployment & Service manifests
- Use Secrets for credentials and backups for DB

### Terraform (high-level)

- Define modules for network, compute (EKS/GKE), RDS, S3
- Use terraform plan and terraform apply in CI/CD pipeline

### CI/CD suggestions

- Mobile: GitHub Actions -> run lint/tests -> EAS build -> store artifact
- Backend: Build image, push to registry, deploy via ArgoCD/GitOps or kubectl rollout

### Security & maintenance

- Keep secrets out of repo; use CI secrets and secret stores
- Enable Dependabot/Renovate for dependencies
- Setup crash reporting (Sentry) and monitoring (Datadog/Cloud native)

---

ADDED SECTION: Continuous OTA Update & Publishing (what we added)

This section explains the exact step-by-step process you implemented so testers receive updates automatically when you push/publish from your development machine.

Goal
Whenever you update JavaScript or assets locally and run a publish command, testers using Expo Go (or standalone builds with matching runtimeVersion) will receive the update automatically — no App Store or Play Store involved.

Preconditions (what must already be set)
1. Your app.json must contain updates/runtimeVersion entries similar to:
\"updates\": {
  \"url\": \"https://u.expo.dev/98208866-3ae4-45f5-b6bc-49f038a08287\"
},
\"runtimeVersion\": {
  \"policy\": \"appVersion\"
}

2. You have valid .eas.json (schema-compatible) in project root (no top-level updates key). Example minimal:
{
  \"cli\": { \"version\": \">= 3.0.0\" },
  \"build\": {
    \"preview\": { \"distribution\": \"internal\", \"android\": { \"buildType\": \"apk\" }, \"ios\": {} },
    \"production\": { \"distribution\": \"store\", \"android\": { \"buildType\": \"app-bundle\" }, \"ios\": {} }
  },
  \"submit\": {}
}

3. You are logged into EAS locally: eas whoami shows your username (bienbien). If not, eas login.

How to publish an update from your terminal (local -> testers)
1. Commit your changes locally:
git add .
git commit -m \"Describe changes\"

2. Publish the update to the preview/main branch used by testers:
eas update --branch main --message \"Short description of update\"

3. Wait until the CLI finishes and displays success. Example output includes:
✅ Update uploaded successfully!
🔗 Project page: https://expo.dev/accounts/bienbien/projects/yckf-mobile-app/updates/<update-id>

4. Testers will get the update the next time they open the app in Expo Go (or immediately if the app is configured to check on load).

Automate OTA from Git (CI)
To publish automatically on push (recommended):
1. Generate an Expo access token: eas token:create and copy it.
2. Add the token to GitHub Secrets as EXPO_TOKEN.
3. Add a GitHub Actions workflow .github/workflows/eas-update.yml (example below) that runs eas update --branch preview on push to main:
name: Publish EAS Update (OTA)

on:
  push:
    branches:
      - main

jobs:
  publish-update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm install -g eas-cli@latest
      - name: Publish update
        env:
          EXPO_TOKEN: ${{ secrets.EXPO_TOKEN }}
        run: |
          eas update --branch main --message \"CI: auto update from $GITHUB_ACTOR on $GITHUB_SHA\"

This will push updates automatically whenever you push to main (or other branches you configure).

Rollback & emergency
If an update causes issues, rollback with:
eas update:rollback --branch main
Follow prompts to select previous working update group.

Tester experience summary (what they need to do)
1. Install Expo Go (Play Store / App Store).
2. Open the public project link on their phone browser: https://expo.dev/accounts/bienbien/projects/yckf-mobile-app
3. Tap Open in Expo Go. App will load and fetch latest JS bundle.
