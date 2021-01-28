const env = {
  API_URL: process.env.REACT_APP_API_URL || "http://universities.hipolabs.com",
};

export const API_URL: string | undefined = env.API_URL;
