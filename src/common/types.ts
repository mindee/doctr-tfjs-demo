// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

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

export type ModelConfig = {
  value: string;
  label: string;
  height: number;
  width: number;
  path: string;
};
