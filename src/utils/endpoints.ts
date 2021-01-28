export const makeQueryString: (queryObject: object) => string = (
  queryObject
) => {
  const cleanedObject = { ...queryObject };
  Object.keys(cleanedObject).forEach(
    // @ts-ignore
    (key) => cleanedObject[key] === undefined && delete cleanedObject[key]
  );
  const queryString = new URLSearchParams(cleanedObject).toString();
  return queryString ? `?${queryString}` : "";
};

const endPoints = {
  login: () => "api/auth/sign-in",
  register: () => "api/auth/sign-up",
  getCurrentUser: () => "api/users/me",
};

export default endPoints;
