import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { SEARCH_CHARACTERS } from "../GraphQL/Queries";

export default function GetCharacters() {
  const [input, setInput] = useState("");
  const [searchRequest, setSearchRequest] = useState("");

  const { error, loading, data } = useQuery(SEARCH_CHARACTERS, {
    variables: { searchRequest },
  });

  useEffect(() => {
    const refetchData = setTimeout(() => {
      setSearchRequest(input);
    }, 1000);

    return () => clearTimeout(refetchData);
  }, [input]);

  return {
    loading,
    error,
    data,
    input,
    setInput,
  };
}
