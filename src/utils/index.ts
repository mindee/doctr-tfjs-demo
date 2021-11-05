import cv from "@techstark/opencv-js";
import {
  argMax,
  browser,
  getBackend,
  GraphModel,
  loadGraphModel,
  Rank,
  scalar,
  setBackend,
  softmax,
  squeeze,
  Tensor,
  TensorLike,
  transpose,
} from "@tensorflow/tfjs";
import { Layer } from "konva/lib/Layer";
import randomColor from "randomcolor";
import { MutableRefObject } from "react";
import { AnnotationShape, Stage } from "react-mindee-js";
import { VOCAB } from "src/common/constants";

export const loadRecognitionModel = async ({
  recognitionModel,
}: {
  recognitionModel: MutableRefObject<GraphModel | null>;
}) => {
  try {
    recognitionModel.current = await loadGraphModel("models/crnn/model.json");
  } catch (error) {
    console.log(error);
  }
};

export const loadDetectionModel = async ({
  detectionModel,
}: {
  detectionModel: MutableRefObject<GraphModel | null>;
}) => {
  try {
    detectionModel.current = await loadGraphModel(
      "models/detection/model.json"
    );
  } catch (error) {
    console.log(error);
  }
};

export const getImageTensorForRecognitionModel = (
  imageObject: HTMLImageElement
) => {
  let tensor = browser
    .fromPixels(imageObject)
    .resizeNearestNeighbor([32, 128])
    .toFloat();
  let offset = scalar(127.5);
  return tensor.sub(offset).div(offset).expandDims();
};

export const getImageTensorForDetectionModel = (
  imageObject: HTMLImageElement
) => {
  let tensor = browser
    .fromPixels(imageObject)
    .resizeNearestNeighbor([512, 512])
    .toFloat();
  let offset = scalar(127.5);
  return tensor.sub(offset).div(offset).expandDims();
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
    crop: string;
    color: string;
  }>;

  return Promise.all(
    crops.map(
      (crop) =>
        new Promise((resolve) => {
          const imageObject = new Image();
          imageObject.onload = async () => {
            const words = await extractWordsFromCrop({
              recognitionModel,
              imageObject,
            });
            resolve({ id: crop.id, words, color: crop.color });
          };
          imageObject.src = crop.crop;
        })
    )
  );
};

const getCrops = ({ stage }: { stage: Stage }) => {
  const layer = stage.findOne<Layer>("#shapes-layer");
  const polygons = layer.find(".shape");
  return Promise.all(
    polygons.map((polygon) => {
      const clientRect = polygon.getClientRect();
      return new Promise((resolve) => {
        stage.toDataURL({
          ...clientRect,
          quality: 1,
          pixelRatio: 3,
          callback: (value: string) => {
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
  imageObject,
}: {
  recognitionModel: GraphModel | null;
  imageObject: HTMLImageElement;
}) => {
  if (!recognitionModel) {
    return;
  }
  let tensor = getImageTensorForRecognitionModel(imageObject);
  let predictions = await recognitionModel.executeAsync(tensor);
  // @ts-ignore
  let probabilities = softmax(predictions, -1);
  let bestPath = [argMax(probabilities, -1)];
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
}: {
  detectionModel: GraphModel | null;
  heatmapContainer: HTMLCanvasElement | null;
  imageObject: HTMLImageElement;
}) =>
  new Promise(async (resolve) => {
    {
      if (!heatmapContainer && !detectionModel) {
        return;
      }

      heatmapContainer!.width = imageObject.width;
      heatmapContainer!.height = imageObject.height;
      let tensor = getImageTensorForDetectionModel(imageObject);
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
function clamp(number: number) {
  return Math.max(0, Math.min(number, 512));
}

export const transformBoundingBox = (contour: any): AnnotationShape => {
  let offset =
    (contour.width * contour.height * 1.5) /
    (2 * (contour.width + contour.height));
  const p1 = clamp(contour.x - offset);
  const p2 = clamp(p1 + contour.width + 2 * offset);
  const p3 = clamp(contour.y - offset);
  const p4 = clamp(p3 + contour.height + 2 * offset);
  return {
    id: "_" + Math.random().toString(36).substr(2, 9),
    config: {
      stroke: randomColor(),
    },
    coordinates: [
      [p1 / 512, p3 / 512],
      [p2 / 512, p3 / 512],
      [p2 / 512, p4 / 512],
      [p1 / 512, p4 / 512],
    ],
  };
};

export const extractBoundingBoxesFromHeatmap = () => {
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
    boundingBoxes.push(transformBoundingBox(cv.boundingRect(contours.get(i))));
  }
  src.delete();
  contours.delete();
  hierarchy.delete();
  return boundingBoxes;
};
