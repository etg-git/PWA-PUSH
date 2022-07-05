07-05 PWA PUSH 학습 및 메인 및 모바일 솔루션 적용   



- 처음은 PWA 적용    

  1. VUE설치 안되어 있을시  CLI install   
  2. Vue PWA insall (NPM 으로, yarn도 가능)
  3. config file 설정 (vue.config) pwa로, or /public 에 manifast.json 만들고 index.html에 적용해도 됨.
  4. manifast에 뜨는지 확인(웹브라우저가 인식해야함.)
  5. service worker 설정 (pwa npm install시 자동생성됨. 생성이 되지 않은 경우 /src 파일 생성 후 main.js에 import
  6. service wokrer 뜨는지 확인
  7. local로는 앱설치 확인 불가능 -> 배포 이 후 https로 확인 해야함. 
![image](https://user-images.githubusercontent.com/38419394/177259076-d3b4940a-1840-409a-a927-6dec82869cf2.png)

- 파이버베이스 프로젝트 생성
  1. firebase console에서 프로젝트 생성 
  2. 앱추가 (웹앱으로) -> sdk 구성이 됨.
  3. 서버키 생성 (cloud messaging api 추가해야함)
  4. 웹푸시 인증서 -> 키 생성
 
 
- 생성 이후 클라이언트 토큰값 가져오기
  1. firebase -g devtools
  2. firebase login -> 계정 로그인 뒤 success 창 뜨면 완료
  3. firebase init -> (여기서 애먹음) node version 확인 14버전 쓰고 있는데 파베는 16버전 이상 지원해줌) 
   -> nvm 설치하여 node 따로 관리 (이때 node는 powershell 관리자 권한으로 열어서 버전을 바꿔줘야함. 안그러면 오류) 
   -> npm install은 다시 14버전으로 내림. 이때 package-lock.json파일과 node-modules 삭제하여 다시 install
   -> 정상 작동 확인
  4. message.js 생성 후 firebase/messaging, fireabse/app import
  5. getToken()으로 클라이언트 토큰값 가져옴 -> app.vue로 확인
  6. postman 열어서 success되는지 확인
   -> header : content_type: application.json, Authorization : key="서버키", Accept: application.json
   -> body : to: '클라이언트 토큰', priority: 'high', 'data': '' <- data는 푸시에 관한 메시지와 타이틀 옵션
  7. success후 onmessage()로 들어옴 ->  Notification으로 return.
   -> new Notification은 안드로이드에선 지원되지 않음. 모바일 테스트 오류 --> showNotification으로 대체
   
 - 솔루션 적용 완료
  1. 환경설정 해야함. 
       
  

