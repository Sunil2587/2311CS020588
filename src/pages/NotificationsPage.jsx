import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { NotificationCard } from "../components/NotificationCard";
import { useNotifications } from "../hooks/useNotifications";

const typeOptions = ["all", "Placement", "Result", "Event"];
const priorityOrder = {
  Placement: 3,
  Result: 2,
  Event: 1,
};
const priorityLimit = 5;

function compareByRecency(left, right) {
  return new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime();
}

function compareByPriority(left, right) {
  const priorityDifference = (priorityOrder[right.type] ?? 0) - (priorityOrder[left.type] ?? 0);

  if (priorityDifference !== 0) {
    return priorityDifference;
  }

  return compareByRecency(left, right);
}

export function NotificationsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [typeFilter, setTypeFilter] = useState("all");
  const { notifications, loading, error, markAsViewed } = useNotifications();

  const filteredNotifications = useMemo(() => {
    const visibleNotifications =
      typeFilter === "all"
        ? notifications
        : notifications.filter((notification) => notification.type === typeFilter);

    if (tabValue === 1) {
      return [...visibleNotifications].sort(compareByPriority).slice(0, priorityLimit);
    }

    return [...visibleNotifications].sort(compareByRecency);
  }, [notifications, tabValue, typeFilter]);

  const viewedCount = notifications.filter((notification) => notification.isViewed).length;
  const unreadCount = notifications.length - viewedCount;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="overline" color="primary" fontWeight={700}>
            Notifications
          </Typography>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Stage 2
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Simple Material UI layout with all notifications and priority notifications.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip label={`Total: ${notifications.length}`} />
          <Chip label={`Viewed: ${viewedCount}`} variant="outlined" />
          <Chip label={`New: ${unreadCount}`} color="primary" />
        </Box>

        <Box>
          <Tabs
            value={tabValue}
            onChange={(_, nextValue) => setTabValue(nextValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="All Notifications" />
            <Tab label={`Priority Top ${priorityLimit}`} />
          </Tabs>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            <ToggleButtonGroup
              value={typeFilter}
              exclusive
              size="small"
              onChange={(_, nextValue) => nextValue && setTypeFilter(nextValue)}
            >
              {typeOptions.map((option) => (
                <ToggleButton key={option} value={option} sx={{ textTransform: "none" }}>
                  {option === "all" ? "All Types" : option}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {loading && <Typography>Loading notifications...</Typography>}

          {!loading && error && (
            <Typography color="error">Failed to load notifications: {error}</Typography>
          )}

          {!loading && !error && filteredNotifications.length === 0 && (
            <Typography color="text.secondary">No notifications found.</Typography>
          )}

          {!loading && !error && filteredNotifications.length > 0 && (
            <Stack spacing={1.5}>
              {filteredNotifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                  onClick={() => markAsViewed(notification.id)}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </Container>
  );
}
