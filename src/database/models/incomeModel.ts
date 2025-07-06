import { Model, Column, DataType, Table } from "sequelize-typescript";  


@Table({
    tableName:'income',
    modelName:'income',
    timestamps:true
})

class Income extends Model<Income>{

    @Column({
        type:DataType.DECIMAL(10,2),  // 10 digit, 2 float eg: 9999999999.99
        allowNull:false,
    }) incomeAmount! : number

    @Column({
        type:DataType.STRING,
        allowNull:false,
    }) incomeSource!:string

    @Column({
        type:DataType.DATE,
        allowNull:false,
    }) incomeDate!:Date

}

export default Income
