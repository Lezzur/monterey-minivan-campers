# Claude Code — Fix-It Prompt (Sanchez's blockers)

Two blockers on the Monterey Minivan Campers proposal work. Concrete evidence for each below.
Host `100.94.182.61` is a Tailscale (100.x) address.

---

## BLOCKER 1 — Macross file-upload API is refusing connections

**Symptom:** `macross-post` / `macross-upload` fail with `Upload failed`. The room chat itself works
(text messages flow), but the HTTP file-attachment API is unreachable.

**What the tools do** (`/opt/stitch/bin/macross-upload`, `.../macross-post`):
- POST to `http://${MACROSS_HOST:-100.94.182.61}:${MACROSS_PORT:-3077}/api/servers/<server>/rooms/<room>/upload`
  with `curl -sf -F "files=@<file>"`.
- Then POST the message to `.../rooms/<room>/message`.

**Evidence gathered (2026-07-16 ~05:00 UTC):**
- Port scan on `100.94.182.61`: **3077 refused, 3078 refused, 3079 refused, 80 refused, 8080 OPEN.**
- `:8080` on the SAME host answers `HTTP/1.1 200 OK, Server: Apache` — so the host is reachable at
  the network layer. It is specifically the Macross ports that refuse. → **Not a routing/tailnet
  problem; the Macross API service on 3077 (and webhook on 3078) is down, moved, or bound to a
  non-public interface.**
- `curl` to `http://100.94.182.61:3077/api/servers` → `HTTP 000` (connection refused).
- `curl` to the webhook `http://100.94.182.61:3078/webhook` → `HTTP 000`.
- Env in my sandbox: `MACROSS_SERVER_ID=george`, `MACROSS_ROOM_ID=proposal`,
  `MACROSS_WEBHOOK_URL=http://100.94.182.61:3078/webhook`. (Rick says the srv_/room_ IDs were fixed
  weeks ago — so the IDs are fine; this is a transport/port problem, not an ID problem.)
- **Doc/binary mismatch (possible red herring, but flag it):** `macross-media/SKILL.md` documents
  `macross-post <server> <room> <file> "<message>"` (4 args), but the installed
  `/opt/stitch/bin/macross-post` has signature `<server> <room> <file> <sender> [message]` (5 args,
  requires a `sender`). If the server API changed, the binary may be stale too.

**Asks for Claude Code:**
1. On the Macross host, confirm what's listening: `ss -tlnp | grep -E '3077|3078'` (or `lsof -i`).
   Is the Macross API process up? On which port/interface (0.0.0.0 vs 127.0.0.1)?
2. If it moved off 3077, tell me the correct `MACROSS_HOST`/`MACROSS_PORT` — the tools honor those
   env vars, so I can just export them.
3. If it's bound localhost-only, expose it on the tailnet interface (or give me a reachable proxy).
4. Confirm the `/api/servers/<server>/rooms/<room>/upload` route + multipart field name (`files`)
   still match the current server. If the API changed, the `/opt/stitch/bin/macross-*` scripts need
   updating to match.

---

## BLOCKER 2 — Client-provided brand assets are not reachable

**Symptom:** Rick said "use the client provided assets now," but I can't find them.

**Evidence:**
- Macross uploads are supposed to land in Drive at
  `My Drive / Macross Gdrive / <server-id> / <room-id> / <hexId>-<filename>` (per TOOLS.md).
- `gog` Drive is authed as `rocketturtles.creative@gmail.com`. Full-text searches for
  `Sienna / van / logo / wrap` returned **zero images**; there is no `george/proposal` asset folder
  with the client's photos. The assets appear to have been posted as room-chat attachments that
  never synced to this Drive account.

**Asks for Claude Code / Rick:**
1. Confirm the Macross→Drive sync is running (it may be down for the same reason as Blocker 1 — if
   uploads can't hit the API, they never reach Drive).
2. Provide a direct share link or Drive path to the client's photos/logo, OR
3. Confirm they only exist as chat attachments so I fall back to AI-generated assets for the 5hr
   build (already the documented plan in `DEFERRED.md`).

---

## Not blockers (already resolved, for context)
- `screenshot-html` was off PATH → fixed (launcher in `~/.local/bin`, CRLF shebang stripped).
- Next.js static build + GitHub Pages deploy → green, live URL verified.
- npm-audit advisories → all server-runtime paths, inert on the static export; Next 15/16 upgrade
  queued for when a server lands (in `DEFERRED.md`).
