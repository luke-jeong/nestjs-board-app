import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig : TypeOrmModuleOptions = {
    
        type:"mysql",
        host:"localhost",
        port:3307,
        username:"root",
        password:"root",
        database:"board-app",
        entities:[__dirname + '/../**/*.entity.{js,ts}'],
        synchronize:true
    
}