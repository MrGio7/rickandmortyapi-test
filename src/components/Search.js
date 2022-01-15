import React from "react";
import useGetSearch from "../hooks/GetSearch";
import { TextField, Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";

export default function Characters() {
  const { loading, error, data, input, setInput } = useGetSearch();

  return (
    <Autocomplete
      freeSolo
      id="free-solo-demo"
      sx={{ width: 300 }}
      disableClearable
      inputValue={input}
      onInputChange={(ev) => setInput(ev.target.value)}
      filterOptions={(x) => x}
      options={
        data && data.characters && data.characters.results
          ? data.characters.results
          : []
      }
      getOptionLabel={({ id }) => id}
      loading={loading}
      renderOption={(props, { id, name }) =>
        loading ? null : (
          <Link to={"/character/" + id} {...props} onClick={undefined}>
            {id} {name}
          </Link>
        )
      }
      renderInput={(params) => <TextField {...params} label="Search input" />}
    />
  );
}
