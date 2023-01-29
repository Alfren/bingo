import React, { useEffect, useState } from "react";
import { Button, Container, IconButton, Typography } from "@mui/material";
import NewGroupModal from "./components/NewGroupModal";
import { initDB, useIndexedDB } from "react-indexed-db";
import { DBConfig } from "./DBConfig";
import { useSnackbar } from "notistack";
import { Add } from "@mui/icons-material";
import Group from "./components/Group";

initDB(DBConfig);

export default function App() {
  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState([]);
  const toggle = () => setShow(!show);
  const db = useIndexedDB("Groups");
  const { enqueueSnackbar } = useSnackbar();

  const getAllGroups = () => {
    db.getAll().then(
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

  useEffect(() => {
    getAllGroups();
  }, []);

  const createGroup = ({ groupName, groupCount, groupMin }) => {
    db.add({
      name: groupName,
      count: shuffle(Number(groupCount), Number(groupMin)),
      min: Number(groupMin),
      total: Number(groupCount),
      next: 0,
      expanded: true,
    }).then(
      (resp) => {
        setShow(false);
        enqueueSnackbar("Group created!", { variant: "success" });
        getAllGroups();
      },
      (error) => {
        console.error(error);
        enqueueSnackbar("Error while creating group..", { variant: "error" });
        enqueueSnackbar(`${error.target.error}`, { variant: "error" });
      }
    );
  };

  const updateGroup = (group) => {
    db.update(group).then(
      (resp) => {
        getAllGroups();
      },
      (error) => {
        console.error(error);
        enqueueSnackbar("Error updating group..", { variant: "error" });
        enqueueSnackbar(`${error.target.error}`, { variant: "error" });
      }
    );
  };

  const removeGroup = (id) => {
    db.deleteRecord(id).then(
      (resp) => {
        getAllGroups();
      },
      (error) => {
        console.error(error);
        enqueueSnackbar("Error removing group..", { variant: "error" });
        enqueueSnackbar(`${error.target.error}`, { variant: "error" });
      }
    );
  };

  const DeleteDB = () => {
    db.clear();
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

  return (
    <>
      <Typography color="white" my={2.6}>
        Made with ❤ by Mein Mann, Wizard
      </Typography>
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
}
