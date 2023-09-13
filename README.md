# WANTED 프리온보딩 프론트엔드 4주차 과제 - 시계열 차트

- WANTED 프리온보딩 프론트엔드 4주차 개인 과제입니다.
- 특정 시간대의 value_area와 value_bar를 보여주는 표를 만들고 필터링할 수 있는 프로젝트입니다.

## 배포 링크

<a href="https://timer-series-chart.netlify.app/">Time Serires Chart 배포 링크</a>

## 사용 라이브러리

- 언어: TypeScript
- HTTP Client: axios
- 스타일 관리: styled-components
- 라우팅 관련 라이브버리: react-router-dom
- 차트 구현 도구: chart.js, react-chartjs-2
- 협업 설정 도구: eslint, prettier, husky, lint-staged

```js
  "dependencies": {
    "axios": "^1.2.2",
    "chart.js": "^4.4.0",
    "react-chartjs-2": "^5.2.0",
    "react-router-dom": "^6.15.0",
    "styled-components": "^6.0.7",
  },
  "devDependencies": {
    "eslint": "^8.48.0",
    "eslint-config-prettier": "^9.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.3",
    "react-icons": "^4.10.1"
  },
```

## 프로젝트 실행 방법

1. 프로젝트 클론

```
git clone https://github.com/hyeri-woo/time-series-chart.git
```

2. 해당 폴더로 이동

```
cd time-series-chart
```

3. 프로젝트 패키지 설치

```
npm install
```

4. json-server 실행

```
npm run server
```

5. 프로젝트 실행

```
npm start
```

## 프로젝트 구조

```js
📦 src
├── 📂 api
│   ├── 📄 http.ts
│   └── 📄 chart.ts
├── 📂 components
│   ├── 📄 ComplexChart.tsx
│   └── 📄 FilterButton.tsx
├── 📂 data
├── 📂 lib
├── 📂 pages
│   └── 📄 Home.tsx
├── 📂 routes
│   └── 📄 Router.tsx
├── 📂 styles
└── 📂 types
```

## 기능 상세

### 1. 시계열 차트 만들기

> - 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
> - 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
> - Area 그래프의 기준값은 `value_area` 값을 이용해주세요
> - Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
> - 차트의 Y축에 대략적인 수치를 표현해주세요

- Chart.js를 사용하여 복합 그래프 구현
- option의 scales에서 각각 y-axis의 포지션을 정해줌
- area의 y-axis의 max 값을 100의 자리로 올림한 뒤 2배의 값으로 지정

```ts
const options = {
  scales: {
    'bar-y-axis': {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
    'area-y-axis': {
      type: 'linear' as const,
      display: true,
      fill: true,
      position: 'right' as const,
      max: roundAndMultipy(areaData, 100, 2),
    },
  },
};
```

### 2. 호버 기능 구현

> - 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공해주세요

- interaction과 tooltip의 mode를 index로 지정해주어 index 기준으로 value_area와 value_bar 값을 같이 뜨게 함
- callbacks를 사용해 해당 tooltip 아이템의 index 값에 있는 id 데이터를 추가
-

```ts
const options = {
  interaction: {
    intersect: false,
    mode: 'index' as const,
  },
  plugins: {
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      callbacks: {
        afterTitle: (context: any) => {
          return regionData[context[0].dataIndex];
        },
      },
    },
  },
};
```

### 3. 필터링 기능 구현

> - 필터링 기능을 구현해주세요, 필터링은 특정 데이터 구역을 하이라이트 하는 방식으로 구현해주세요
> - 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요
> - 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리를 해주세요
> - 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트해주세요

- 지역 버튼을 누를때마다 keywords에 추가 또는 삭제
- chart의 bar backgroundColor를 클릭된 id 값이면 selected color로 지정해주고 아닐시 default color로 넣어줌
- 특정 데이터 구역을 눌렀을 시 tooltip에서 id 정보를 가져와 위의 로직에서 사용한 함수를 불러옴

```ts
const options = {
  onClick: (e: any) => {
    addOrRemoveKeyword(e?.chart?.tooltip?.title[1]);
  },
};
```
