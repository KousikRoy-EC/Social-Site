import mongoose from "mongoose";

const postSchema=mongoose.Schema({
userId:{type:String,required:true},
desc:{type:String},
img:{type:String},
likes:{type:Array,default:[]},
},{timestamps:true}
)

const postModel = mongoose.model("Post", postSchema);
export default postModel;
