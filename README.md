Code-Container
=============

개요
-------------
HTML,CSS,JS로 제작된 UI 컴포넌트/인터랙션 등을 저장하고 관리하는 플랫폼입니다.
1차적으로는 개인적인 컬렉션을 저장/검색/재사용 하는 용도로 사용할 예정이며,
이후에는 기능을 더욱 확장하려는 막연한 계획이 있습니다.

사용법
---------------
*gulp : dist에 배포하고 express로 구동합니다. (현재 사용하지 않음)
*npm start : express로 구동합니다. dist가 구성된 상태를 전제로 구동됩니다.
*npm run dev : webpack으로 개발서버를 구동합니다. (현재 사용중)

구조
-----
###[Express]
* www
[Express] 실행 명령을 통해 실행되는 최초 진입점, app 모듈에 연결.
* app.js
url을 매핑하는 부분
* views
...

###[Vue.js]
* bin
...
* build
...
* config
...
* public
...
* routes
...
* src
...
* static
...
* test
...
