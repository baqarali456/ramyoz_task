import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'title is required']

    },
    description:{
        type:String,
        required:[true,'description is required']

    },
    createdBy:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User",
       required:true,
    },
},{timestamps:true})

export const Task = mongoose.model('Task',taskSchema);