# React Native Interview Prep

Interview: **Thu Jul 2, 2026, 9:30 AM CEST** — 60–90 min pair programming.

Delete this file before the interview if you prefer a truly blank repo.

---

## Quick start

```bash
cd ~/Workspace/mobile/sample-app
npm start          # then press `i` for iOS Simulator
npm test           # run smoke + co-located tests
```

---

## Folder scaffold (PascalCase)

Create modules on demand during the interview — nothing is pre-built beyond empty shells.

```
sample-app/
├── App.tsx
├── src/
│   ├── navigation/         # route config only — prefer over "router/"
│   │   ├── AppNavigator.tsx
│   │   ├── navigation.types.ts
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

---

## React → React Native mental models

| React Web          | React Native                   | Senior note |
| ------------------ | ------------------------------ | ----------- |
| `div`, `span`, `p` | `View`, `Text`                 | All text must be inside `<Text>` |
| `className` + CSS  | `style` + `StyleSheet.create`  | No cascade; default flex direction is **column** |
| `onClick`          | `onPress` on `Pressable`       | Prefer `Pressable` over `TouchableOpacity` |
| `input`            | `TextInput`                    | Keyboard + `KeyboardAvoidingView` |
| `img`              | `Image`                        | Set `width`/`height` or `aspectRatio` |
| `ul` + `.map()`    | `FlatList` / `SectionList`     | Never `ScrollView` + map for long lists |
| `localStorage`     | `AsyncStorage` / MMKV          | Async, not synchronous |
| React Router       | React Navigation / Expo Router | Blank apps usually use React Navigation stack |
| `hover:`           | Press states                   | `Pressable style={({ pressed }) => ...}` |
| Browser layout     | Safe areas                     | `SafeAreaView` from `react-native-safe-area-context` |

### FlatList checklist (say out loud)

- `data`, `keyExtractor` (id, not index), `renderItem` (extract component)
- `ListEmptyComponent`, `refreshControl`, `onEndReached` (mention pagination)

### Four UI states (every fetch)

```tsx
if (isLoading) return <Loading />;
if (error) return <Error message={error} onRetry={refetch} />;
if (!data.length) return <Empty />;
return <FlatList data={data} ... />;
```

### State management (what to say)

- Default: `useState` + custom hooks
- Context for theme/auth only if needed
- Redux/Zustand — acknowledge, don't add unless asked

---

## Communication loop (use every sub-task)

```
1. REPEAT  — "So we need X that does Y when Z"
2. CLARIFY — "Can I use a public API? Should empty state show a message?"
3. PLAN    — "I'll start with types, then a hook, then the screen, then a test"
4. TRADEOFF — "FlatList over ScrollView because..."
5. CODE    — narrate as you type
6. VERIFY  — simulator + test + narrate result
```

**Senior phrases**

- "I'll extract this into a hook so the screen stays presentational."
- "Let me handle loading, error, empty, and success."
- "Local state + a hook is enough for this scope."

**Avoid**

- Coding before clarifying
- One giant file
- `ScrollView` + `.map()` for dynamic lists
- "I don't know RN" → say "In web I'd do X; in RN it's Y"

### Architecture script (first 3 minutes)

1. Clarify requirements
2. Propose `modules/[Module]/` + `navigation/`
3. Define types + navigation param list
4. Build one vertical slice (list → detail)
5. Test the happy path
6. Iterate (loading, errors, empty)

---

## Cheat sheet

```tsx
import {
  View, Text, FlatList, Pressable, TextInput, StyleSheet,
  ActivityIndicator, RefreshControl, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
```

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

it('renders', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeTruthy();
});
```

**Pre-installed (not wired up):** `@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`, `react-native-safe-area-context`

---

## Practice exercises (training only)

Use JSONPlaceholder or mock data. Create modules on the fly in this blank app.

### Exercise 0 — Architecture (15 min, no code)

- Draw folder template with PascalCase names
- Define domain types
- Map screens vs components per module
- Plan `navigation/` stack + param types

### Exercise 1 — Static list (30 min)

**Prompt:** Show a list of items.

**Build:** `[Module]/screens/[ListScreen]`, `[ListItem]`, `FlatList`, `StyleSheet`

**Test:** renders mocked items | **Points:** `keyExtractor`, `renderItem`, empty stub

### Exercise 2 — Fetch + 4 states (35 min)

**Prompt:** Load items from an API.

**Build:** `[Module]/services/`, `[Module]/hooks/useXxx`, loading/error/empty/success

**Test:** mock service → loading then items (`waitFor`) | **Points:** service layer, retry

### Exercise 3 — Navigation (30 min)

**Prompt:** Tap item → detail screen.

**Build:** `navigation/AppNavigator.tsx`, typed params, `[DetailScreen]`

**Test:** `navigation.navigate` on press | **Points:** `RootStackParamList`, `SafeAreaView`

### Exercise 4 — Form (35 min)

**Prompt:** Add item from a form.

**Build:** `TextInput`, validation, `Pressable` submit

**Test:** submit disabled when invalid | **Points:** `KeyboardAvoidingView`

### Exercise 5 — Toggle + refresh (25 min)

**Prompt:** Update item + pull to refresh.

**Build:** `RefreshControl`, toggle in hook

**Test:** toggle updates UI | **Points:** immutable list updates

### Exercise 6 — Mock interview (45–60 min)

Timer on. Exercises 1→4 from scratch. Goal: 50 min, 2 tests, clean PascalCase structure.

---

## 4-hour training schedule

### Today (~2h)

| Time | Activity |
| ---- | -------- |
| 0:00–0:20 | Run app + simulator, review folder scaffold |
| 0:20–0:40 | Mental model table; practice 3 flex layouts in `App.tsx` |
| 0:40–1:10 | **Exercise 1** — static FlatList + 1 test |
| 1:10–1:45 | **Exercise 2** — fetch hook + 4 states + 1 test |
| 1:45–2:00 | Record yourself explaining Exercise 2 (2 min) |

### Tomorrow (~2h)

| Time | Activity |
| ---- | -------- |
| 0:00–0:30 | **Exercise 3** — navigation stack |
| 0:30–1:05 | **Exercise 4** — form + keyboard |
| 1:05–1:30 | **Exercise 5** — refresh + toggle |
| 1:30–2:00 | **Exercise 6** — timed mock |

### Thursday before 9:30 (10 min)

- `npm start` + iOS Simulator
- Glance at mental models + communication loop
- Do not cram new APIs

---

## Interview day checklist

**Environment**

- [ ] `~/Workspace/mobile/sample-app` opens and `npm start` works
- [ ] iOS Simulator launches from Expo
- [ ] Font size readable when screen sharing
- [ ] Notifications silenced; Meet link ready

**When prompt arrives**

- [ ] Repeat requirements back
- [ ] Ask 2–3 clarifying questions
- [ ] Propose folder structure + types before coding
- [ ] Build thinnest vertical slice first
- [ ] Write at least 1 test per feature
- [ ] Narrate tradeoffs

**If stuck**

- Say what you're trying to do
- Fall back to React patterns you know
- Use docs live — seniors look things up
- Prioritize happy path over polish
