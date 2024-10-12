# GIT branch 컨벤션

```text
main
|---- develop
    |---- FE
        |---- {feature}/{기능설명}/{이슈번호}
    |---- BE
        |---- member/main
			      |---- feature/{기능설명}/{이슈번호}
        |---- account/main
			      |---- feature/{기능설명}/{이슈번호}
        |---- club/main
			      |---- feature/{기능설명}/{이슈번호}
        |---- notification/main
			      |---- feature
        |---- posting/main
			      |---- feature/{기능설명}/{이슈번호}
        |---- schedule/main
			      |---- feature/{기능설명}/{이슈번호}


예시
- feature/login/105
```

# GIT commit 컨벤션

| Tag Name | Description                                                           |
| :------: | :-------------------------------------------------------------------- |
|   feat   | 새로운 기능을 추가                                                    |
|  modify  | 기존 개발한 기능 변경                                                 |
|   fix    | 버그 수정                                                             |
|  design  | CSS 등 사용자 UI 디자인 변경                                          |
| refactor | 프로덕션 코드 리팩토링                                                |
| comment  | 필요한 주석 추가 및 변경                                              |
|   docs   | 문서 수정                                                             |
|   test   | 테스트 코드, 리펙토링 테스트 코드 추가,실제로 사용하는 코드 변경 없음 |
|  rename  | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                    |
|  remove  | 파일을 삭제하는 작업만 수행한 경우                                    |

# PR 컨벤션

1. **PR 제목**:
   - `타입 : 커밋 메시지 (S11P21A605-이슈번호)`
2. **PR 본문**:

   - **변경 사항**: 변경된 주요 사항 설명
   - **왜 필요한가?**: 변경이 필요한 이유 설명
   - **체크리스트**:
     - [ ] 코드가 올바르게 작동하는지 확인
     - [ ] 새로운 테스트가 추가되었거나 기존 테스트가 수정되었는지 확인
     - [ ] 관련 문서가 업데이트 되었는지 확인

3. **예시**:

```text
### 변경 사항
로그인 기능을 추가했습니다.

### 왜 필요한가?
사용자 인증을 위해 로그인 기능이 필요합니다.

### 체크리스트
- [x] 코드가 올바르게 작동하는지 확인
- [x] 새로운 테스트가 추가되었거나 기존 테스트가 수정되었는지 확인
- [x] 관련 문서가 업데이트 되었는지 확인
```



<h1 align="center">
  Vite Template React
</h1>

<p align="center">
  <a href="https://github.com/SafdarJamal/vite-template-react/releases">
    <img src="https://img.shields.io/github/v/release/SafdarJamal/vite-template-react" alt="GitHub Release (latest by date)" />
  </a>
  <a href="https://github.com/SafdarJamal/vite-template-react/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/SafdarJamal/vite-template-react" alt="License" />
  </a>
</p>

<p align="center">
    A <a href="https://vitejs.dev">Vite</a> + <a href="https://react.dev">React</a> starter template.
</p>

![Vite Template React](https://github.com/SafdarJamal/vite-template-react/assets/48409548/4b1eb99e-01b8-4752-91c0-76930e7948c1)

## Folder Structure

No configuration or complicated folder structures, just the files you need to build your app:

```
vite-template-react
├── node_modules
├── public
│   ├── favicon.svg
│   └── robots.txt
└── src
    ├── App.css
    ├── App.jsx
    ├── App.test.jsx
    ├── index.css
    ├── index.jsx
    └── logo.svg
    └── setupTests.js
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
```

## Development

To get a local copy of the code, clone it using git:

```
git clone https://github.com/SafdarJamal/vite-template-react.git
cd vite-template-react
```

Make it your own:

```
rm -rf .git && git init && npm init
git add .
git commit -m "Initial commit"
```

Install dependencies:

```
npm i
```

Now, you can start a local web server by running:

```
npm start
```

And then open http://localhost:3000 to view it in the browser.

#### Available Scripts

In this project, you can run the following scripts:

| Script        | Description                                             |
| ------------- | ------------------------------------------------------- |
| npm start     | Runs the app in the development mode.                   |
| npm test      | Launches the test runner in the interactive watch mode. |
| npm run build | Builds the app for production to the `dist` folder.     |
| npm run serve | Serves the production build from the `dist` folder.     |

## Credits

Vite Template React is built and maintained by [Safdar Jamal](https://safdarjamal.github.io).

## License

This project is licensed under the terms of the [MIT license](https://github.com/SafdarJamal/vite-template-react/blob/main/LICENSE).


## Package Structure

```
global
|---- config
|---- util
|---- error
		|---- exceptionhandler
		|---- errorResponse.java
		|---- errorCode.java

domain
|---- controller
    |---- dto
        |---- request
        |---- response
|---- service
     |---- impl
     |---- domain
        |---- domain 객체
     
|---- infrastructure
     |---- repository
             |---- entity
     |---- s3
     |---- ssafy
          
|---- enumeration
|---- entity

```