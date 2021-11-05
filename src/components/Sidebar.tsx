import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";

const COMPONENT_ID = "Sidebar";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "95vh",
  },
}));

export default function Sidebar(): JSX.Element {
  const classes = useStyles();
  return (
    <Card
      header="Settings"
      id={COMPONENT_ID}
      className={classes.wrapper}
    ></Card>
  );
}
