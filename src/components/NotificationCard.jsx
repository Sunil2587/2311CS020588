import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

export function NotificationCard({ notification, onClick }) {
  return (
    <Card
      variant="outlined"
      onClick={onClick}
      sx={{
        cursor: "pointer",
        borderColor: notification.isViewed ? "#dbe4f0" : "#93c5fd",
        backgroundColor: notification.isViewed ? "#ffffff" : "#eff6ff",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: "0 10px 24px rgba(37, 99, 235, 0.10)",
        },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
          <div>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              {notification.message}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {notification.id} • {notification.timestamp}
            </Typography>
          </div>

          <Stack direction="row" spacing={1} alignItems="center">
            {!notification.isViewed && <Chip label="New" size="small" color="primary" />}
            <Chip label={notification.type} size="small" variant="outlined" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}