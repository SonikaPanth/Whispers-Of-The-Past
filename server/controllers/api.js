const Post=require("../models/posts.js")
const fs=require('fs');

module.exports=class API{
    //fetch all posts

    static async fetchAllPost(req,res){
       try {
         const posts=await Post.find();
         res.status(200).json(posts);
       } 
       catch (error) {
        res.status(404).json({
            success:false,
            message:error.message
        })
       }
    }

    //fetch post by id

    static async fetchlPostById(req,res){
        const id=req.params.id;
        try {
            const post=await Post.findById(id);
            res.status(200).json(post);

        } catch (error) {
            res.status(404).json({
                success:false,
                message:"error.message",
            })
        }
    }
    
    //create a post
    static async createPost(req,res){
        const post=req.body;
            const imagename=req.file.filename;
            post.image=imagename;
        try {
            await Post.create(post);
            res.status(201).json({
                success:true,
                message:"Post created Successfully"
            })
        } 
        catch (error) {
            req.status(404).json({
                message:"error.message"
            });
        }
    }

    //update a post
    static async updatePost(req,res){
        const id=req.params.id;
        let new_img="";
        if(req.file){
           new_img=req.file.filename;
           try {
             fs.unlinkSync("./uploads/"+ req.body.old_image);
           } catch (error) {
             console.log(error);
           }
        }
        else{
            new_img=req.body.old_image;
        }

        const newPost=req.body;
        newPost.image=new_img;

        try {
            await Post.findByIdAndUpdate(id,newPost);
            res.status(200).json({
                success:true,
                message:"Post updated successfully"
            })
        } catch (error) {
            res.status(400).json({
                message:error.message,
            })
        }
    }

    //delete a post
    static async deletePost(req,res){
        const id=req.params.id;
        try {
            const result=await Post.findByIdAndDelete(id);

            if(result.image!=''){
                try {
                    fs.unlinkSync("./uploads/"+result.image);
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({
                message:"Post deleted Succesfully"
            })
        } catch (error) {
            res.status(404).json({
                message:error.message,
            })
        }
    }
}