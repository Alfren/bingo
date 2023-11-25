import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import NewGroupModal from "./components/NewGroupModal";
import { initDB, useIndexedDB } from "react-indexed-db-hook";
import { useSnackbar } from "notistack";
import { Add } from "@mui/icons-material";
import Group from "./components/Group";
import { DBConfig } from "./DBConfig";

initDB(DBConfig);

const App = () => {
  const { enqueueSnackbar: msg } = useSnackbar();
  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState([]);
  const toggle = () => setShow(!show);
  const [devMode, setDevMode] = useState(false);
  const { getAll, add, update, clear, deleteRecord } = useIndexedDB("Groups");

  const getAllGroups = () => {
    getAll().then(
      (resp) => {
        setGroups(resp);
        if (resp.length === 0) {
          setShow(true);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const createGroup = ({ groupName, groupCount, groupMin }) => {
    let newId = 0;
    groups.forEach(({ id }) => {
      if (id > newId) newId = Number(id);
    });

    add({
      id: Number(newId) + 1,
      name: groupName,
      count: shuffle(Number(groupCount), Number(groupMin)),
      min: Number(groupMin),
      total: Number(groupCount),
      next: 0,
      expanded: true,
    }).then(
      (resp) => {
        setShow(false);
        msg("Group created!", { variant: "success" });
        getAllGroups();
      },
      (error) => {
        console.error(error);
        msg("Error while creating group..", { variant: "error" });
        msg(`${error.target.error}`, { variant: "error" });
      }
    );
  };

  const updateGroup = (group) => {
    update(group).then(
      (resp) => {
        getAllGroups();
      },
      (error) => {
        console.error(error);
        msg("Error updating group..", { variant: "error" });
        msg(`${error.target.error}`, { variant: "error" });
      }
    );
  };

  const removeGroup = (group) => {
    deleteRecord(group.id).then(
      (resp) => {
        getAllGroups();
      },
      (error) => {
        console.error(error);
        msg("Error removing group..", { variant: "error" });
        msg(`${error.target.error}`, { variant: "error" });
      }
    );
  };

  const DeleteDB = () => {
    clear();
    getAllGroups();
  };

  function shuffle(total, min) {
    // create array of numbers of 'number' length
    let array = Array.from({ length: min + total }, (_, i) => i),
      i = array.length,
      j = 0,
      temp;
    while (i--) {
      j = Math.floor(Math.random() * (i + 1));
      // swap randomly chosen element with current element
      temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array.filter((num) => num >= min);
  }

  const resetGroup = (group) => {
    updateGroup({
      ...group,
      count: shuffle(group.total, group.min),
      next: 0,
      min: Number(group.min),
      total: Number(group.total),
    });
  };

  useEffect(() => {
    getAll().then((data) => {
      setGroups(data);
    });
  }, []);
  console.log("App");

  return (
    <>
      <Typography color="white" mb={3}>
        Made with <span onClick={() => setDevMode(!devMode)}>❤</span> by Mein
        Mann, Wizard
      </Typography>
      {devMode && (
        <Box
          sx={{
            background: "#111",
            p: 2,
            m: 2,
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          <Typography variant="body1" color="white">
            {JSON.stringify(groups)}
          </Typography>
        </Box>
      )}
      <Button
        color="warning"
        variant="contained"
        sx={{ position: "absolute", top: 10, right: 15 }}
        onClick={toggle}
      >
        <Add sx={{ fontSize: 35 }} />
      </Button>
      <NewGroupModal
        show={show}
        toggle={toggle}
        createGroup={createGroup}
        DeleteDB={DeleteDB}
      />
      <Container>
        {groups.map((group) => (
          <Group
            key={group.id}
            group={group}
            updateGroup={updateGroup}
            removeGroup={removeGroup}
            resetGroup={resetGroup}
          />
        ))}
      </Container>
    </>
  );
};

export default App;
