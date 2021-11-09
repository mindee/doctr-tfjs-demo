// Copyright (C) 2021, Mindee.

// This program is licensed under the Apache License version 2.
// See LICENSE or go to <https://www.apache.org/licenses/LICENSE-2.0.txt> for full license details.

import { Box, colors, makeStyles, Theme } from "@material-ui/core";
import Uploader from "./Uploader";
import { UploadedFile } from "../common/types";
import { Card } from "@mindee/web-elements.ui.card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  image: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  placeholder: {
    border: `1px solid ${theme.palette.grey[200]}`,
    height: 200,
    width: "100%",
    borderRadius: 8,
    cursor: "pointer",
  },
}));

interface Props {
  uploadedImage: string;
  onUpload: (file: UploadedFile) => void;
}

export default function ImageViewer({
  onUpload,
  uploadedImage,
}: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Card header="Input image" className={classes.wrapper}>
      <Uploader style={{ height: "35vh" }} onUpload={onUpload}>
        {uploadedImage ? (
          <img alt="viewer" className={classes.image} src={uploadedImage} />
        ) : (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            className={classes.placeholder}
          >
            <FontAwesomeIcon
              color={colors.grey[300]}
              size="6x"
              icon={faUpload}
            />
          </Box>
        )}
      </Uploader>
    </Card>
  );
}
