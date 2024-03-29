import { Controller, Get, Post, Delete, Patch, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto'
import { Board } from './board.entity';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardController');
    constructor(private boardsService: BoardsService){}

    

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto,
    @GetUser() user:User):Promise<Board>{
        this.logger.verbose(`User ${user.username} creating a new board
        Payload: ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Get()
    getAllBoard(
        @GetUser() user:User
    ): Promise<Board[]>{
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);
    }


    @Get('/:id')
    getBoardById(@Param('id') id:number):Promise<Board>{
        return this.boardsService.getBoardById(id);
    }



    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus
    ){
        return this.boardsService.updateBoardStatus(id, status);
    }


    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id:number,
    @GetUser() user:User
    ):Promise<void>{
        return this.boardsService.deleteBoard(id, user);
    }



    // @Get('/')
    // getAllBoard(): Board[]{
    //     return this.boardsService.getAllBoards();
    // }

    // @Get('/:id')
    // getBoardById(@Param('id') id:string): Board{
    //     return this.boardsService.getBoardById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board{
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void{
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status') status: BoardStatus
    // ){
    //     return this.boardsService.updateBoardStatus(id, status);
    // }

}
