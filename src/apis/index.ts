import { AxiosResponse } from "axios";
import ResponseDto from "./response.dto";

// function : Request
export const requestHandler = <T>(response: AxiosResponse<T, any>) => {
    const responseBody = response.data;
    return responseBody;
};

// function : Request Error 처리함수
export const requestErrorHandler = (error: any) => {
    const responseBody = error.response?.data;
    if (!responseBody) return null;
    return responseBody as ResponseDto;
};

// function: Authorization Bearer 헤더 
export const bearerAuthorization = (accessToken: string) => ({ headers: { 'Authorization': `Bearer ${accessToken}` } });