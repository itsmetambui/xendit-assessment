import React from "react";

import Autosizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import { Redirect } from "react-router-dom";
import { Box, Grid, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { v4 as uuidv4 } from "uuid";

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

  if (error) {
    return <Redirect to={routes.PAGE_ERROR_500} />;
  }

  return isLoading ? (
    <Grid container spacing={6}>
      {new Array(16).fill(true).map(() => (
        <Grid key={uuidv4()} item xs={1} sm={2} md={3}>
          <Skeleton variant="rect" animation="wave" height={160} width="100%" />
          <Box pt={0.5}>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  ) : universities.length === 0 ? (
    <Grid
      style={{ height: "100%" }}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography variant="h1" component="p">
        There's no matched
      </Typography>
      <Typography variant="body2" component="p">
        Please try again with a different search term
      </Typography>
    </Grid>
  ) : (
    <Autosizer>
      {({ height, width }: { height: number; width: number }) => (
        <FixedSizeGrid
          columnCount={numberOfColumns}
          columnWidth={width / numberOfColumns - 8}
          height={height}
          rowCount={Math.ceil(universities.length / numberOfColumns)}
          overscanRowCount={3}
          rowHeight={192}
          width={width}
        >
          {({ columnIndex, rowIndex, style }) => {
            const id = rowIndex * 4 + columnIndex - rowIndex;
            const university = universities[id];
            return university ? (
              <UniversityCard
                name={university.name}
                country={university.country}
                state={university.state}
                websites={university.web_pages}
                domains={university.domains}
                style={style}
              />
            ) : null;
          }}
        </FixedSizeGrid>
      )}
    </Autosizer>
  );
}

export default HomePage;
