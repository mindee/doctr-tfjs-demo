import { Box, makeStyles, Theme } from "@material-ui/core";
import { MutableRefObject } from "react";
import { HEATMAP_CANVAS_ID } from "src/common/constants";

const COMPONENT_ID = "HeatMap";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 8,
    background: "white",
  },
  image: {
    height: "100%",
    width: "100%",
  },
}));

interface Props {
  heatMapContainerRef: MutableRefObject<HTMLCanvasElement | null>;
}

export default function HeatMap({ heatMapContainerRef }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Box height="45vh" p={1} className={classes.wrapper} id={COMPONENT_ID}>
      <canvas
        className={classes.image}
        id="heatmap"
        ref={heatMapContainerRef}
      />
      <canvas className={classes.image} id="dist" />
    </Box>
  );
}
