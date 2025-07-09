import {Model, DataType, Table, Column} from 'sequelize-typescript'

@Table({
    tableName : 'user',
    modelName : 'User',
    timestamps : true
})

class User extends Model{
           @Column({
            primaryKey : true,
            type : DataType.UUID,
            defaultValue : DataType.UUIDV4
    })
    declare id : string

    @Column({
        type : DataType.STRING,
                unique : true,
        allowNull : false
    })
    declare email : string

        @Column({
        type : DataType.STRING,
                unique : true,
        allowNull : false
    })
    declare username : string

        @Column({
        type : DataType.STRING
    })
    declare password : string

}

export default User