import {
  Stack, FormControl, InputLabel, Select, MenuItem,
  TextField
} from "@mui/material";

export default function NotificationFilter({
  typeFilter, onTypeChange,
  topN, onTopNChange,
  showTopN = false,
}) {
  return (
    <Stack direction="row" spacing={2} mb={2} alignItems="center" flexWrap="wrap">
      {showTopN && (
        <TextField
          label="Show top N"
          type="number"
          size="small"
          value={topN}
          onChange={(e) => onTopNChange(Math.max(1, parseInt(e.target.value) || 10))}
          sx={{ width: 110 }}
          inputProps={{ min: 1, max: 100 }}
        />
      )}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Filter by Type</InputLabel>
        <Select
          value={typeFilter}
          label="Filter by Type"
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Placement">Placement</MenuItem>
          <MenuItem value="Result">Result</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}