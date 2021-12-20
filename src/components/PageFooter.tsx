import React from "react";
import { Box, makeStyles, Theme } from "@material-ui/core";
import { Typography } from "@mindee/web-elements.ui.typography";

import linkedInIcon from "../assets/linkedin.svg";
import twitterIcon from "../assets/twitter.svg";
const COMPONENT_ID = "PageFooter";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  text: {
    fontSize: 14,
  },
}));

export default function PageFooter(): JSX.Element {
  const classes = useStyles();
  return (
    <Box
      justifyContent="space-between"
      id={COMPONENT_ID}
      height="80px"
      className={classes.wrapper}
      display="flex"
      py="27px"
    >
      <Typography variant="caption" className={classes.text}>
        Copyright 2021 Mindee. All rights reserved{" "}
      </Typography>
      <Box display="flex" style={{ columnGap: 30 }}>
        <Typography
          component="a"
          // @ts-ignore
          target="_blank"
          // @ts-ignore
          // @ts-ignore
          href="https://mindee.com/use-case/invoice-management"
          variant="caption"
          className={classes.text}
        >
          Invoice OCR
        </Typography>
        <Typography
          component="a"
          // @ts-ignore
          target="_blank"
          // @ts-ignore
          href="https://mindee.com/use-case/expense-management"
          variant="caption"
          className={classes.text}
        >
          Receipt OCR
        </Typography>
        <Typography
          // @ts-ignore
          target="_blank"
          // @ts-ignore
          component="a"
          // @ts-ignore
          href="https://mindee.com/lp/ocr-document-learning"
          variant="caption"
          className={classes.text}
        >
          API Builder
        </Typography>
      </Box>
      <Box display="flex" style={{ columnGap: 30 }}>
        <Typography
          // @ts-ignore
          target="_blank"
          component="a"
          // @ts-ignore
          href="https://mindee.com/terms"
          variant="caption"
          className={classes.text}
        >
          Terms
        </Typography>
        <Typography
          // @ts-ignore
          target="_blank"
          component="a"
          // @ts-ignore
          href="https://mindee.com/privacy-policy"
          variant="caption"
          className={classes.text}
        >
          Privacy
        </Typography>
        <Typography
          // @ts-ignore
          target="_blank"
          component="a"
          // @ts-ignore
          href="https://www.twitter.com/mindeeapi"
          variant="caption"
          className={classes.text}
        >
          <img src={twitterIcon} />
        </Typography>
        <Typography
          // @ts-ignore
          target="_blank"
          component="a"
          // @ts-ignore
          href="https://www.linkedin.com/company/mindee"
          variant="caption"
          className={classes.text}
        >
          <img src={linkedInIcon} />
        </Typography>
      </Box>
    </Box>
  );
}
