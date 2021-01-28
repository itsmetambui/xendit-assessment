import React, { FC } from "react";

const Logo: FC<{ height?: number | string; width?: number | string }> = ({
  height = "auto",
  width = "auto",
}) => (
  <img
    height={height}
    width={width}
    src="https://317927-1222945-1-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/11/xendit-logo-white.svg"
    alt="xendit"
  />
);

export default Logo;
