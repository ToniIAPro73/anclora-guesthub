# Admin authentication legacy environment fallback — Tasks v1

- [x] Add a regression test for empty canonical values with valid legacy admin
  credentials.
- [x] Make value-based environment fallback treat empty canonical values as
  unset while preserving canonical precedence for non-empty values.
- [x] Run the focused regression test and the complete quality checks.
