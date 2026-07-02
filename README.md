# Sample App

---

## Quick start

```bash
cd ~/Workspace/mobile/sample-app
npm start          # then press `i` for iOS Simulator
npm test           # run smoke + co-located tests
```

---

## Folder scaffold

Create modules on demand during the interview — nothing is pre-built beyond empty shells.

```
sample-app/
├── App.tsx
├── src/
│   ├── navigation/         # route config only — prefer over "router/"
│   │   ├── AppNavigator.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   └── modules/
│       └── [Module]/       # PascalCase — e.g. Common, Time, FeatureName
│           ├── components/
│           │   └── [Component]/
│           │       ├── [Component].tsx
│           │       ├── [Component].test.tsx
│           │       └── index.ts
│           ├── screens/
│           │   └── [Screen]/
│           │       ├── [Screen].tsx
│           │       ├── [Screen].test.tsx
│           │       └── index.ts
│           ├── hooks/
│           ├── services/
│           ├── types/
│           ├── const.ts
│           └── index.ts      # re-exports only
```

**Naming**

- Module folders: PascalCase (`Common`, `FeatureName`)
- Component / screen folders: PascalCase (`Button`, `ListScreen`)
- Consts: `SCREAMING_SNAKE_CASE` in `const.ts` → `export default { EXAMPLE_OF_CONST }`
- Services: singleton — `export { commonService as CommonService }`

**Routing**

- `navigation/` — stack config + `RootStackParamList`, wired via `NavigationContainer` in `App.tsx`
- Screens live in `modules/[Module]/screens/[Screen]/` — not at top level
- Avoid naming the folder `router/` (implies Expo Router)

