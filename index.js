const express = require("express");

const app = express();

const users = [{
    name : "john",
    kidney : [{
        healthy : false
    }]
}];

app.use(express.json());

app.get("/", function(req,res){
    const jhonKidney = users[0].kidney;
    const numberOfKidney = jhonKidney.length;
    const healthyKidney = jhonKidney.filter(function(item){
        return item.healthy === true;
    })
    const numberOfHealthyKidney = healthyKidney.length;
    const numberOfUnhealthyKidney = numberOfKidney - numberOfHealthyKidney;

    res.json({
        numberOfKidney,
        numberOfHealthyKidney,
        numberOfUnhealthyKidney
    })
})

app.post("/", function(req,res){
    const isHealthy = req.body.isHealthy;
    users[0].kidney.push({
        healthy : isHealthy
    })
    res.json({
        msg : "Posting DONE"
    })
})

app.put("/", function(req,res){
    if(isAnyUnhealthyKidney()){
        for(let i=0;i<users[0].kidney.length;i++){
            users[0].kidney[i].healthy = true;
        }
        res.json({msg : "Puting DONE"});
    }else{
        res.status(411).json({
            msg : "No bad kidney"
        });
    }
    
})

app.delete("/", function(req,res){
    //if atleast one unhealthy kidney is there do this, else return 411
    if(isAnyUnhealthyKidney()){
        const newKidney = [];
        for(let i=0;i<users[0].kidney.length;i++){
            if(users[0].kidney[i].healthy){
                newKidney.push({
                    healthy : true
                })
            }
        }
        users[0].kidney = newKidney;
        res.json({msg : "Deletion DONE"});
    }else{
        res.status(411).json({
            msg : "You have no bad kidney"
        });
    }
})

function isAnyUnhealthyKidney(){
    let atleastOneUnhealthyKidney = false;
    for(let i=0;i<users[0].kidney.length;i++){
        if(!users[0].kidney[i].healthy){
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000);