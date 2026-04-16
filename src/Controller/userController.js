// async function createUser(req,res){
//     try{
//         const student = await Student.create(req.body);
//         return res.json({
//             statusCode:201,
//             success:true,
//             message:"User created successfully",
//             data:student,
//             error:{},
//         })
//     }catch(error){
//         return res.json({
//             statusCode:500,
//             success:false,
//             message:"User not created",
//             data:{},
//             error:error,
//         })
//     }
// }

// module.exports = {
//     createUser
// }