import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

import likeSVG from "../assets/like.svg";
import likedSVG from "../assets/liked.svg";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOAD_LIKED } from "../GraphQL/Queries";
import { useQuery } from "@apollo/client";

export default function Liked() {
  const [like, setLike] = useLocalStorage("likes", "");
  const { error, loading, data } = useQuery(LOAD_LIKED, {
    variables: { ids: Object.keys(like).map(i => Number(i)) },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableHead sx={{ fontSize: "2rem" }}>
          <TableRow hover={true}>
            <TableCell>Name</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Like</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.charactersByIds.map(({ id, name, status }) => (
            <TableRow
              key={id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link to={"/character/" + id}>{name}</Link>
              </TableCell>
              <TableCell align="center">
                <Link to={"/character/" + id}>{status}</Link>
              </TableCell>
              <TableCell align="right">
                {like[id] && <img
                  src={likedSVG}
                  className="likeBtn"
                  alt="like"
                  onClick={() =>
                    setLike(() => {
                      let likes = like;
                      if (likes[id]) {
                        delete likes[id];
                        return { ...likes };
                      }
                      return { ...like, [id]: "liked" };
                    })
                  }
                />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
