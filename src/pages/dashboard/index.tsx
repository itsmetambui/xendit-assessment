import React from "react";

import { CircularProgress, Grid } from "@material-ui/core";
import UniversityCard from "../../components/UniversityCard";
import { useQuery } from "react-query";
import { University } from "../../types/university";
import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router-dom";
import { routes } from "../../routes";
import { searchUniversities } from "../../utils/api";
import { useUniversityQuery } from "../../contexts/UniversityQueryContext";
import { useDebounce } from "../../utils/hooks";

function HomePage() {
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
    <CircularProgress />
  ) : (
    <React.Fragment>
      <Grid container spacing={3}>
        {universities.map(
          ({ name, websites, domains, country, countryCode, state }) => {
            return (
              <Grid
                item
                xs={6}
                sm={3}
                key={`${name}-${countryCode}-${uuidv4()}`}
              >
                <UniversityCard
                  name={name}
                  state={state}
                  country={country}
                  countryCode={countryCode}
                  websites={websites}
                  domains={domains}
                />
              </Grid>
            );
          }
        )}
      </Grid>
    </React.Fragment>
  );
}

export default HomePage;
