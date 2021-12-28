import { Box, makeStyles, Theme, Typography } from "@material-ui/core";
import { COLORS, FONTS } from "@mindee/web-elements.assets";
import { Card } from "@mindee/web-elements.ui.card";
import doctrIcon from "../assets/doctr.svg";
const COMPONENT_ID = "WelcomeMessage";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    marginBottom: 10,
  },
  link: {
    color: COLORS.blue,
    textDecoration: "underline",
  },
  icon: {
    width: 28,
    marginBottom: 4,
  },
}));

export default function WelcomeMessage(): JSX.Element {
  const classes = useStyles();
  return (
    <Card
      contentStyle={{
        rowGap: 20,
        display: "flex",
        flexDirection: "column",
      }}
      id={COMPONENT_ID}
      className={classes.wrapper}
    >
      <Box style={{ columnGap: 10 }} display="flex" alignItems="center">
        <img className={classes.icon} alt="logo" src={doctrIcon} />
        <Typography style={{ fontSize: 22 }} variant="h2">
          Welcome to the docTR by mindee live demo page
        </Typography>
      </Box>
      <Typography
        style={{ lineHeight: 2, fontFamily: FONTS.regular, fontSize: 16 }}
      >
        Upload an image and select models out{" "}
        <a
          target="_blank"
          href="https://mindee.github.io/doctr"
          className={classes.link}
        >
          docTR
        </a>{" "}
        leveraged by{" "}
        <a
          target="_blank"
          href="https://www.tensorflow.org/js"
          className={classes.link}
        >
          TensorFlow.js
        </a>{" "}
        to offer end-to-end OCR services, directly in your web browser.
        <br />
        To know more about{" "}
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
          Github repository.
        </a>
      </Typography>
    </Card>
  );
}
