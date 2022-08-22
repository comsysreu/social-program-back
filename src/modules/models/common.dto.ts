import { ObjectId } from "mongoose";

export class CommonDto {
    createAt: Date;
    updateAt: Date;
    createBy: String;
    updateBy: String;
    _id: ObjectId;

    // constructor(partial: Partial<CommonDto>) {
    //     Object.assign(this, partial);
    // }
}
