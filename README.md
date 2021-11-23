# Doctr Tensorflow.js demo

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE) ![Build Status](https://github.com/mindee/doctr-tfjs-demo/workflows/builds/badge.svg)

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

The interface is divided into four sections:
- **Input Image** (top-left pannel): upload your image there by clicking in the area & selecting your file. Uploading a file will automatically run the OCR on it.
- **Text localization** (top-right pannel): the output of the text localization module.
- **Detected word boxes** (bottom-left pannel): visualization of the final predictions of the OCR.
- **Words** (bottom-right pannel): the list of all the detected words. If you hover a prediction on the bottom-left pannel, it will highlight the corresponding text prediction in this section.


## Getting started

### Prerequisites

In order to install this project, you will need [Yarn](https://classic.yarnpkg.com/lang/en/docs/install) and [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), which are package managers for [Node.js](https://nodejs.org/en/).

```shell
npm install -g serve
```

### Installation

This demo was built using [React](https://reactjs.org/), a framework for JavaScript development. This demo requires you to install the project from the source code, which will require you to install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). First clone the project repository:
```shell
git clone https://github.com/mindee/doctr-tfjs-demo.git
```

Then install the project's dependencies using the following command:

```shell
cd doctr-tfjs-demo
yarn install
```

### Running the app

#### Production mode

Alternatively, if you are looking at a production situation, first build the bundle and serve it:
```shell
yarn build
serve --no-clipboard -s build
```
then navigate to the URL with your favorite web browser

#### Development mode

Once all dependencies have been installed, launch the app using:
```shell
yarn start
```
and navigate with your web browser to the URL in the console.

### Using Docker container

Lucky for you, if you prefer working with containers, we provide a minimal Docker image. You can build it with:
```shell
DOCKER_BUILDKIT=1 docker build . -t doctr-tfjs:node12-alpine
```
and then run your image with:
```shell
docker run -p 8001:3000 doctr-tfjs:node12-alpine
```
Feel free to change the port, but by default, you should be able to access the demo at `http://localhost:8001/`.


## License

Distributed under the Apache 2.0 License. See [`LICENSE`](LICENSE) for more information.
