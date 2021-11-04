import React from "react";
import {
  Box,
  CircularProgress,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";

const COMPONENT_ID = "WordsList";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "45vh",
  },
  list: {
    overflow: "hidden auto",
    height: "35vh",
  },
  item: {
    padding: 20,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  loader: {
    margin: "auto",
  },
}));

interface Props {
  words: string[];
  extractingWords: boolean;
}
export default function WordsList({
  words,
  extractingWords,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card header="Words" id={COMPONENT_ID} className={classes.wrapper}>
      <Grid container id={COMPONENT_ID} className={classes.list}>
        {extractingWords ? (
          <CircularProgress className={classes.loader} />
        ) : (
          words.map((word, key) => (
            <Grid className={classes.item} key={key} item xs={12}>
              <Typography key={key}>{word}</Typography>
            </Grid>
          ))
        )}
      </Grid>
    </Card>
  );
}
