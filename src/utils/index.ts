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
import { Layer } from "konva/lib/Layer";
import randomColor from "randomcolor";
import { MutableRefObject } from "react";
import { AnnotationShape, Stage } from "react-mindee-js";
import {
  DET_MEAN,
  DET_STD,
  REC_MEAN,
  REC_STD,
  VOCAB,
} from "src/common/constants";
import { ModelConfig } from "src/common/types";
import { chunk } from "underscore";

export const loadRecognitionModel = async ({
  recognitionModel,
  recoConfig,
}: {
  recognitionModel: MutableRefObject<GraphModel | null>;
  recoConfig: ModelConfig;
}) => {
  try {
    recognitionModel.current = await loadGraphModel(recoConfig.path);
  } catch (error) {
    console.log(error);
  }
};

export const loadDetectionModel = async ({
  detectionModel,
  detConfig,
}: {
  detectionModel: MutableRefObject<GraphModel | null>;
  detConfig: ModelConfig;
}) => {
  try {
    detectionModel.current = await loadGraphModel(detConfig.path);
  } catch (error) {
    console.log(error);
  }
};

export const getImageTensorForRecognitionModel = (
  crops: HTMLImageElement[],
  size: [number, number]
) => {
  const list = crops.map((imageObject) => {
    let h = imageObject.height
    let w = imageObject.width
    let resize_target: any
    let padding_target: any
    let aspect_ratio = size[1] / size[0]
    if (aspect_ratio * h > w) {
        resize_target = [size[0], Math.round(size[0] * w / h)];
        padding_target = [[0, 0], [0, size[1] - Math.round(size[0] * w / h)], [0, 0]];
    } else {
        resize_target = [Math.round(size[1] * h / w), size[1]];
        padding_target = [[0, size[0] - Math.round(size[1] * h / w)], [0, 0], [0, 0]];
    }
    return browser
      .fromPixels(imageObject)
      .resizeNearestNeighbor(resize_target)
      .pad(padding_target, 0)
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
  size: [number, number]
) => {
  let tensor = browser
    .fromPixels(imageObject)
    .resizeNearestNeighbor(size)
    .toFloat();
  let mean = scalar(255 * DET_MEAN);
  let std = scalar(255 * DET_STD);
  return tensor.sub(mean).div(std).expandDims();
};

export const extractWords = async ({
  recognitionModel,
  stage,
  size,
}: {
  recognitionModel: GraphModel | null;
  stage: Stage;
  size: [number, number];
}) => {
  const crops = (await getCrops({ stage })) as Array<{
    id: string;
    crop: HTMLImageElement;
    color: string;
  }>;
  const chunks = chunk(crops, 16);
  return Promise.all(
    chunks.map(
      (chunk) =>
        new Promise(async (resolve) => {
          const words = await extractWordsFromCrop({
            recognitionModel,
            crops: chunk.map((elem) => elem.crop),
            size,
          });
          const collection = words?.map((word, index) => ({
            ...chunk[index],
            words: word ? [word] : [],
          }));
          resolve(collection);
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

export const getCrops = ({ stage }: { stage: Stage }) => {
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
          callback: (value: HTMLImageElement) => {
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
  size,
}: {
  recognitionModel: GraphModel | null;
  crops: any;
  size: [number, number];
}) => {
  if (!recognitionModel) {
    return;
  }
  let tensor = getImageTensorForRecognitionModel(crops, size);
  let predictions = await recognitionModel.executeAsync(tensor);

  //  @ts-ignore
  // @ts-ignore
  let probabilities = softmax(predictions, -1);
  let bestPath = unstack(argMax(probabilities, -1), 0);
  let blank = 126;
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
  size: [number, number];
}) =>
  new Promise(async (resolve) => {
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
  });
function clamp(number: number, size: number) {
  return Math.max(0, Math.min(number, size));
}

export const transformBoundingBox = (
  contour: any,
  size: [number, number]
): AnnotationShape => {
  let offset =
    (contour.width * contour.height * 1.5) /
    (2 * (contour.width + contour.height));
  const p1 = clamp(contour.x - offset, size[1]);
  const p2 = clamp(p1 + contour.width + 2 * offset, size[1]);
  const p3 = clamp(contour.y - offset, size[0]);
  const p4 = clamp(p3 + contour.height + 2 * offset, size[0]);
  return {
    id: "_" + Math.random().toString(36).substr(2, 9),
    config: {
      stroke: randomColor(),
    },
    coordinates: [
      [p1 / size[1], p3 / size[0]],
      [p2 / size[1], p3 / size[0]],
      [p2 / size[1], p4 / size[0]],
      [p1 / size[1], p4 / size[0]],
    ],
  };
};

export const extractBoundingBoxesFromHeatmap = (size: [number, number]) => {
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
