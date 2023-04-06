//update data (to change from rejected to accepted )

app.put('/Users/:id', (req,res)=>{

  const { id }= req.params;
    
 const data =req.body;
    
     con.query("update users set ? where id = ?",[{ Status : data.Status},id],(err,result)=>{
    
 if (err){
    
     res.statusCode=500;
    
 res.json({msg:"can't update user"});
    
 }
    
res.json({msg:"updated succ."});
    
    });
    
    });