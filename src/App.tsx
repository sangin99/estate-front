import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router';
import { AUTH_PATH, LOCAL_PATH,  RATIO_PATH, SERVICE_PATH,
QNA_UPDATE_PATH, QNA_WRITE_PATH, QNA_DETAIL_PATH as QNA_DETAIL_PATH, QNA_PATH, 
LOCAL_ABSOLUTE_PATH,
AUTH_ABSOLUTE_PATH,
SNS_PATH} from './constant';
import Authentication, { Sns } from './views/Authentication';
import ServiceContainer from './layouts/ServiceContainer';
import Local from './views/service/Local';
import Ratio from './views/service/Ratio';
import QnaList from './views/service/qna/QnaList';
import QnaWrite from './views/service/qna/QnaWrite';
import QnaDetail from './views/service/qna/QnaDetail';
import QnaUpdate from './views/service/qna/QnaUpdate';
import NotFound from './views/NotFound';
import { useCookies } from 'react-cookie';

//      component : root 경로 컴포넌트      //
function Index () {

  //      state      //
  const [cookies] = useCookies();

  //      function      //
  const navigator = useNavigate();

  //      effect      //
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if (accessToken) navigator (LOCAL_ABSOLUTE_PATH)
    else navigator (AUTH_ABSOLUTE_PATH)
  }, []);

  //      render      //
  return <></>
}

//      component : Application 컴포넌트      //
function App() {

  console.log(process.env.REACT_APP_ENVIRONMENT);

//      render      //
  return (        //todo/ 컴포넌트 return 시, () 가 바로 뒤에 붙어와야함
    <Routes>
      <Route index element={<Index />} />
      <Route path={SNS_PATH} element={<Sns />} />
      <Route path={AUTH_PATH} element={<Authentication />} />
      <Route path={SERVICE_PATH} element={<ServiceContainer />} >
        <Route path={LOCAL_PATH} element={<Local />} />
        <Route path={RATIO_PATH} element={<Ratio />} />
        {/* <Route path={QNA_PATH} element={</>} > */}
        <Route path={QNA_PATH} >
          <Route index element={<QnaList />} />
          <Route path={QNA_WRITE_PATH} element={<QnaWrite />} />
          <Route path={QNA_DETAIL_PATH} element={<QnaDetail />} />
          <Route path={QNA_UPDATE_PATH} element={<QnaUpdate />} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />   
    </Routes>
  ); 
}

export default App;

// - authentication (로그인, 회원가입)
// - service
//   - local (지역평균)
//   - ratio (비율계산)
//   - qna (QnA 리스트)
//     - :boardNumber (QnA 상세보기)
//     - write (QnA 작성)
//     - update/:boardNumber (QnA 수정)