# Supabase Schema Draft

Status: **draft, not yet applied**. Per [CLAUDE.md](../CLAUDE.md), `supabase/migrations/` is
managed by the Supabase CLI and should not be hand-written — once the project is linked
(`supabase link`), turn this into real migrations with `supabase migration new <name>`.

Decisions baked into this draft:
- Courses (recurring scheduled classes) and Events (one-off, separately priced) are separate
  tables — different fields (instructor/capacity-per-session vs. ticket price).
- Membership is subscription-gated: a user needs an `active`, non-expired membership to create
  a `booking`. Events are paid per-ticket and are not membership-gated.

## profiles
| column | type | notes |
|---|---|---|
| id | uuid | PK, references `auth.users(id)` |
| phone_number | text | unique, set via Firebase OTP |
| display_name | text | |
| avatar_url | text | |
| role | text | `member` \| `admin`, default `member` |
| created_at | timestamptz | default `now()` |

## venues
| column | type | notes |
|---|---|---|
| id | uuid | PK, default `gen_random_uuid()` |
| name | text | not null |
| address | text | |
| lat | numeric | |
| lng | numeric | |
| cover_image | text | Supabase Storage path |
| description | text | |
| created_at | timestamptz | default `now()` |

## courses
Recurring class definitions (e.g. weekly yoga).
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| venue_id | uuid | FK → venues.id |
| title | text | not null |
| category | text | e.g. `yoga`, `strength` |
| instructor | text | |
| capacity_per_session | int | |
| duration_minutes | int | |
| created_at | timestamptz | default `now()` |

## course_sessions
A specific bookable time slot for a course.
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| course_id | uuid | FK → courses.id |
| start_time | timestamptz | not null |
| end_time | timestamptz | not null |
| capacity | int | overrides `courses.capacity_per_session` if set |
| booked_count | int | default `0`, kept in sync via trigger or app logic |

## bookings
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → profiles.id |
| session_id | uuid | FK → course_sessions.id |
| status | text | `confirmed` \| `cancelled`, default `confirmed` |
| created_at | timestamptz | default `now()` |

Booking requires the user to have a `memberships` row with `status = 'active'` and
`expires_at > now()` — enforced via RLS policy or an Edge Function, not just a foreign key.

## membership_plans
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| name | text | not null |
| price | numeric | |
| duration_days | int | |
| description | text | |

## memberships
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → profiles.id |
| plan_id | uuid | FK → membership_plans.id |
| status | text | `active` \| `expired` \| `cancelled` |
| started_at | timestamptz | |
| expires_at | timestamptz | |

## events
One-off, separately ticketed activities (not membership-gated).
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| venue_id | uuid | FK → venues.id |
| title | text | not null |
| description | text | |
| start_time | timestamptz | |
| end_time | timestamptz | |
| capacity | int | |
| price | numeric | |

## event_registrations
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| event_id | uuid | FK → events.id |
| user_id | uuid | FK → profiles.id |
| status | text | `registered` \| `cancelled` |
| order_id | uuid | FK → orders.id |

## orders
Payment record, created from a TapPay charge via `POST /api/payments/charge` on the backend.
| column | type | notes |
|---|---|---|
| id | uuid | PK |
| user_id | uuid | FK → profiles.id |
| type | text | `membership` \| `event` |
| reference_id | uuid | points at `memberships.id` or `event_registrations.id` depending on `type` |
| amount | numeric | |
| currency | text | default `TWD` |
| tappay_transaction_id | text | from TapPay's response |
| status | text | `pending` \| `paid` \| `failed` |
| created_at | timestamptz | default `now()` |

## RLS notes (to design once the project is linked)
- `profiles`: a user can only read/update their own row.
- `bookings`, `memberships`, `orders`: a user can only read their own rows; inserts/updates
  happen through Supabase Edge Functions or the Java backend using the service role, not
  directly from the client, since they involve payment/membership validation.
- `venues`, `courses`, `course_sessions`, `events`: public read, admin-only write.
