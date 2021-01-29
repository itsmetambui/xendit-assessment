import React from "react";
import { University } from "../types/university";
import { useLocalStorageState } from "../utils/hooks";

const FavoriteContext = React.createContext<{
  favoriteUniversities: University[];
  toggleFavorite: (university: University) => void;
}>({
  favoriteUniversities: [],
  toggleFavorite: (university: University) => {},
});

const FavoriteUniversitiesProvider = (props: Object) => {
  const [favorites, setFavorites] = useLocalStorageState<University[]>(
    "favorites",
    []
  );

  const toggleFavorite = (university: University) => {
    if (
      favorites.some(
        (fav) =>
          fav.name === university.name && fav.country === university.country
      )
    ) {
      const newFavorites = favorites.filter((fav) => {
        return fav.name !== university.name;
      });
      setFavorites(newFavorites);
    } else {
      setFavorites([...favorites, university]);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteUniversities: favorites,
        toggleFavorite,
      }}
      {...props}
    />
  );
};

const useFavoriteUniversities = () => {
  const context = React.useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error(
      `useFavoriteUniversities must be used within a FavoriteContext`
    );
  }
  return context;
};

export { FavoriteUniversitiesProvider, useFavoriteUniversities };
