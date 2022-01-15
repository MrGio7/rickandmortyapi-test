import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import editSVG from "../assets/edit.svg";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function FormDialog({ id }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [image, setImage] = useLocalStorage("images", "");

  return (
    <div>
      <img
        src={editSVG}
        onClick={() => setOpen(true)}
        alt="edit avatar"
        className="editAvatar"
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Change Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter new image url and press change.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Image Address"
            type="url"
            fullWidth
            variant="standard"
            value={input}
            onChange={(ev) => setInput(ev.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              if (input.trim() !== "") {
                setImage({ ...image, [id]: input });
                setOpen(false);
              }
            }}
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
