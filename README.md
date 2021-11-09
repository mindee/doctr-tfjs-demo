# Doctr Tensorflow.js demo

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

<img width="15%" align="left" src="https://github.com/teamMindee/tensorflow-js-demo/releases/download/v0.1-models/icon_doctr.gif">

<br/>

This project is based on [docTR](https://github.com/mindee/doctr).
It provides a end-to-end OCR built and trained with docTR, deployed with Tensorflow.js.

<br/><br/>

You can choose between 2 detection models:
- `db_resnet50`, high-resolution (heavier but stronger)
- `db_mobilenet_v2`, medium-resolution, (lighter if your computer can't deal with the heavier backbone)

The recognition model is the `crnn_vgg16_bn`.

All documentation about models can be found [here](https://mindee.github.io/doctr/models.html).

Models were loaded and trained with doctr, then converted to Tensorflow.js savedmodels format
with the `tensorflowjs_converter`.

The segmentation postprocessing is performed with OpenCV.js

This is what it looks like when you launch the app:

![demo](https://github.com/teamMindee/tensorflow-js-demo/releases/download/v0.1-models/demo.png)

## Use the interface

You need to upload an image (top-left window), and it will automatically run the OCR on the document.
The segmentation heatmap will be displayed on the top-right window, the word-level boxes will be diplayed
on the bottom-left window and the words will be displayed on the bottom-right window.


## Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run: `yarn install` to install yarn, and then `yarn start`to launch the react app.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## License

Distributed under the Apache 2.0 License. See [`LICENSE`](LICENSE) for more information.
