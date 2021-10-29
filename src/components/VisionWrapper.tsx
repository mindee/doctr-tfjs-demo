import { Grid, makeStyles, Theme } from "@material-ui/core";
import { GraphModel } from "@tensorflow/tfjs";
import { useEffect, useRef, useState } from "react";
import { AnnotationData, Stage } from "react-mindee-js";
import {
  extractBoundingBoxesFromHeatmap,
  extractWords,
  getHeatMapFromImage,
  loadDetectionModel,
  loadRecognitionModel,
} from "src/utils";
import { UploadedFile } from "../common/types";
import AnnotationViewer from "./AnnotationViewer";
import HeatMap from "./HeatMap";
import ImageViewer from "./ImageViewer";
import WordsList from "./WordsList";

const COMPONENT_ID = "VisionWrapper";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100%",
  },
}));

export default function VisionWrapper(): JSX.Element {
  const classes = useStyles();
  const recognitionModel = useRef<GraphModel | null>(null);
  const detectionModel = useRef<GraphModel | null>(null);
  const imageObject = useRef<HTMLImageElement>(new Image());
  const heatMapContainerObject = useRef<HTMLCanvasElement | null>(null);
  const annotationStage = useRef<Stage | null>();
  const [extractingWords, setExtractingWords] = useState(false);
  const [annotationData, setAnnotationData] = useState<AnnotationData>({
    image: null,
  });
  const [words, setWords] = useState<string[]>([]);

  const onUpload = (newFile: UploadedFile) => {
    loadImage(newFile);
    setAnnotationData({ image: newFile.image });
  };

  useEffect(() => {
    loadRecognitionModel({ recognitionModel });
    loadDetectionModel({ detectionModel });
  }, []);

  const getBoundingBoxes = () => {
    const boundingBoxes = extractBoundingBoxesFromHeatmap();
    setAnnotationData({
      image: imageObject.current.src,
      shapes: boundingBoxes,
    });
    setTimeout(getWords, 1000);
  };

  const getWords = async () => {
    setExtractingWords(true);
    const words = await extractWords({
      recognitionModel: recognitionModel.current,
      stage: annotationStage.current!,
    });
    //@ts-ignore
    setWords(words.map((value) => value.value));
    setExtractingWords(false);
  };

  const loadImage = async (uploadedFile: UploadedFile) => {
    imageObject.current.onload = async () => {
      await getHeatMapFromImage({
        heatmapContainer: heatMapContainerObject.current,
        detectionModel: detectionModel.current,
        imageObject: imageObject.current,
      });
      getBoundingBoxes();
    };
    imageObject.current.src = uploadedFile?.image as string;
  };
  const setAnnotationStage = (stage: Stage) => {
    annotationStage.current = stage;
  };
  return (
    <Grid
      spacing={2}
      className={classes.wrapper}
      item
      id={COMPONENT_ID}
      container
    >
      <Grid item xs={6}>
        <ImageViewer
          uploadedImage={imageObject.current.src}
          onUpload={onUpload}
        />
      </Grid>
      <Grid item xs={6}>
        <HeatMap heatMapContainerRef={heatMapContainerObject} />
      </Grid>
      <Grid item xs={6}>
        <AnnotationViewer
          setAnnotationStage={setAnnotationStage}
          annotationData={annotationData}
        />
      </Grid>
      <Grid item xs={6}>
        <WordsList extractingWords={extractingWords} words={words} />
      </Grid>
    </Grid>
  );
}
