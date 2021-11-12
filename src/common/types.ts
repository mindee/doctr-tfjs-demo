// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { DETECTION_MODEL_TYPE } from "./constants";
export type UploadedFile = {
  source: File;
  image: string;
};

export type Word = {
  id: string;
  words: string[];
  color: string;
  isActive?: boolean;
};

export type DetectionModelType = typeof DETECTION_MODEL_TYPE.mobilenet;
