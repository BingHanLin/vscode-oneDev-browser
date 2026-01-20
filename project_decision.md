# Project Decision Log

This document records important architectural and implementation decisions made during the development of the OneDev Browser VS Code extension.

---

## 2026-01-20: Default "Open" State Filter Implementation

### Background
User requested that PR and Issue tabs should default to showing only "Open" state items when first opened, rather than showing all items.

### Requirements
1. PRTab and IssuesTab should display "Open" state items by default on initial load
2. The filter dropdown should correctly show the selected state
3. Filter state should persist when switching between tabs
4. Data should be cached to avoid reload on tab switches

### Implementation Decisions

#### 1. State Management Architecture
**Decision**: Lift state filter management to `App.tsx` parent component

**Rationale**:
- Enables state persistence across tab switches
- Centralizes state management for easier maintenance
- Avoids component remounting issues

**Files Modified**:
- `web/src/App.tsx`: Added `prStateFilter` and `issueStateFilter` state
- `web/src/components/PRTab.tsx`: Accepts `stateFilter` and `onStateFilterChange` props
- `web/src/components/IssuesTab.tsx`: Accepts `stateFilter` and `onStateFilterChange` props

#### 2. Auto-Detection of "Open" State Value
**Decision**: Use case-insensitive matching to detect the actual "Open" state value from API data

**Rationale**:
- OneDev API returns different formats: "OPEN" for PRs, "Open" for Issues
- Auto-detection ensures compatibility with any API format
- Avoids hardcoding specific values

**Implementation** (`App.tsx`):
```typescript
const openState = allStates.find(state => 
    state && state.toLowerCase() === "open"
);
if (openState) {
    setPrStateFilter(openState);  // Sets to actual value: "OPEN" or "Open"
}
```

#### 3. Dropdown Component Choice
**Decision**: Replace `VSCodeDropdown` with native HTML `<select>` element

**Rationale**:
- VSCodeDropdown had state synchronization issues
- Native select properly responds to React state changes
- Tried solutions that failed:
  - Adding `selected` attribute to VSCodeOption
  - Using `key` prop to force re-render
- Native select is more reliable and performant

**Trade-off**: Slightly less VS Code theme integration, but better functionality

#### 4. Tab Rendering Strategy
**Decision**: Use CSS `display` property instead of conditional rendering

**Before**:
```tsx
{activeTab === "pr" && <PRTab ... />}
```

**After**:
```tsx
<div style={{ display: activeTab === "pr" ? "block" : "none" }}>
    <PRTab ... />
</div>
```

**Rationale**:
- Prevents component unmounting/remounting on tab switch
- Preserves component state and DOM
- Eliminates re-initialization issues

#### 5. Data Caching Strategy
**Decision**: Load data only once per tab using tracking flags

**Implementation**:
```typescript
const [prDataLoaded, setPrDataLoaded] = useState(false);
const [issuesDataLoaded, setIssuesDataLoaded] = useState(false);
const [buildsDataLoaded, setBuildsDataLoaded] = useState(false);

// Only fetch if not already loaded
if (activeTab === "pr" && !prDataLoaded) {
    fetchPullRequests(0, PR_PAGE_SIZE, true);
    setPrDataLoaded(true);
}
```

**Rationale**:
- Eliminates brief "All States" display when switching tabs
- Improves perceived performance
- Reduces API calls

**Trade-off**: Data may become stale; users must manually refresh for latest data

#### 6. Display Formatting
**Decision**: Format all state names with capitalized first letter (e.g., "Open", "Merged", "Discarded")

**Implementation**:
```typescript
const capitalizeFirst = (str: string) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
```

**Rationale**:
- Provides consistent, professional appearance
- Improves readability
- Converts "OPEN" → "Open", "MERGED" → "Merged"

### Technical Challenges Encountered

1. **VSCodeDropdown State Sync Issue**
   - Problem: Component didn't update display when state changed
   - Attempted fixes: `selected` attribute, `key` prop
   - Solution: Switched to native HTML select

2. **Component Remounting on Tab Switch**
   - Problem: Components lost state when switching tabs
   - Cause: Conditional rendering (`&&` operator)
   - Solution: CSS-based visibility (`display: none/block`)

3. **Brief "All States" Display**
   - Problem: Dropdown showed "All States" during data load
   - Cause: Data reloading on every tab switch
   - Solution: Implement data caching with loaded flags

### Files Changed
- `web/src/App.tsx`
- `web/src/components/PRTab.tsx`
- `web/src/components/IssuesTab.tsx`

### Testing Recommendations
- Verify "Open" state is selected on first PR tab open
- Verify "Open" state is selected on first Issue tab open
- Switch between tabs and verify filter state persists
- Verify dropdown shows correct value immediately (no flash to "All States")
- Manually switch to different state and verify it works
- Test with different OneDev instances (verify auto-detection works)

### Future Considerations
- Consider adding a "Refresh" button to reload latest data
- Consider adding a setting to control default filter state
- Consider implementing time-based auto-refresh
- Consider showing "last updated" timestamp

---
