import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";

const COMPONENT_ID = "Sidebar";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
}));

export default function Sidebar(): JSX.Element {
  const classes = useStyles();
  return (
    <Box id={COMPONENT_ID} className={classes.wrapper} display="flex"></Box>
  );
}
