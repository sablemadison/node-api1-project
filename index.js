const express = require("express");
const shortid = require("shortid");
const server = express();

// parse incoming objects
server.use(express.json())

let usersArray = [];
//POST
server.post('/api/users', (req, res) => {
    const id = shortid.generate();
    const user = {
        ...req.body,
        id
    }
console.log(req.body)
if(req.body.bio && req.body.name){
    usersArray.push(user)
    res.status(201).json(user)
} else {
    res.status(400).json({message:"please provide a bio and a name."})
}

    
})

//GET
server.get('/api/users', (req, res) => {
try {
    res.json(usersArray)
} catch(err) {
    res.status(500).json({errorMessage: "The users information could not be retrieved.", err})
}
})

//GET
server.get('/api/users/:id', (req, res) => {
const {id} = req.params;
const user = usersArray.find(user => user.id === id);
try {
    if(user){
        res.json(user)
    } else {
        res.status(404).json({message: "The user with the specified ID does not exist."})
    }
} catch(err){
    res.status(500).json({errorMessage: "The user information could not be retrieved.", err})
}


})

//DELETE

server.delete('/api/users/:id', (req, res) => {
const {id} = req.params;
const deleted = usersArray.find(user => user.id === id);
try {
    if (deleted) {
        usersArray = usersArray.filter(user => user.id !== id);
        res.json(deleted);
    } else {
        res.status(404).json({message:"The user with the specified ID does not exist"})
    }
}catch(err) {
    res.status(500).json({errorMessage: "The user could not be removed", err})
}
})

//PATCH

server.patch('/api/users/:id', (req, res) => {
const {id} = req.params;
const changes = req.body;

    if(!id || !usersArray) {
        res.status(500).json({
            errorMessage:"The user information could not be modified."
        })
    } else {
        if(!changes.name && !changes.bio){
            res.status(400).json({errorMessage:"Please provide name and bio for the user."})
        } else {
            let foundId = usersArray.find(user => user.id === id);
            if(foundId){
                Object.assign(foundId, changes);
                res.status(200).json(foundId);
            } else {
                res.status(404).json({errorMessage:"The user with the specified ID does not exist."})
            }
        }
    }



})

const PORT = 5000;

server.listen(PORT, () => {
    console.log('listening on localhost:', PORT)
})