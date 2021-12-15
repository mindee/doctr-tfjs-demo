// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import Uploader from "./Uploader";
import { UploadedFile } from "../common/types";

import placeholder from "../assets/placeholder.jpg";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  image: {
    height: 200,
    width: "100%",
    objectFit: "contain",
  },
  placeholder: {
    border: `1px solid ${theme.palette.grey[200]}`,
    height: 200,
    borderRadius: 8,
    objectFit: "contain",
    cursor: "pointer",
  },
}));

interface Props {
  uploadedImage: any;
  onUpload: (file: UploadedFile) => void;
}

export default function ImageViewer({
  onUpload,
  uploadedImage,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography paragraph variant="h2">
        Image
      </Typography>
      <Uploader
        style={{ height: "35vh", justifyContent: "center" }}
        onUpload={onUpload}
      >
        {uploadedImage.width ? (
          <img alt="viewer" className={classes.image} src={uploadedImage.src} />
        ) : (
          <img
            alt="placeholder"
            src={placeholder}
            className={classes.placeholder}
          />
        )}
      </Uploader>
    </Box>
  );
}
