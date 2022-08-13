import { ObjectId } from "mongoose";

export class CreateViewDto {
    _id: ObjectId;
    name: String;
    route: String;
    descriptiion: String;
    identifier: String;
}
