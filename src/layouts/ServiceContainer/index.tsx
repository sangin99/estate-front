import React, { useEffect, useState } from "react";
import "./style.css";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AUTH_ABSOLUTE_PATH, LOCAL_ABSOLUTE_PATH, QNA_LIST_ABSOLUTE_PATH, RATIO_ABSOLUTE_PATH } from "src/constant";
import { useCookies } from "react-cookie";
import { getSignInUserRequest } from "src/apis/user";
import { GetSignInUserResponseDto } from "src/apis/user/dto/response";
import ResponseDto from "src/apis/response.dto";
import useUserStore from "src/stores/user.store"

type Path = '지역 평균' | '비율 계산' | 'Q&A 게시판' | '';

//                    interface                    //
interface Props {
    path: Path;
}

//                    component                    //
function TopBar({ path }: Props) {

    
    //                    state                    //
    const { loginUserRole } = useUserStore();
    const [cookies, setCookie, removeCookie] = useCookies();

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onLogoutClickHandler = () => {
        removeCookie('accessToken', { path: '/' });
        navigator(AUTH_ABSOLUTE_PATH);
    };

    //                    render                    //
    return (
        <>
        <div className="logo-container">임대주택 가격 서비스</div>
        <div className="top-bar-container">
            <div className="top-bar-title">{ path }</div>
            <div className="top-bar-right">
                { loginUserRole === 'ROLE_ADMIN' && <div className="top-bar-role">관리자</div> }
                <div className="second-button" onClick={onLogoutClickHandler}>로그아웃</div>
            </div>
        </div>
        </>
    );
}

//                    component                    //
function SideNavigation({ path }: Props) {

    const localClass = `side-navigation-item${path === '지역 평균' ? ' active' : ''}`;
    const ratioClass = `side-navigation-item${path === '비율 계산' ? ' active' : ''}`;
    const qnaClass = `side-navigation-item${path === 'Q&A 게시판' ? ' active' : ''}`;

    //                    state                    //
    const { pathname } = useLocation();

    //                    function                    //
    const navigator = useNavigate();

    //                    event handler                    //
    const onLocalClickHandler = () => navigator(LOCAL_ABSOLUTE_PATH);
    const onRatioClickHandler = () => navigator(RATIO_ABSOLUTE_PATH);
    const onQnaClickHandler = () => {
        if (pathname === QNA_LIST_ABSOLUTE_PATH) window.location.reload();   // window.location.reload() : 새로고침
        else navigator(QNA_LIST_ABSOLUTE_PATH);
    };

    //                    render                    //
    return (
        <div className="side-navigation-container">
            <div className={localClass} onClick={onLocalClickHandler}>
                <div className="side-navigation-icon chart"></div>
                <div className="side-navigation-title">지역 평균</div>
            </div>
            <div className={ratioClass} onClick={onRatioClickHandler}>
                <div className="side-navigation-icon pie"></div>
                <div className="side-navigation-title">비율 계산</div>
            </div>
            <div className={qnaClass} onClick={onQnaClickHandler}>
                <div className="side-navigation-icon edit"></div>
                <div className="side-navigation-title">Q&A 게시판</div>
            </div>
        </div>
    );
}

//                    component                    //
export default function ServiceContainer() {

    //                    state                    //
    const { pathname } = useLocation();
    const { setLoginUserId, setLoginUserRole } = useUserStore();
    const [cookies] = useCookies();
    const [path, setPath] = useState<Path>('');

     //                    function                    //
    const navigator = useNavigate();

    const getSignInUserResponse = (result: GetSignInUserResponseDto | ResponseDto | null) => {

        const message = 
            !result ? '서버에 문제가 있습니다.' :
            result.code === 'AF' ? '인증에 실패했습니다.' :
            result.code === 'DBE' ? '서버에 문제가 있습니다.' : '';

        if (!result || result.code !== 'SU') {
            alert(message);
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        const { userId, userRole } = result as GetSignInUserResponseDto;
        setLoginUserId(userId);
        setLoginUserRole(userRole);

    };
    //                    effect                    //
    useEffect(() => {
        const path = 
            pathname === LOCAL_ABSOLUTE_PATH ? '지역 평균' :
            pathname === RATIO_ABSOLUTE_PATH ? '비율 계산' :
            pathname.startsWith(QNA_LIST_ABSOLUTE_PATH) ? 'Q&A 게시판' : '';

        setPath(path);
    }, [pathname]);

    useEffect(() => {

        if (!cookies.accessToken) {
            navigator(AUTH_ABSOLUTE_PATH);
            return;
        }

        getSignInUserRequest(cookies.accessToken).then(getSignInUserResponse);

    }, [cookies.accessToken]);

    //                    render                    //
    return (
        <div id="wrapper">
            <TopBar path={path} />
            <SideNavigation path={path} />
            <div className="main-container">
                <Outlet />
            </div>
        </div>
    );
}