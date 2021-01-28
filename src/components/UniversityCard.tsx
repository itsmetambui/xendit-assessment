import React, { FC } from "react";
import styled from "styled-components/macro";

import {
  CardActionArea,
  CardActions,
  CardContent,
  Button as MuiButton,
  Card as MuiCard,
  Typography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { v4 as uuidv4 } from "uuid";
import { University } from "../types/university";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);

const GUTTER_SIZE = 16;

const UniversityCard: FC<University & { style: React.CSSProperties }> = ({
  name,
  websites = [],
  domains = [],
  country,
  countryCode,
  state,
  style,
}) => {
  return (
    <Card
      mb={6}
      style={{
        ...style,
        left: Number(style?.left) + GUTTER_SIZE,
        top: Number(style?.top) + GUTTER_SIZE,
        width: Number(style?.width) - GUTTER_SIZE,
        height: Number(style?.height) - GUTTER_SIZE,
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name} - {countryCode}
          </Typography>
          <Typography component="p">
            {state && <Typography component="span">{state} - </Typography>}
            <Typography component="span">{country}</Typography>
          </Typography>
          {websites.map((website) => (
            <Typography key={`${website}-${uuidv4()}`} component="p">
              {website}
            </Typography>
          ))}
          {domains.map((domain) => (
            <Typography key={`${domain}-${uuidv4()}`} component="p">
              {domain}
            </Typography>
          ))}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Like
        </Button>
      </CardActions>
    </Card>
  );
};

export default UniversityCard;
