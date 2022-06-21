# Sizefy: Image Processing API

Nodejs powerfull API to resize jpg images to unlimited dimensionsprovided with the following features.

Request check: validate teh request to make sure all requested parameters are valid. i.e validate there is an image name , width and a height, Validate the dimentions are greater than zero.

Cach check: In case the image is previously resized, it should have been cached and the api provide it preserving the cost of re-processing it again.

### API Endpoint

http://localhost:{port}/image?name={imageName.jpg}&width={newWidth}&height={newHeight}

### Instructions

- To install the project run:

```
yarn install

```

- To start the project run:

```
yarn start

```

- To run the unit testing:

```
yarn test

```

- To build run:

```
yarn build

```

- Write the endpoint url as mentioned above, and replace values in curly braces with your values. (default port number used is 3000)
  Example:

http://localhost:3000/image?name=fjord.jpg&width=500&height=300

- Image must be a jpg image.
- The images to be resized should be in 📁assets at the root directory of the project.
- The resized image will be inside 📁assets-resized inside the assets folder.
- The resized image should have the name {width}-{height}-imageName.jpg. For example if the image name was `fjord.jpg`, the resized 200 x 300 image name will be `200-300-fjord.jpg`.

```

```
