# Store NEW Badge Previous-Month Design

## Goal

Change the store-status modal so the NEW treatment is shown for stores whose
`open_date` falls in the calendar month immediately before the viewer's current
month.

Examples:

- During August 2026, stores opened in July 2026 are marked NEW.
- During September 2026, those July stores are no longer marked NEW.
- During January 2027, stores opened in December 2026 are marked NEW.

## Design

`StoreStatusModal` will calculate the year and month eligible for the NEW badge
once when the component mounts. It will derive that value by moving one calendar
month back from the current date, allowing the JavaScript date implementation to
handle the January-to-December year boundary.

The value passed to each `StoreItem` will be renamed from `currentOpenMonth` to
`newBadgeOpenMonth`. `StoreItem` will compare the parsed year and month from
`store.open_date` with this target month. The resulting boolean will control the
existing NEW badge, highlighted card, and highlighted status strip together.

The visible status label will continue to use the store's actual opening month.
Invalid or missing `open_date` values will retain the existing fallback behavior
and will not receive NEW styling.

## Testing

Add focused regression coverage for the month-target calculation:

- A normal month maps to the immediately preceding month.
- January maps to December of the previous year.

Update the existing badge-layout regression test to follow the renamed NEW
condition without changing its layout assertion. Then run the focused tests,
the complete script test suite, lint, and the production build.
