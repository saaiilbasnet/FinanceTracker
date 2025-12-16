import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./userModel";

@Table({
    tableName:'expense',
    modelName:'expense',
    timestamps:true
})

class Expense extends Model<Expense>{

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare userId: string;

    @Column({
        type:DataType.DECIMAL(10,2),
        allowNull:false,
    }) declare expenseAmount: number

    @Column({
        type:DataType.STRING,
        allowNull:false,
    }) declare expenseSource: string

    @Column({
        type:DataType.DATE,
        allowNull:false,
    }) declare expenseDate: Date

    @BelongsTo(() => User)
    declare user: User;
}

export default Expense