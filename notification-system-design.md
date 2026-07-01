# Notification System Design

Stage 1

I used a simple priority inbox in the frontend. The data stays local in notification-app-fe and each notification has a read state plus a priority score

The list is sorted with a small rule set

*Unread notifications come first.
*Higher priority comes before lower priority.
*If two items are equal, the older item stays below the newer one

Only the top 10 notifications are shown so the page stays short and easy to scan. The UI is kept plain on purpose: a heading, unread count, and a compact list of notifications


