import { Model, Column, DataType, Table } from "sequelize-typescript";  


@Table({
    tableName:'income',
    modelName:'income',
    timestamps:true
})

class Income extends Model<Income>{

    @Column({
        type:DataType.STRING,
        allowNull:false,
    }) incomeAmount! : string

    @Column({
        type:DataType.STRING,
        allowNull:false,
    }) incomeSource!:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
    }) incomeDate!:string

}

export default Income
