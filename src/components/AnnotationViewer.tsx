// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Box, makeStyles, Theme } from "@material-ui/core";
import { COLORS, FONTS } from "@mindee/web-elements.assets";
import { Card } from "@mindee/web-elements.ui.card";
import { Typography } from "@mindee/web-elements.ui.typography";
import { Spinner } from "@mindee/web-elements.ui.spinner";
import {
  AnnotationData,
  AnnotationShape,
  AnnotationViewer as AnnotationViewerBase,
  Stage,
} from "react-mindee-js";
const COMPONENT_ID = "AnnotationViewer";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
  },
}));

interface Props {
  loadingImage: boolean;
  annotationData: AnnotationData;
  setAnnotationStage: (stage: Stage) => void;
  onShapeMouseEnter: (shape: AnnotationShape) => void;
  onShapeMouseLeave: (shape: AnnotationShape) => void;
  onShapeClick: (shape: AnnotationShape) => void;
}

export default function AnnotationViewer({
  setAnnotationStage,
  annotationData,
  onShapeMouseLeave,
  onShapeClick,
  loadingImage,
  onShapeMouseEnter,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card
      topBar
      id={COMPONENT_ID}
      contentStyle={{
        paddingTop: 15,
        height: "100%",
        display: "flex",
        width: "100%",
      }}
      header={
        <Typography
          style={{ fontFamily: FONTS.bold }}
          paragraph
          variant="subtitle1"
        >
          3 - Visualize word predictions
        </Typography>
      }
      className={classes.wrapper}
    >
      {loadingImage ? (
        <Spinner />
      ) : !annotationData.image ? (
        <Box
          height="465px"
          borderRadius="4px"
          border={`1px solid ${COLORS.border}`}
          display="flex"
          alignItems="center"
          width="100%"
          justifyContent="center"
        >
          <Typography variant="body2">No image uploaded yet</Typography>
        </Box>
      ) : (
        <AnnotationViewerBase
          onShapeMouseLeave={onShapeMouseLeave}
          onShapeMouseEnter={onShapeMouseEnter}
          onShapeClick={onShapeClick}
          data={annotationData}
          getStage={setAnnotationStage}
          style={{ height: "465px", width: "100%", background: "white" }}
        />
      )}
    </Card>
  );
}
