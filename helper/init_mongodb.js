const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(()=>{
    console.log('connected to mongodb')
}).catch(err=>{
    console.log(err);
})

mongoose.connection.on('connected',()=>{
    console.log('mongoose connected to db')
})
mongoose.connection.on('error',(err)=>{
    console.log(err);
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose disconnected')
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close();
    process.exit(0)
})