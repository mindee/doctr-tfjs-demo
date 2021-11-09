// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

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
import { Word } from "src/common/types";

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
    cursor: "pointer",
    padding: 5,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
    borderLeft: "3px solid transparent",
    "&:hover": {
      borderLeftWidth: 8,
    },
  },
  loader: {
    margin: "auto",
  },
}));

interface Props {
  words: Word[];
  extractingWords: boolean;
  onFieldMouseLeave: (word: Word) => void;
  onFieldMouseEnter: (word: Word) => void;
  fieldRefsObject: any[];
}
export default function WordsList({
  words,
  onFieldMouseEnter,
  onFieldMouseLeave,
  extractingWords,
  fieldRefsObject,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card
      header={`Words ${words.length ? `(${words.length})` : ""}`}
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      <Grid spacing={3} container id={COMPONENT_ID} className={classes.list}>
        {extractingWords ? (
          <CircularProgress className={classes.loader} />
        ) : (
          words.map((word, key) => (
            <Grid
              onMouseEnter={() => onFieldMouseEnter(word)}
              onMouseLeave={() => onFieldMouseLeave(word)}
              className={classes.item}
              key={key}
              item
              ref={fieldRefsObject[key]}
              xs={12}
              style={{
                borderLeftColor: word.color,
                borderLeftWidth: word.isActive ? 8 : undefined,
              }}
            >
              <Typography key={key}>{word.words.join(", ")}</Typography>
            </Grid>
          ))
        )}
      </Grid>
    </Card>
  );
}
