// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import React, { CSSProperties, ReactNode } from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { UploadedFile } from "../common/types";

const COMPONENT_ID = "Uploader";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    padding: 0,
  },
}));

interface Props {
  style: CSSProperties;
  children: ReactNode;
  onUpload: (file: UploadedFile) => void;
}

export default function Uploader({
  children,
  onUpload,
  style,
}: Props): JSX.Element {
  const classes = useStyles();
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((acceptedFile) => {
      onUpload({
        source: acceptedFile,
        image: URL.createObjectURL(acceptedFile),
      });
    });
  };
  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    onDrop,
    multiple: false,
  });
  return (
    <Box
      id={COMPONENT_ID}
      height="100%"
      width="100%"
      className={classes.wrapper}
      display="flex"
      style={style}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {children}
    </Box>
  );
}
