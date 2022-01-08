import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto'

@Injectable()
export class BoardsService {
    private boards: Board[] = [];
    //다른 모듈에서 boards 수정하는 것을 차단하기 위해 private 사용

    getAllBoards(): Board[] {
    //이런식으로 타입을 정의해주면 원하는 타입과 다른 코드가 사용되면 에러가 발생하게되고, 읽는 입장에서도 더 쉽게 이해가 가능하게 된다.
        return this.boards;
    }

    getBoardById(id:string): Board {
        const found = this.boards.find(board => board.id === id);

        if(!found){
            throw new NotFoundException("Cannot find Board with id ${id}");
        }

        return found;
    }

    createBoard(createBoardDto: CreateBoardDto){
        const {title, description} = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }
        this.boards.push(board);
        return board;
    }

    deleteBoard(id: string): void{
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
        //id 같은것은 지우고 id 다른것만 담는다
    }

    updateBoardStatus(id: string, status: BoardStatus): Board{
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
