import React from "react";

const UniversityQueryContext = React.createContext<{
  searchTerm: string;
  handleUniversitiesSearch: (term: string) => void;
}>({
  searchTerm: "",
  handleUniversitiesSearch: (term) => {},
});

const UniversityQueryProvider = (props: Object) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleUniversitiesSearch = (term: string) => {
    setSearchTerm(term);
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
