import * as React from "react";
import styled from "styled-components/macro";
import { Download } from "react-feather";

import { IconButton as MuiIconButton, Tooltip } from "@material-ui/core";
import { useQuery } from "react-query";
import { useUniversityQuery } from "../contexts/UniversityQueryContext";
import { useDebounce } from "../utils/hooks";
import { University } from "../types/university";
import { searchUniversities } from "../utils/api";
import { useFavoriteUniversities } from "../contexts/FavoriteContext";
import { useLocation } from "react-router-dom";
import { routes } from "../routes";

const IconButton = styled(MuiIconButton)`
  svg {
    width: 22px;
    height: 22px;
  }
`;

function DownloadButton() {
  const location = useLocation();
  const { searchTerm } = useUniversityQuery();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: universities = [], isLoading } = useQuery<University[]>(
    ["universities", debouncedSearchTerm],
    () => searchUniversities(debouncedSearchTerm, "")
  );
  const { favoriteUniversities } = useFavoriteUniversities();
  const favUniversities = favoriteUniversities.filter((uni) => {
    return uni.name.toLowerCase().includes(searchTerm);
  });
  const handleDownload = async () => {
    const myData =
      location.pathname === routes.HOME ? universities : favUniversities;
    const fileName = "user";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Tooltip title="Downloal universities data" aria-label="download">
      <IconButton
        aria-haspopup="true"
        onClick={handleDownload}
        color="inherit"
        disabled={isLoading}
      >
        <Download />
      </IconButton>
    </Tooltip>
  );
}

export default DownloadButton;
