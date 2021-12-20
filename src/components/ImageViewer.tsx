// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import Uploader from "./Uploader";
import { UploadedFile } from "../common/types";

import placeholder from "../assets/image-placeholder.svg";
import { FONTS } from "@mindee/web-elements.assets";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: "100%",
  },
  image: {
    height: 200,
    width: "100%",
    objectFit: "contain",
  },
  placeholder: {
    height: 100,
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
      <Typography
        style={{ fontFamily: FONTS.bold, marginBottom: 20 }}
        paragraph
        variant="subtitle1"
      >
        2 Upload and image
      </Typography>
      <Uploader
        style={{ height: "250px", justifyContent: "center" }}
        onUpload={onUpload}
      >
        {uploadedImage.width ? (
          <img alt="viewer" className={classes.image} src={uploadedImage.src} />
        ) : (
          <Box
            border="1px solid #E6E9EC"
            borderRadius="4px"
            justifyContent="center"
            display="flex"
            width="100%"
            alignItems="center"
            flexDirection="column"
            style={{ rowGap: 10 }}
          >
            <img
              alt="placeholder"
              src={placeholder}
              className={classes.placeholder}
            />
            <Typography align="center" style={{ fontSize: 15 }} variant="body2">
              Upload an image <br />
              (.jpg, png, jpeg, .bmp)
            </Typography>
          </Box>
        )}
      </Uploader>
    </Box>
  );
}
