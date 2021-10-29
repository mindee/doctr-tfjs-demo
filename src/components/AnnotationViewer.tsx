import { Box, makeStyles, Theme } from "@material-ui/core";
import {
  AnnotationData,
  AnnotationViewer as AnnotationViewerBase,
  Stage,
} from "react-mindee-js";
const COMPONENT_ID = "AnnotationViewer";

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
  annotationData: AnnotationData;
  setAnnotationStage: (stage: Stage) => void;
}

export default function AnnotationViewer({
  setAnnotationStage,
  annotationData,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Box
      height="45vh"
      display="flex"
      flexDirection="column"
      p={1}
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      <AnnotationViewerBase
        data={annotationData}
        getStage={setAnnotationStage}
        style={{ height: "100%", width: "100%" }}
      />
    </Box>
  );
}
