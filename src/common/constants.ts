// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

// Detection cfg

export const DET_MEAN = 0.785;
export const DET_STD = 0.275;

export const DET_MODEL_TYPE = {
  db_mobilenet_v2: {
    value: "db_mobilenet_v2",
    label: "DB (MobileNet V2)",
    height: 512,
    width: 512,
    path: "models/db_mobilenet_v2/model.json",
  },
  db_resnet50: {
    value: "db_resnet50",
    label: "DB (ResNet-50)",
    height: 1024,
    width: 1024,
    path: "models/db_resnet50/model.json",
  },
};

// Recognition cfg

export const REC_MEAN = 0.694;
export const REC_STD = 0.298;

export const RECO_MODEL_TYPE = {
  crnn_vgg16_bn: {
    value: "crnn_vgg16_bn",
    label: "CRNN (VGG16-bn)",
    height: 32,
    width: 128,
    path: "models/crnn_vgg16_bn/model.json",
  },
};

export const REC_SIZE = 32
export const VOCAB =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~°àâéèêëîïôùûçÀÂÉÈËÎÏÔÙÛÇ£€¥¢฿";
