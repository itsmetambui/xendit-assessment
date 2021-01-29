import React from "react";

import Autosizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid } from "react-window";
import { Grid, Typography } from "@material-ui/core";

import UniversityCard from "../../components/UniversityCard";
import { useUniversityQuery } from "../../contexts/UniversityQueryContext";
import { useResponsiveColumns } from "../../utils/hooks";
import { useFavoriteUniversities } from "../../contexts/FavoriteContext";

function FavoritePage() {
  const numberOfColumns = useResponsiveColumns();
  const { searchTerm } = useUniversityQuery();
  const { favoriteUniversities, toggleFavorite } = useFavoriteUniversities();
  const universities = favoriteUniversities.filter((uni) => {
    return uni.name.toLowerCase().includes(searchTerm);
  });

  return universities.length === 0 ? (
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
          rowHeight={216}
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
                favorited={favoriteUniversities.some(
                  (fav) =>
                    fav.name === university.name &&
                    fav.country === university.country
                )}
                handleAction={() => toggleFavorite(university)}
                style={style}
              />
            ) : null;
          }}
        </FixedSizeGrid>
      )}
    </Autosizer>
  );
}

export default FavoritePage;
