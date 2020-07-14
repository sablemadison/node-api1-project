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
    res.status(200).json(usersArray)
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
        res.status(200).json(user)
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
        res.status(204).json(deleted);
    } else {
        res.status(404).json({message:"The user with the specified ID does not exist"})
    }
}catch(err) {
    res.status(500).json({errorMessage: "The user could not be removed", err})
}
})

//PUT

server.put('/api/users/:id', (req, res) => {
const {id} = req.params;
let index = usersArray.findIndex(user => user.id === id)
const changes = req.body;
try {
    if(index == -1){
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    else if (req.body.bio && req.body.name) {
        usersArray[index] = changes;
        res.status(200).json(usersArray[index]);
    }
    else {
        res.status(400).json({errorMessage:"Please add a name or bio"})
    }
}
 catch (err){
 res.status(500).json({ errorMessage: "The user information could not be modified." })
 }


})

const PORT = 5000;

server.listen(PORT, () => {
    console.log('listening on localhost:', PORT)
})