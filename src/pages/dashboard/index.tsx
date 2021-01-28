import React from "react";

import Autosizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import { Redirect } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

import UniversityCard from "../../components/UniversityCard";
import { useQuery } from "react-query";
import { University } from "../../types/university";
import { routes } from "../../routes";
import { searchUniversities } from "../../utils/api";
import { useUniversityQuery } from "../../contexts/UniversityQueryContext";
import { useDebounce, useResponsiveColumns } from "../../utils/hooks";

function HomePage() {
  const numberOfColumns = useResponsiveColumns();
  const { searchTerm } = useUniversityQuery();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data: universities = [], isLoading, error } = useQuery<University[]>(
    ["universities", debouncedSearchTerm],
    () => searchUniversities(debouncedSearchTerm, "Turkey")
  );
  console.log(universities.length);

  if (error) {
    return <Redirect to={routes.PAGE_ERROR_500} />;
  }

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Autosizer>
      {({ height, width }: { height: number; width: number }) => (
        <FixedSizeGrid
          columnCount={numberOfColumns}
          columnWidth={width / numberOfColumns - 8}
          height={height}
          rowCount={Math.ceil(universities.length / numberOfColumns)}
          overscanRowCount={3}
          rowHeight={164}
          width={width}
        >
          {({ columnIndex, rowIndex, style }) => {
            const id = rowIndex * 4 + columnIndex - rowIndex;
            return universities[id] ? (
              <UniversityCard {...universities[id]} style={style} />
            ) : null;
          }}
        </FixedSizeGrid>
      )}
    </Autosizer>
  );
}

export default HomePage;
