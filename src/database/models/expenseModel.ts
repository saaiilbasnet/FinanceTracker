import { Column, DataType, Model, Table } from "sequelize-typescript";



@Table({
    tableName:'expense',
    modelName:'expense',
    timestamps:true
})

class Expense extends Model{
    @Column({
        type:DataType.DECIMAL(10,2),
        allowNull:false,

    })declare expenseAmount:number

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })declare expenseSource:string

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })declare expenseDate:Date

}

export default Expense