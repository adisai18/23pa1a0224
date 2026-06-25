import { useState } from "react";
import {
  Box, Typography, Card, CardContent, Chip, Stack,
  CircularProgress, Alert, Pagination, Tabs, Tab, TextField
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import NotificationFilter from "../components/NotificationFilter";
import { useNotifications, usePriorityNotifications } from "../hooks/useNotifications";

const TYPE_COLOR = { Placement: "success", Result: "primary", Event: "warning" };

// Track seen IDs globally (in-module state, persists during session)
const seenIds = new Set();

function NotifCard({ notif }) {
  const isNew = !seenIds.has(notif.ID);
  // Mark as seen once rendered
  seenIds.add(notif.ID);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 1.5,
        borderLeft: isNew ? "4px solid #1976d2" : "4px solid #e0e0e0",
        backgroundColor: isNew ? "#f0f7ff" : "#fafafa",
        transition: "background 0.3s",
      }}
    >
      <CardContent sx={{ py: 1.5, "&:last-child": { pb: 1.5 } }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1}>
            <Chip
              label={notif.Type}
              color={TYPE_COLOR[notif.Type] || "default"}
              size="small"
            />
            {isNew && (
              <Chip label="NEW" size="small" sx={{ backgroundColor: "#bbdefb", color: "#0d47a1" }} />
            )}
          </Stack>
          <Typography variant="caption" color="text.secondary">
            {notif.Timestamp}
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: isNew ? 600 : 400 }}>
          {notif.Message}
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ wordBreak: "break-all" }}>
          {notif.ID}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ── All Notifications Tab ────────────────────────────────────────────────────
function AllTab() {
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const LIMIT = 10;

  const { notifications, loading, error } = useNotifications({
    limit: LIMIT,
    page,
    notification_type: typeFilter,
  });

  return (
    <Box>
      <NotificationFilter
        typeFilter={typeFilter}
        onTypeChange={(v) => { setTypeFilter(v); setPage(1); }}
      />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? (
        <Box textAlign="center" py={6}><CircularProgress /></Box>
      ) : (
        <>
          {notifications.length === 0 && (
            <Typography color="text.secondary" textAlign="center" py={4}>
              No notifications found.
            </Typography>
          )}
          {notifications.map((n) => <NotifCard key={n.ID} notif={n} />)}
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={notifications.length === LIMIT ? page + 1 : page}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
}

// ── Priority Inbox Tab ───────────────────────────────────────────────────────
function PriorityTab() {
  const [topN, setTopN] = useState(10);
  const [typeFilter, setTypeFilter] = useState("");

  const { notifications, loading, error } = usePriorityNotifications({
    topN,
    notification_type: typeFilter,
  });

  return (
    <Box>
      <NotificationFilter
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        showTopN
        topN={topN}
        onTopNChange={setTopN}
      />
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {loading ? (
        <Box textAlign="center" py={6}><CircularProgress /></Box>
      ) : (
        <>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Showing top {notifications.length} — ranked by Placement › Result › Event, then recency
          </Typography>
          {notifications.length === 0 && (
            <Typography color="text.secondary" textAlign="center" py={4}>
              No notifications found.
            </Typography>
          )}
          {notifications.map((n, i) => (
            <Box key={n.ID} sx={{ position: "relative" }}>
              <Typography
                variant="caption"
                sx={{
                  position: "absolute", top: 12, right: 12,
                  color: "#888", fontWeight: 700, zIndex: 1
                }}
              >
                #{i + 1}
              </Typography>
              <NotifCard notif={n} />
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}

// ── Page Root ────────────────────────────────────────────────────────────────
export default function NotificationsPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
      >
        <Tab label="All Notifications" />
        <Tab
          label={
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <StarIcon fontSize="small" />
              <span>Priority Inbox</span>
            </Stack>
          }
        />
      </Tabs>

      {tab === 0 && <AllTab />}
      {tab === 1 && <PriorityTab />}
    </Box>
  );
}