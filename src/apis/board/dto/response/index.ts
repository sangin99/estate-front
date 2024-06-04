import ResponseDto from 'src/apis/response.dto';
import { BoardListItem } from 'src/types';

export interface GetBoardListResponseDto extends ResponseDto {
    boardList: BoardListItem[];
}

export interface GetSearchBoardListResponseDto extends ResponseDto {
    boardList: BoardListItem[];
}

export interface GetBoardResponseDto extends ResponseDto {
    receptionNumber: number;
    status: boolean;
    title: string;
    writerId: string;
    writeDatetime: string;
    viewCount: number;
    contents: string;
    comment: string | null;  // 속성은 존재하나, 내용은 필수 아니다.
    // comment?: string;   // 속성 자체가 없을 수 있다. underfund  발생 가능
}