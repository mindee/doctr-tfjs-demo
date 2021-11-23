// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Grid, makeStyles, Theme } from "@material-ui/core";
import { GraphModel } from "@tensorflow/tfjs";
import { createRef, useEffect, useMemo, useRef, useState } from "react";
import {
  AnnotationData,
  AnnotationShape,
  drawLayer,
  drawShape,
  setShapeConfig,
  Stage,
} from "react-mindee-js";
import {
  extractBoundingBoxesFromHeatmap,
  extractWords,
  getHeatMapFromImage,
  loadDetectionModel,
  loadRecognitionModel,
} from "src/utils";
import { useStateWithRef } from "src/utils/hooks";
import { ModelConfig, UploadedFile, Word } from "../common/types";
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

interface Props {
  detConfig: ModelConfig;
  recoConfig: ModelConfig;
}

export default function VisionWrapper({
  detConfig,
  recoConfig,
}: Props): JSX.Element {
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
  const fieldRefsObject = useRef<any[]>([]);
  const [words, setWords, wordsRef] = useStateWithRef<Word[]>([]);

  const clearCurrentStates = () => {
    setWords([]);
  };

  const onUpload = (newFile: UploadedFile) => {
    clearCurrentStates();
    loadImage(newFile);
    setAnnotationData({ image: newFile.image });
  };

  useEffect(() => {
    setWords([]);
    setAnnotationData({ image: null });
    imageObject.current.src = "";
    if (heatMapContainerObject.current) {
      const context = heatMapContainerObject.current.getContext("2d");
      context?.clearRect(
        0,
        0,
        heatMapContainerObject.current.width,
        heatMapContainerObject.current.height
      );
    }
    loadRecognitionModel({ recognitionModel, recoConfig });
  }, [recoConfig]);

  useEffect(() => {
    setWords([]);
    setAnnotationData({ image: null });
    imageObject.current.src = "";
    if (heatMapContainerObject.current) {
      const context = heatMapContainerObject.current.getContext("2d");
      context?.clearRect(
        0,
        0,
        heatMapContainerObject.current.width,
        heatMapContainerObject.current.height
      );
    }
    loadDetectionModel({ detectionModel, detConfig });
  }, [detConfig]);

  const getBoundingBoxes = () => {
    const boundingBoxes = extractBoundingBoxesFromHeatmap(
      [detConfig.height, detConfig.width]
    );
    setAnnotationData({
      image: imageObject.current.src,
      shapes: boundingBoxes,
    });
    setTimeout(getWords, 1000);
  };

  const getWords = async () => {
    setExtractingWords(true);
    const words = (await extractWords({
      recognitionModel: recognitionModel.current,
      stage: annotationStage.current!,
      size: [recoConfig.height, recoConfig.width],
    })) as Word[];
    setWords(words);
    setExtractingWords(false);
  };

  const loadImage = async (uploadedFile: UploadedFile) => {
    imageObject.current.onload = async () => {
      await getHeatMapFromImage({
        heatmapContainer: heatMapContainerObject.current,
        detectionModel: detectionModel.current,
        imageObject: imageObject.current,
        size: [detConfig.height, detConfig.width],
      });
      getBoundingBoxes();
    };
    imageObject.current.src = uploadedFile?.image as string;
  };
  const setAnnotationStage = (stage: Stage) => {
    annotationStage.current = stage;
  };

  const onFieldMouseLeave = (word: Word) => {
    drawShape(annotationStage.current!, word.id, {
      fill: `${word.color}33`,
    });
  };
  const onFieldMouseEnter = (word: Word) => {
    setShapeConfig(annotationStage.current!, word.id, {
      fill: "transparent",
    });

    drawLayer(annotationStage.current!);
  };
  const onShapeMouseEnter = (shape: AnnotationShape) => {
    const newWords = [...wordsRef.current];
    const fieldIndex = newWords.findIndex((word) => word.id === shape.id);
    if (fieldIndex >= 0) {
      newWords[fieldIndex].isActive = true;
      setWords(newWords);
    }
  };
  const onShapeMouseLeave = (shape: AnnotationShape) => {
    const newWords = [...wordsRef.current];
    const fieldIndex = newWords.findIndex((word) => word.id === shape.id);
    if (fieldIndex >= 0) {
      newWords[fieldIndex].isActive = false;
      setWords(newWords);
    }
  };
  fieldRefsObject.current = useMemo(
    () => words.map((word) => createRef()),
    [words]
  );
  const onShapeClick = (shape: AnnotationShape) => {
    const fieldIndex = wordsRef.current.findIndex(
      (word) => word.id === shape.id
    );

    if (fieldIndex >= 0) {
      fieldRefsObject.current[fieldIndex]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
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
          onShapeMouseEnter={onShapeMouseEnter}
          onShapeMouseLeave={onShapeMouseLeave}
          onShapeClick={onShapeClick}
        />
      </Grid>
      <Grid item xs={6}>
        <WordsList
          fieldRefsObject={fieldRefsObject.current}
          onFieldMouseLeave={onFieldMouseLeave}
          onFieldMouseEnter={onFieldMouseEnter}
          extractingWords={extractingWords}
          words={words}
        />
      </Grid>
    </Grid>
  );
}
