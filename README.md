# nestjs-board-app
nest js란?

---

nodejs 구조

- eslintrc.js
개발자들이 특정한 규칙을 가지고 코드를 깔끔하게 짤 수 있게 도와주는 라이브러리. 타입스크립트를 쓰는 가이드라인 제시, 문법에 오류가 나면 알려주는 역할 등등
- prettierrc
주로 코드형식을 맞추는데 사용. 작은따옴표 사용할지, 큰 따옴표 사용할지, indent값을 몇으로 줄 것인지 등등. 에러를 찾는게 아닌 코드 포맷터 역할.
- nest-cli.json
nest 프로젝트를 위해 특정한 설정을 할 수 있는 json파일
- tsconfig.json
어떻게 타입스크립트를 컴파일 할 것인지 설정
- tsconfig.build.json
tsconfig.json의 연장선상 파일이며, build를 할 때 필요한 설정들 “excludes”에서는 빌드할 때 필요 없는 파일들 명시
- package.json
build : 운영환경을 위한 빌드
format : 린트에러가 났을 시 수정
start : 앱 시작
- src 폴더
main.ts : 앱 생성, 실행
app.module.ts : 앱 모듈 정의

---

이번 프로젝트에서는 게시판 모듈과 인증모듈 두가지의 모듈을 생성할 예정이다.

같은 기능에 해당하는 것들은 하나의 모듈 폴더 안에 넣어서 사용해야 한다.

app.module.ts에 각 페이지에 대한 모듈을 등록하면 사용자가 요청 시(request) board.controller.ts에 전달되어 service에서 데이터를 전달받고 요청에 맞는 페이지를 보여주게 된다(response).

이 부분은 spring framwork에서 mvc패턴 기반의 프로젝트를 진행할때 view - controller - service의 관계와 유사하다고 생각이 들었다.

---

모듈을 생성할 땐 명령어를 사용해서 생성할 수도 있다.

nest g module boards

nest : nestcli를 사용

g : 생성

module : 모듈

boards : 모듈의 이름

명령어를 통해 cli를 이용해 controller, service를 생성하면 module에 생성된 controller와 service가 자동으로 입력된다

---

모델을 정의하기 위해서....

Class를 이용하거나 Interface를 이용해야한다.

Class : 변수의 타입 체크, 인스턴스 생성 가능

Interface : 변수의 타입만 체크

---

- 프로젝트 개발 초기에는 db를 쓰지 않았기 때문에 게시판의 id를 부여하기 위해 uuid 모듈을 설치해서 사용했다.

---

Nestjs에서 request에서 보내온 값을 가져오기 위해서는 @Body() body를 이용한다.

@Body(’title’) title과 같이 특정 값 하나를 지정해서 가져올 수도 있다. 

---

DTO를 쓰는 이유

데이터 유효성을 체크하는데 효율적이다.

더 안정적인 코드로 만들기 가능.

타입스크립트의 타입으로도 사용된다.

DTO 파일 생성 시 class로 작성한 이유

class는 interface와 달리 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할때 더 유리하다.

---

Nest Js 미들웨어

1. Pipes
요청 유요성 검사 및 페이로드 변환을 위해 사용. 데이터를 예상한대로 직렬화
2. Filters
오류처리 미들웨어. 특정 오류 처리기를 사용할 경로와 각 경로 주변의 복잡성을 관리하는 방법을 알 수 있다.
3. Guards
인증 미들웨어. 지정된 경로로 통과할 수 있는 유저와 허용되지 않는 유저를 서버에 알림
4. Interceptors
경로 핸들러를 호출하기 전과 후에 응답/요청에 액세스한다.

---

파이프란?

@Injectable() 데코레이터로 주석이 달린 클래스이다.

data transformation과 data validation을 위해서 사용된다.

data transformation

입력 데이터를 원하는 형식으로 변환.

ex) 숫자로 받아야 할 것이 문자로 온다면 숫자 형식으로 변환

data validation

데이터가 올바르게 들어오지 않으면 예외 발생

파이프 사용방법

Handler-level Pipes

핸들러 레벨에서 @UsePipes() 데코레이터 사용

해당되는 모든 파라미터에 적용됨.

Parameter-level Pipes

특정한 파라미터에게만 적용

Global Pipes

애플리케이션 레벨의 파이프. 모든 요청에 적용됨.

Nest js에 기본적으로 사용가능한 pipe 6가지

1. ValidationPipe
2. ParseIntPipe
3. ParseBoolPipe
4. ParseArrayPipe
5. ParseUUIDPipe
6. DefaultValuePipe

사용 예시

```jsx
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number){
	return;
} 
```

파라미터 레벨로 id에 대해 ParseIntPipe를 적용한 것이다. 이때 숫자가 아닌 문자열을 보내게 되면 400 에러가 발생한다.

---

---

TypeORM을 이용해 mysql과 연결

TypeORM은 db table로 변환되는 class 이기 때문에 클래스를 생성한 후 내부 컬럼을 정의한다.

Entity에 테이블에 들어갈 컬럼 데이터 입력

Repository는 service에서 db와 관련된 작업을 할때 사용된다.

async await을 사용하지 않으면 db작업이 끝나기전에 결과값이 나와버린다.

---

비밀번호 저장은 salt + 비밀번호를 해시로 암호화 하는 방법을 선택했다.

---

JWT란?

Json Web Token. 당사자 간 정보를 Json 개체로 안전하게 전송하기 위한 독립적인 방식을 정의하는 개방형 표준. 

정보를 안전하게 전할 때, 유저의 권한 체크를 위해 사용하는데 유용한 모듈.

---

JWT의 구조

Header : 토큰에 대한 메타데이터 포함. (타입, 해싱 알고리즘...)

Payload : 유저정보, 만료기간, 주제 등

Verify Signature : 위조여부 확인 가능

---

JWT의 흐름

유저 로그인 → 토큰생성 → 토큰보관

해당 권한이 있는 유저가 요청 시 → 보관하고 있던 토큰을 Header에 넣어서 같이 보냄 → 서버에서 JWT를 이용하여 토큰을 생성, 두 개 비교 → 통과

---

@UseGuards(AuthGuard())

req.user

요청안에 유저 객체가 들어가게 하기 위해 사용한다.

---

유저와 게시글 관계 설정

OneToMany ↔ ManyToOne

---

Configuration (설정파일)

runtime 도중에 바뀌는 것이 아닌 애플리케이션이 시작할 때 로드되어 그 값을 정의해주는 것을 말한다.

- Codebase
    
    일반적으로 Port와 같이 노출되어도 상관없는 정보들
    
- Environment Variables (환경 변수)
    
    비밀번호나 api key같은 노출되면 안되는 정보들
