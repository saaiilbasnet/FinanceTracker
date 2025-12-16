import { Model, Column, DataType, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./userModel";

@Table({
    tableName:'income',
    modelName:'income',
    timestamps:true
})

class Income extends Model<Income>{

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    declare userId: string;

    @Column({
        type:DataType.DECIMAL(10,2),  // 10 digit, 2 float eg: 9999999999.99
        allowNull:false,
    }) declare incomeAmount: number

    @Column({
        type:DataType.STRING,
        allowNull:false,
    }) declare incomeSource: string

    @Column({
        type:DataType.DATE,
        allowNull:false,
    }) declare incomeDate: Date

    @BelongsTo(() => User)
    declare user: User;
}

export default Income