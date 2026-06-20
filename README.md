# BMOG

一站式健身課程、場地與活動預約 App，支援 iOS / Android 雙平台。

## Stack
- Frontend: Expo SDK 54 (Expo Router v6) + TypeScript + NativeWind v4 + react-native-reusables
- Backend: Java REST API (Spring Boot 3.3, TBD) + Supabase Postgres (DB + Storage only)
- Payment: TapPay
- OTP: Firebase Auth
- Maps: react-native-maps (Google Maps)
- Email: Resend
- Build: Expo EAS Build

## Branch strategy
- `main` — production-ready
- `dev` — active development, merged into `main` via PR

## Getting started
```bash
npx expo start
```

See [CLAUDE.md](./CLAUDE.md) for full architecture, commands, and conventions.
