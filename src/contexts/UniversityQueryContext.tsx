import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { routes } from "../routes";

const UniversityQueryContext = React.createContext<{
  searchTerm: string;
  handleUniversitiesSearch: (term: string) => void;
}>({
  searchTerm: "",
  handleUniversitiesSearch: (term) => {},
});

const UniversityQueryProvider = (props: Object) => {
  const location = useLocation();
  const history = useHistory();
  console.log(location.pathname);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleUniversitiesSearch = (term: string) => {
    setSearchTerm(term);
    if (location.pathname !== routes.HOME) {
      history.push(routes.HOME);
    }
  };

  return (
    <UniversityQueryContext.Provider
      value={{ searchTerm, handleUniversitiesSearch }}
      {...props}
    />
  );
};

const useUniversityQuery = () => {
  const context = React.useContext(UniversityQueryContext);
  if (context === undefined) {
    throw new Error(
      `useUniversityQuery must be used within a UniversityQueryContext`
    );
  }
  return context;
};

export { UniversityQueryProvider, useUniversityQuery };
