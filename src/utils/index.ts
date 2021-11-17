// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import cv from "@techstark/opencv-js";
import {
  argMax,
  browser,
  concat,
  GraphModel,
  loadGraphModel,
  scalar,
  softmax,
  squeeze,
  unstack,
} from "@tensorflow/tfjs";
// @ts-ignore
import combineImage from "merge-images";
import { Layer } from "konva/lib/Layer";
import randomColor from "randomcolor";
import { MutableRefObject } from "react";
import { AnnotationShape, Stage } from "react-mindee-js";
import {
  DET_MEAN,
  DET_STD,
  REC_MEAN,
  REC_STD,
  REC_MODEL_URL,
  VOCAB,
} from "src/common/constants";
import { DetectionModelType } from "src/common/types";
import { chunk } from "underscore";

export const loadRecognitionModel = async ({
  recognitionModel,
}: {
  recognitionModel: MutableRefObject<GraphModel | null>;
}) => {
  try {
    recognitionModel.current = await loadGraphModel(REC_MODEL_URL);
  } catch (error) {
    console.log(error);
  }
};

export const loadDetectionModel = async ({
  detectionModel,
  detectionModelType,
}: {
  detectionModel: MutableRefObject<GraphModel | null>;
  detectionModelType: DetectionModelType;
}) => {
  try {
    detectionModel.current = await loadGraphModel(detectionModelType.path);
  } catch (error) {
    console.log(error);
  }
};

export const getImageTensorForRecognitionModel = (crops: any) => {
  const list = crops.map((crop: any) => {
    return browser
      .fromPixels(crop.crop)
      .resizeNearestNeighbor([32, 128])
      .toFloat()
      .expandDims();
  });
  const tensor = concat(list);
  let mean = scalar(255 * REC_MEAN);
  let std = scalar(255 * REC_STD);
  return tensor.sub(mean).div(std);
};

export const getImageTensorForDetectionModel = (
  imageObject: HTMLImageElement,
  size: number
) => {
  let tensor = browser
    .fromPixels(imageObject)
    .resizeNearestNeighbor([size, size])
    .toFloat();
  let mean = scalar(255 * DET_MEAN);
  let std = scalar(255 * DET_STD);
  return tensor.sub(mean).div(std).expandDims();
};

export const extractWords = async ({
  recognitionModel,
  stage,
}: {
  recognitionModel: GraphModel | null;
  stage: Stage;
}) => {
  const crops = (await getCrops({ stage })) as Array<{
    id: string;
    crop: HTMLImageElement;
    color: string;
  }>;
  const chunks = chunk(crops, 64);
  return Promise.all(
    [chunks[0]].map(
      (chunk) =>
        new Promise(async (resolve) => {
          const words = await extractWordsFromCrop({
            recognitionModel,
            crops: chunk,
          });
          console.log(words);
          //   resolve({ id: crop.id, words, color: crop.color });
        })
    )
  );
};

export const dataURItoBlob = (dataURI: string) => {
  let byteString;
  const splitDataURL = dataURI.split(",");
  if (splitDataURL[0].indexOf("base64") >= 0) {
    // atob decodes base64 data
    byteString = atob(splitDataURL[1]);
  } else {
    byteString = decodeURI(dataURI.split(",")[1]);
  }

  const mimeString = splitDataURL[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

const getCrops = ({ stage }: { stage: Stage }) => {
  const layer = stage.findOne<Layer>("#shapes-layer");
  const polygons = layer.find(".shape");
  return Promise.all(
    polygons.map((polygon) => {
      const clientRect = polygon.getClientRect();
      return new Promise((resolve) => {
        stage.toImage({
          ...clientRect,
          quality: 1,
          pixelRatio: 3,
          callback: (value: any) => {
            resolve({
              id: polygon.id(),
              crop: value,
              color: polygon.getAttr("stroke"),
            });
          },
        });
      });
    })
  );
};

export const extractWordsFromCrop = async ({
  recognitionModel,
  crops,
}: {
  recognitionModel: GraphModel | null;
  crops: any;
}) => {
  if (!recognitionModel) {
    return;
  }
  console.log("before tensor");
  let tensor = getImageTensorForRecognitionModel(crops);
  console.log("after tensor");
  let predictions = await recognitionModel.executeAsync(tensor);

  //  @ts-ignore
  console.log(predictions.shape);
  // @ts-ignore
  let probabilities = softmax(predictions, -1);
  let bestPath = unstack(argMax(probabilities, -1), 0);
  console.log(bestPath);
  let blank = 123;
  var words = [];
  for (const sequence of bestPath) {
    let collapsed = "";
    let added = false;
    const values = sequence.dataSync();
    const arr = Array.from(values);
    for (const k of arr) {
      if (k === blank) {
        added = false;
      } else if (k !== blank && added === false) {
        collapsed += VOCAB[k];
        added = true;
      }
    }
    words.push(collapsed);
  }
  return words;
};

export const getHeatMapFromImage = async ({
  heatmapContainer,
  detectionModel,
  imageObject,
  size,
}: {
  detectionModel: GraphModel | null;
  heatmapContainer: HTMLCanvasElement | null;
  imageObject: HTMLImageElement;
  size: number;
}) =>
  new Promise(async (resolve) => {
    {
      if (!heatmapContainer && !detectionModel) {
        return;
      }

      heatmapContainer!.width = imageObject.width;
      heatmapContainer!.height = imageObject.height;
      let tensor = getImageTensorForDetectionModel(imageObject, size);
      let prediction: any = await detectionModel?.execute(tensor);
      // @ts-ignore
      prediction = squeeze(prediction, 0);
      if (Array.isArray(prediction)) {
        prediction = prediction[0];
      }
      // @ts-ignore
      await browser.toPixels(prediction, heatmapContainer);
      resolve("test");
    }
  });
function clamp(number: number, size: number) {
  return Math.max(0, Math.min(number, size));
}

export const transformBoundingBox = (
  contour: any,
  size: number
): AnnotationShape => {
  let offset =
    (contour.width * contour.height * 1.5) /
    (2 * (contour.width + contour.height));
  const p1 = clamp(contour.x - offset, size);
  const p2 = clamp(p1 + contour.width + 2 * offset, size);
  const p3 = clamp(contour.y - offset, size);
  const p4 = clamp(p3 + contour.height + 2 * offset, size);
  return {
    id: "_" + Math.random().toString(36).substr(2, 9),
    config: {
      stroke: randomColor(),
    },
    coordinates: [
      [p1 / size, p3 / size],
      [p2 / size, p3 / size],
      [p2 / size, p4 / size],
      [p1 / size, p4 / size],
    ],
  };
};

export const extractBoundingBoxesFromHeatmap = (size: number) => {
  let src = cv.imread("heatmap");
  cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(src, src, 77, 255, cv.THRESH_BINARY);
  cv.morphologyEx(src, src, cv.MORPH_OPEN, cv.Mat.ones(2, 2, cv.CV_8U));
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  // You can try more different parameters
  cv.findContours(
    src,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE
  );
  // draw contours with random Scalar
  const boundingBoxes = [];
  // @ts-ignore
  for (let i = 0; i < contours.size(); ++i) {
    const contourBoundingBox = cv.boundingRect(contours.get(i));
    if (contourBoundingBox.width > 2 && contourBoundingBox.height > 2) {
      boundingBoxes.push(transformBoundingBox(contourBoundingBox, size));
    }
  }
  src.delete();
  contours.delete();
  hierarchy.delete();
  return boundingBoxes;
};
