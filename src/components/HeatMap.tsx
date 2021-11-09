import { Box, makeStyles, Theme } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";
import { MutableRefObject } from "react";

const COMPONENT_ID = "HeatMap";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  image: {
    height: "34vh",
    width: "100%",
  },
}));

interface Props {
  heatMapContainerRef: MutableRefObject<HTMLCanvasElement | null>;
}

export default function HeatMap({ heatMapContainerRef }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card header="Text localization (segmentation)" id={COMPONENT_ID}>
      <canvas
        className={classes.image}
        id="heatmap"
        ref={heatMapContainerRef}
      />
    </Card>
  );
}
