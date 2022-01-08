// export interface Board {
// //여기서는 보드의 타입만 지정해줄 것이기 때문에 interface를 사용했다.
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus;
//     //status에 enum을 이용해서 정의한 BoardStatus를 넣어주면 BoardStatus에서 넣어준 PUBLIC이나 PRIVATE상태만을 사용하게 된다.
// }
// typeORM의 entity를 사용할 것이기때문에 이 부분은 더 이상 쓰지 않는다.

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}