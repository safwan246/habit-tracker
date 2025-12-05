import mongoose, { Model, Schema,model,models,Document } from 'mongoose'

export interface Iuser {
    name:string;
    email:string;
    password:string;
    createdAt?:Date;
    updatedAt?:Date;
}
export interface IUserDoc extends Iuser,Document{}

const UserSchema = new Schema<IUserDoc>(
    {
    name:{
    type:String,
    required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
},

{timestamps:true}
);


const User = (models.User as Model<IUserDoc>) || model<IUserDoc>("User", UserSchema);

export default User;