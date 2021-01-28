const env = {
  API_URL: process.env.REACT_APP_API_URL || "http://localhost:3000",
};

export const API_URL: string | undefined = env.API_URL;
