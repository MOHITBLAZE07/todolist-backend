const express =  require('express');
const cors = require('cors')
const todoSchema = require('./schema/todoSchema');
require('dotenv').config();
// initialisation and connection of mongo
require('./helper/init_mongodb');
const app = express()
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// app.get('/', (req, res) => {
//     res.send("Hello Express!");
// });
app.get('/',async(req,res)=>{
  try{
    const myLists = await todoSchema.find().sort({editedDate:-1});
    // get total documents in the Posts collection  
    const count = await todoSchema.countDocuments();
    res.status(200).send({myLists,totalCount:count})
}catch(err){
    res.status(500).send(err);
}
})
app.post('/', async(req, res) => {
    const {task} = req.body
    const taskModel = new todoSchema({
        task:task,
    })
    try{
        // datbase add document
        const resultminor = await taskModel.save()
        // frontend message
        res.status(201).send({message : "success",resultminor})
    }catch(err){
        res.send(err)
    } 
});
app.put('/:updateTaskId',async(req,res)=>{
  const userid = req.params.updateTaskId;
  const {task} = req.body;
  try{
    await todoSchema.findByIdAndUpdate({_id:userid},{
        task: task,
        editedDate:Date.now()
    });
    res.status(200).send({message : "success"})
  }catch(err){
      res.status(404).send(err)
  } 
})
app.delete('/:userid',async(req,res)=>{
  const userid = req.params.userid;
    try{
      // database - first datbase
      const result = await todoSchema.findByIdAndDelete(userid);
      // frontend
      res.send({message : "delete success",result})
  }catch(err){
      console.log(err);
      res.send(err);
  }
})


// port assign
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up on PORT ${PORT}`);
})