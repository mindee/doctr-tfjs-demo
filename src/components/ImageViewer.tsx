import { Box, makeStyles, Theme } from "@material-ui/core";
import Uploader from "./Uploader";
import { UploadedFile } from "../common/types";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: 8,
    background: "white",
  },
  image: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
  },
  placeholder: {},
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
    <Uploader onUpload={onUpload}>
      <Box
        className={classes.wrapper}
        height="45vh"
        display="flex"
        width="100%"
        flexDirection="column"
        p={1}
      >
        {uploadedImage ? (
          <img alt="viewer" className={classes.image} src={uploadedImage} />
        ) : (
          <Box className={classes.placeholder}></Box>
        )}
      </Box>
    </Uploader>
  );
}
