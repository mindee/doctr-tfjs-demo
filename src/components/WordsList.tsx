import React from "react";
import {
  Box,
  CircularProgress,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

const COMPONENT_ID = "WordsList";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 8,
    background: "white",
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
    <Box
      height="45vh"
      display="flex"
      flexDirection="column"
      p={1}
      overflow="hidden auto"
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      {extractingWords ? (
        <CircularProgress />
      ) : (
        words.map((word, key) => <Typography key={key}>{word}</Typography>)
      )}
    </Box>
  );
}
