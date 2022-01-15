import { useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_CHARACTERS } from "../GraphQL/Queries";

export default function GetCharacters() {
  const [page, setPage] = useState(1);
  const { error, loading, data } = useQuery(LOAD_CHARACTERS, {
    variables: { page },
  });

  return {
    loading,
    error,
    data,
    page,
    setPage
  };
}
