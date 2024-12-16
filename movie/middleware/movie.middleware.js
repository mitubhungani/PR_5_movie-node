const allMovieFildReqired =(req,res,next)=>{
    let {title,description,releaseDate,category,actors,image,ratings,comments,addedBy}=req.body
    if(!title || !description || !releaseDate || !category || !actors || !image || !ratings || !comments || !addedBy){
        return res.status(400).json({message: "All fields are required"})
    }else{
        next()
    }
}



module.exports = allMovieFildReqired