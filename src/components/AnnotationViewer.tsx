import { Box, makeStyles, Theme } from "@material-ui/core";
import { Card } from "@mindee/web-elements.ui.card";
import {
  AnnotationData,
  AnnotationViewer as AnnotationViewerBase,
  Stage,
} from "react-mindee-js";
const COMPONENT_ID = "AnnotationViewer";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "45vh",
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
    <Card
      header="Annotation viewer"
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      <AnnotationViewerBase
        data={annotationData}
        getStage={setAnnotationStage}
        style={{ height: "35vh", width: "100%", background: "white" }}
      />
    </Card>
  );
}
