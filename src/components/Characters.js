import React from "react";
import useGetCharacters from "../hooks/GetCharacters";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

import likeSVG from "../assets/like.svg";
import likedSVG from "../assets/liked.svg";
import "../styles/characters.scss";

export default function Characters() {
  const [like, setLike] = useLocalStorage("likes", "");
  const { loading, error, data, page, setPage } = useGetCharacters();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { info, results } = data.characters;

  return (
    <div className="characters">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ fontSize: "2rem" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Like</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map(({ id, name, status }) => (
              <TableRow
                key={id}
                hover={true}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={"/character/" + id}>{name}</Link>
                </TableCell>
                <TableCell align="center">
                  <Link to={"/character/" + id}>{status}</Link>
                </TableCell>
                <TableCell align="right">
                  <img
                    src={like[id] ? likedSVG : likeSVG}
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
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={info.count}
                rowsPerPage={20}
                rowsPerPageOptions={[20]}
                page={page - 1}
                onPageChange={(event, newPage) => {
                  setPage(newPage + 1);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
