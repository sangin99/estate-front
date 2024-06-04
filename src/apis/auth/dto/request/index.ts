// description : 로그인 Request Body DTO
export interface SignInRequestDto {
    userId : string;
    userPassword : string;
}

// description : 아이디 중복 확인 Request Body DTO
export interface IdCheckRequestDto {
    userId : string;
}

// description : 이메일 인증 Request Body DTO
export interface EmailAuthRequestDto {
    userEmail : string;
}

// description : 이메일 인증 확인 Request Body DTO
export interface EmailAuthCheckRequestDto {
    userEmail : String;
    authNumber : string;
}

// description : 회원가입 Request Body DTO
export interface SignUpRequestDto {
    userId : String;
    userPassword : string;
    userEmail : string;
    authNumber : string;
}