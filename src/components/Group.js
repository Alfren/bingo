import React from "react";
import { Delete, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

export default function Group({ group, updateGroup, removeGroup, resetGroup }) {
  return (
    <Accordion
      expanded={group.expanded}
      onChange={(e, expanded) => updateGroup({ ...group, expanded })}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container>
          <Grid item flex={1}>
            <Typography variant="h5" align="center">
              Total: {group.total}
            </Typography>
          </Grid>
          <Grid item flex={1}>
            <Typography variant="h5" align="center">
              {group.name}
            </Typography>
          </Grid>
          <Grid item flex={1}>
            <Typography variant="h5" align="center">
              Min: {group.min}
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="h1" align="center">
          {JSON.stringify(group.count[group.next - 1]) || "Ready!"}
        </Typography>
        <Stack direction="row" flexWrap="wrap" sx={{ minHeight: 48 }}>
          {group.count.map((num, i) => {
            return (
              i < group.next && (
                <Chip
                  key={i}
                  label={num}
                  sx={{ fontSize: 21, py: 2.5, m: 0.5 }}
                  color={i === group.next - 1 ? "warning" : "default"}
                />
              )
            );
          })}
        </Stack>
      </AccordionDetails>
      <AccordionActions sx={{ justifyContent: "space-between" }}>
        <Button color="error" onClick={() => removeGroup(group.id)}>
          <Delete />
        </Button>
        <div>
          {group.next === Number(group.total) && (
            <Button
              color="warning"
              onClick={() => resetGroup(group)}
              sx={{ mr: 6 }}
            >
              Reset
            </Button>
          )}
          <Button
            color="primary"
            disabled={group.next >= group.total}
            onClick={() =>
              updateGroup({ ...group, next: Number(group.next) + 1 })
            }
          >
            Next
          </Button>
        </div>
      </AccordionActions>
    </Accordion>
  );
}
