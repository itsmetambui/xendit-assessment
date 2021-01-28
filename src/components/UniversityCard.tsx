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

const UniversityCard: FC<University> = ({
  name,
  websites = [],
  domains = [],
  country,
  countryCode,
  state,
}) => {
  return (
    <Card mb={6}>
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
