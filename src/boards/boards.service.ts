import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto'
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository:BoardRepository,
    ){}

    createBoard(createBoardDto: CreateBoardDto, user:User): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto, user);
    }

    async getAllBoards(
        user:User
    ):Promise<Board[]>{
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', {userId:user.id});
        //userid가 같은 경우만
        const boards = await query.getMany();
        //해당 조건 게시물 전부 가져옴

        return boards;
    }


    async getBoardById(id:number): Promise<Board>{
        const found = await this.boardRepository.findOne(id);

        if(!found){
            throw new NotFoundException(`Cannot find Board with id ${id}`);
        }

        return found;
    }

    async updateBoardStatus(id:number, status: BoardStatus):Promise<Board>{
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    async deleteBoard(id:number, user:User):Promise<void>{
        const result = await this.boardRepository.delete({id, user});
        if(result.affected === 0){
            throw new NotFoundException(`Cannot find Board with id ${id}`)
        }

        console.log('result', result);
    }



    // ---------- 로컬메모리 부분은 더이상 필요 없다.--------------
    // private boards: Board[] = [];
    // //다른 모듈에서 boards 수정하는 것을 차단하기 위해 private 사용
    // ---------- 로컬메모리 부분은 더이상 필요 없다.--------------




    // getAllBoards(): Board[] {
    // //이런식으로 타입을 정의해주면 원하는 타입과 다른 코드가 사용되면 에러가 발생하게되고, 읽는 입장에서도 더 쉽게 이해가 가능하게 된다.
    //     return this.boards;
    // }

    // getBoardById(id:string): Board {
    //     const found = this.boards.find(board => board.id === id);

    //     if(!found){
    //         throw new NotFoundException("Cannot find Board with id ${id}");
    //     }

    //     return found;
    // }

    // createBoard(createBoardDto: CreateBoardDto){
    //     const {title, description} = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC
    //     }
    //     this.boards.push(board);
    //     return board;
    // }

    // deleteBoard(id: string): void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    //     //id 같은것은 지우고 id 다른것만 담는다
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
