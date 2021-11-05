# Doctr Tensorflow.js demo

This project is based on [Doctr](https://github.com/mindee/doctr).
It provides a end-to-end OCR built and trained with doctr, deployed with Tensorflow.js.

You can choose between 2 detection models:
- `db_resnet50`, high-resolution (heavier but stronger)
- `db_mobilenet_v2`, medium-resolution, (lighter if your computer can't deal with the heavier backbone)

The recognition model is the `crnn_vgg16_bn`.

All documentation about models can be found [here](https://mindee.github.io/doctr/models.html).

Models were loaded and trained with doctr, then converted to Tensorflow.js savedmodels format
with the `tensorflowjs_converter`.

The segmentation postprocessing is performed with OpenCV.js


### Use the interface

You need to upload an image (top-left window), and it will automatically run the OCR on the document.
The segmentation heatmap will be displayed on the top-right window, the word-level boxes will be diplayed
on the bottom-left window and the words will be displayed on the bottom-right window.
 

## Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
