# PaperPress Client
[PaperPress](https://github.com/seokju-na/paper-press)를 위한 클라이언트 사이드 앱. 성능을 위한 Web Worker와 Reactive한 데이터 흐름을 위한 디자인 설계로 이루어져 있습니다. 모든 코드들은 ES2015로 쓰여졌습니다.


> **브라우저 지원**: IE(X), Edge(O), Chrome(O), Firefox(O), Safari(O)


![Architecture](https://github.com/seokju-na/paper-press-client/blob/master/docs/imgs/Architecture.png)


* Web Worker를 사용하여 앱 상태(state), 로직, 가상 DOM의 렌더링을 UI 쓰레드로부터 Main 쓰레드로 분리하였습니다.
* 모든 코드들은 ES2015 문법으로 쓰여졌습니다.
* Main 쓰레드에서 앱의 상태(state)는 한 방향으로 흐르며 Observable하게 작동합니다. (Reactive한 아키텍처를 고려하였습니다.)
* [hjs-webpack](https://github.com/HenrikJoreteg/hjs-webpack)을 사용하였습니다.
* Reactive Programming을 위한 [Observer](https://github.com/seokju-na/paper-press-client/blob/master/src/utils/Observer.js)을 구현하였습니다.


## 시작하기

#### 1. 프로젝트 Clone

```shell
$ git clone https://github.com/seokju-na/paper-press-client.git
$ cd paper-press-client
```


#### 2. 의존 모듈 설치

```shell
$ npm install
```

#### 3. 실행 & 빌드
Webpack을 이용하여 프로젝트를 실행합니다.

```shell
$ npm run start
```


Webpack을 이용하여 프로젝트를 빌드합니다. 빌드된 파일들을 ``dist/``에 위치합니다.

```shell
$ npm run build
```


## 기술 스택

* [Web Worker](https://www.w3.org/TR/workers/)
* [ECMAScript6](http://www.ecma-international.org/publications/standards/Ecma-262.htm)
* [Virtual DOM](https://github.com/Matt-Esch/virtual-dom)
* [codemirror](http://codemirror.net)
* [webpack](https://webpack.github.io/)
* [Less](http://lesscss.org/)
* [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
* [Material Icons](https://design.google.com/icons/)


## 라이센스
MIT