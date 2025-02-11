import axios from 'axios';
const url = "http://localhost:5000/api/v1";  // Use full backend URL


export default class API{
    //to get all post from server
    static async getAllPost(){
        const res=await axios.get(url);
        return res.data;
    }
    
    //get single post by id
    static async getPostById(id){
        const res=await axios.get(`${url}/${id}`);
        return res.data;
    }
    // to insert post into database
    static async addPost(post){
        const res=await axios.post(url,post);
        return res.data;
    }
    //to update the post
    // Fix duplicate method names
static async updatePost(id, post) {  
    const res = await axios.patch(`${url}/${id}`, post);
    return res.data;
}

    //to delete post
    static async deletePost(id){
        const res=await axios.delete(`${url}/${id}`);
        return res.data;
    }
}