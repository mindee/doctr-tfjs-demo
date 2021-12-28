import React from "react";
import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import logo from "../assets/logo.svg";
import doctrIcon from "../assets/doctr.svg";
import { COLORS, FONTS } from "@mindee/web-elements.assets";

const COMPONENT_ID = "MobileView";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {},
  logoContainer: {},
  logo: {
    height: 28,
  },
  icon: {
    width: 28,
    marginBottom: 4,
    height: 28,
  },
  link: {
    color: COLORS.blue,
    textDecoration: "underline",
  },
}));

export default function MobileView(): JSX.Element {
  const classes = useStyles();
  return (
    <Box
      flexDirection="column"
      id={COMPONENT_ID}
      className={classes.wrapper}
      display="flex"
      py="20px"
      px="24px"
      height="100vh"
    >
      <Box
        id={COMPONENT_ID}
        className={classes.logoContainer}
        display="flex"
        component="a"
        // @ts-ignore
        href="https://mindee.com"
        // @ts-ignore
        target="_blank"
      >
        <img className={classes.logo} src={logo} />
      </Box>
      <Box mb="40px" mt="60px" style={{ columnGap: 10 }} display="flex">
        <Typography style={{ fontSize: 24 }} variant="h2">
          Welcome to the docTR by mindee live demo page
        </Typography>
      </Box>
      <Typography
        style={{ lineHeight: 1.5, fontFamily: FONTS.regular, fontSize: 18 }}
      >
        This demo requires advanced capabilities and can’t be performed on
        mobile devices. <br /> <br />
        Please retry the demo on a computer. <br /> <br /> To know more about{" "}
        <a
          target="_blank"
          href="https://mindee.github.io/doctr/"
          className={classes.link}
        >
          docTR
        </a>{" "}
        check out the dedicated{" "}
        <a
          target="_blank"
          href="https://github.com/mindee/doctr"
          className={classes.link}
        >
          Github repository
        </a>
        .
      </Typography>
      <Typography variant="caption" style={{ fontSize: 14, marginTop: "auto" }}>
        Copyright © 2021 Mindee. All rights reserved
      </Typography>
    </Box>
  );
}
