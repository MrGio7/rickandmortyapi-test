import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { LOAD_CHARACTER } from "../GraphQL/Queries";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import FormDialog from "./FormDialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import likeSVG from "../assets/like.svg";
import likedSVG from "../assets/liked.svg";
import "../styles/character.scss";

export default function Character() {
  const { characterId } = useParams();
  const [like, setLike] = useLocalStorage("likes", "");
  const [images, setImage] = useLocalStorage("images", "");
  const { error, loading, data } = useQuery(LOAD_CHARACTER, {
    variables: { id: characterId },
  });
  if (loading) return <h1>LOADING///</h1>;
  if (error) return <h1>ERROR///</h1>;
  const { character } = data;
  const { name, species, gender, location, episode, status, created, image } =
    character;

  return (
    <div className="character">
      <div className="avatarContainer">
        {images[characterId] ? (
          <img src={images[characterId]} alt={name} className="avatar" />
        ) : (
          <img src={image} alt={name} className="avatar" />
        )}
        <FormDialog id={characterId} />
      </div>
      <div className="name">
        <h3>{name}</h3>
        <img
          src={like[characterId] ? likedSVG : likeSVG}
          className="likeBtn"
          alt="like"
          onClick={() =>
            setLike(() => {
              let likes = like;
              if (likes[characterId]) {
                delete likes[characterId];
                return { ...likes };
              }
              return { ...like, [characterId]: "liked" };
            })
          }
        />
      </div>
      <ul>
        <li>Species: {species}</li>
        <li>Gender: {gender}</li>
        <li>Location: {location.name ? location.name : "Unknown"}</li>
        <li>Status: {status}</li>
        <li>Created: {created}</li>
        <li>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Episodes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {episode.map(({ episode }, idx) => (
                  <li key={idx}>{episode}</li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </li>
      </ul>
    </div>
  );
}
