import React, { FC } from "react";
import styled from "styled-components/macro";

import {
  CardActionArea,
  CardActions,
  CardContent,
  Button as MuiButton,
  Card as MuiCard,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);
const Button = styled(MuiButton)(spacing);

const GUTTER_SIZE = 16;

type UniversityCardType = {
  name: string;
  websites: string[];
  domains: string[];
  country: string;
  state?: string;
  favorited?: boolean;
  handleAction?: () => void;
};

const UniversityCard: FC<
  UniversityCardType & { style: React.CSSProperties }
> = (university) => {
  const {
    name,
    websites = [],
    domains = [],
    country,
    state,
    handleAction,
    favorited = false,
    style,
  } = university;
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
          <Typography
            style={{ height: 42 }}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {name}
          </Typography>
          <Typography component="p" variant="body2">
            {state && <Typography component="span">{state} - </Typography>}
            <Typography component="span">{country}</Typography>
          </Typography>
          <Box mt={4}>
            <Grid container justify="space-between">
              <Grid item xs={6}>
                <Typography component="p" variant="subtitle2">
                  Domains
                </Typography>
                <Typography component="p">{domains[0]}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component="p" variant="subtitle2">
                  Websites
                </Typography>
                <Typography component="p">{websites[0]}</Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant={favorited ? "contained" : "outlined"}
          onClick={handleAction}
        >
          {favorited ? "Unfav" : "Fav"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default UniversityCard;
