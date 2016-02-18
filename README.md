# PaperPress Client
Client side app for [PaperPress](https://github.com/seokju-na/paper-press), using web worker for performance and design to flow data reactive. All code written in ES2015.

> **Browser Support**: IE(X), Edge(O), Chrome(O), Firefox(O), Safari(O)

> Other Language of Document : [한국어](https://github.com/seokju-na/paper-press-client/blob/master/docs/Korean.md)

![Architecture](https://github.com/seokju-na/paper-press-client/blob/master/docs/imgs/Architecture.png)

* Separate app state, logic, and virtual DOM rendering from UI Thread to Main Thread using a Web Worker.
* All code is written in ES2015 and import other modules and npm modules.
* In Main Thread, app state flows in one direction and it's observable. (Considered architecture to be reactive)
* Use [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack). (Helpers/presets for setting up webpack with hotloading react and ES6(2015) using Babel)
* Implement [Observer](https://github.com/seokju-na/paper-press-client/blob/master/src/utils/Observer.js) for reactive programming.


## Get started

#### 1. Clone project

```shell
$ git clone https://github.com/seokju-na/paper-press-client.git
$ cd paper-press-client
```


#### 2. Install dependencie modules

```shell
$ npm install
```

#### 3. Run & Build
Run project by webpack.

```shell
$ npm run start
```


Build project by webpack. The build files will located in ``dist/``.

```shell
$ npm run build
```


## Stacks

* [Web Worker](https://www.w3.org/TR/workers/)
* [ECMAScript6](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
* [Virtual DOM](https://github.com/Matt-Esch/virtual-dom)
* [codemirror](http://codemirror.net)
* [webpack](https://webpack.github.io/)
* [Less](http://lesscss.org/)
* [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
* [Material Icons](https://design.google.com/icons/)


## License
MIT