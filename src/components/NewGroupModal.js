import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import {
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";

const NewGroupModal = ({ show, toggle, createGroup, DeleteDB }) => {
  const [groupName, setGroupName] = useState("");
  const [groupMin, setGroupMin] = useState("");
  const [groupCount, setGroupCount] = useState("");
  return (
    <Modal open={show} onClose={toggle} sx={modalStyle}>
      <Card sx={cardStyle}>
        <Button
          color="error"
          size="small"
          variant="outlined"
          sx={{ position: "absolute", top: 5, left: 5 }}
          onClick={DeleteDB}
        >
          System Reset
        </Button>
        <IconButton
          color="error"
          size="large"
          sx={{ position: "absolute", top: 5, right: 5 }}
          onClick={toggle}
        >
          <Close sx={{ fontSize: 35 }} />
        </IconButton>
        <Typography variant="h4" align="center" my={2}>
          Create Group
        </Typography>
        <Grid container columnGap={3} rowGap={2} justifyContent="center">
          <Grid item>
            <TextField
              label="Group Name"
              value={groupName}
              autoFocus
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Lowest Number"
              value={groupMin}
              type="number"
              onChange={(e) =>
                setGroupMin(e.target.value < 0 ? 0 : e.target.value)
              }
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Group Count"
              value={groupCount}
              type="number"
              onChange={(e) =>
                setGroupCount(e.target.value < 0 ? 0 : e.target.value)
              }
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              color="success"
              size="large"
              variant="contained"
              disabled={!groupName || !groupMin || !groupCount}
              onClick={() => {
                createGroup({ groupName, groupCount, groupMin });
                setGroupName("");
                setGroupCount("");
                setGroupMin("");
              }}
            >
              Create Group
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Modal>
  );
};

const modalStyle = {
    width: "1000px",
    maxWidth: "90vw",
    m: "8rem auto 0 auto",
  },
  cardStyle = {
    p: 2,
  };

export default NewGroupModal;
