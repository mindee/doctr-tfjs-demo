// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

// Detection cfg

export const DET_MEAN = 0.785;
export const DET_STD = 0.275;
export const DET_SIZE = 512; // TODO: if heavy model selected, set this size to 1024

// Recognition cfg

export const REC_MEAN = 0.694;
export const REC_STD = 0.298;
export const REC_MODEL_URL = "models/crnn/model.json";
export const VOCAB =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~°àâéèêëîïôùûçÀÂÉÈËÎÏÔÙÛÇ£€¥¢฿";

export const DETECTION_MODEL_TYPE = {
  mobilenet: {
    value: "mobilenet",
    label: "MobileNet",
    path: "models/detection_mobilenet/model.json",
  },
  resnet: {
    value: "resnet",
    label: "ResNet",
    path: "models/detection_resnet/model.json",
  },
};
