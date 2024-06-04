import axios from "axios";
import { EmailAuthCheckRequestDto, EmailAuthRequestDto, IdCheckRequestDto, SignInRequestDto, SignUpRequestDto } from "./dto/request";
import { EMAIL_AUTH_CHECK_REQUEST_URL, EMAIL_AUTH_REQUEST_URL, ID_CHECK_REQUEST_URL, SIGN_IN_REQUEST_URL, SIGN_UP_REQUEST_URL } from "src/constant";
import { SignInResponseDto } from "./dto/response";
import ResponseDto from "../response.dto";
import { requestErrorHandler, requestHandler } from "..";

// function : 로그인 API 함수
export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_REQUEST_URL, requestBody)
        // .then(response => {
        //     const responseBody = response.data as SignInResponseDto;
        //     return responseBody;
        // }) //성공의 결과
        .then(requestHandler<SignInResponseDto>)
        // .catch(error => {
        //     const responseBody = error.response;
        //     if (!responseBody) return null;
        //     return responseBody as ResponseDto; 
        // }) //실패의 결과
        .catch(requestErrorHandler)    

    return result;
};

// function : 아이디 중복 확인 API 함수
export const IdCheckRequest = async (requestBody: IdCheckRequestDto) => {
    const result = await axios.post(ID_CHECK_REQUEST_URL, requestBody)
        // .then(response => {
        //     const responseBody = response.data as ResponseDto;
        //     return responseBody;
        // })
        .then(requestHandler<ResponseDto>)
        // .catch(error => {
        //     const responseBody = error.response.data;
        //     if (!responseBody) return null;
        //     return responseBody;
        // })
        .catch(requestErrorHandler) 

    return result;
}

// function : 이메일 인증 API 함수
export const emailAuthRequest = async (requestBody: EmailAuthRequestDto) => {
    const result = await axios.post(EMAIL_AUTH_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    
    return result;
};

// function : 이메일 인증 확인 API 함수
export const emailAuthCheckRequest = async (requestBody: EmailAuthCheckRequestDto) => {
    const result = await axios.post(EMAIL_AUTH_CHECK_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    
    return result;
};

// function : 회원가입 API 함수
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_REQUEST_URL, requestBody)
        .then(requestHandler<ResponseDto>)
        .catch(requestErrorHandler)
    
    return result;
};

