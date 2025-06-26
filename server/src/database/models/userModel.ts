import {Model, DataType, Table, Column} from 'sequelize-typescript'

@Table({
    tableName : 'user',
    modelName : 'User',
    timestamps : true
})

class User extends Model{

    @Column({
        type : DataType.STRING,
        unique : true
    })
    declare email : string

        @Column({
        type : DataType.STRING,
        unique : true
    })
    declare username : string

        @Column({
        type : DataType.STRING
    })
    declare password : string

}

export default User