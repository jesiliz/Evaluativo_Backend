const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const usersController = (User) => {

    const getUsers = async (req, res) => {
        const {query} = req;
        const response = await User.find(query);
        res.json(response);
    }
   
    const postUsers = async (req, res) => {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        res.json(user);
    }

    const getUserById = async (req, res) => {
        const {params} = req;
        const response = await User.findById(params.userId);

        res.json(response);
    }

    const getUsersByUserName = async (req, res) => {
        const {params} = req;
        const response = await User.findOne({ "userName": params.userName});
        res.json(response);
    }

    const putUsers = async (req, res) => {
        const {body} = req;
        const response = await User.updateOne({
            _id: req.params.userId
        },
        {   
            $set: {
                firstName: body.firstName,
                lastName: body.lastName,
                userName: body.userName,
                password: await bcrypt.hash(body.password, 10),
                email: body.email,
                adress: body.adress,
                phone: body.phone
            }
        })
        res.json(response);
    }

    const deleteUserById = async (req, res) => {
        const id = req.params.userId;
        await User.findByIdAndDelete(id);
        res.status(202).json('User has been delete');
    }

    const userLogin = async(req, res) =>{
        const {body}= req;
        const saveUser = await User.findOne({'userName': body.userName})
        
        if(saveUser && await bcrypt.compare(body.password, saveUser.password)){
            const token = generateToken(saveUser);
            res.json({message:'Valid User', token});

        }else{
           res.json({message: 'Invalid credentials'});
        }
    }

    const generateToken = (saveUser) =>{
        const tokenPayload = {
            name: saveUser.name,
            userName: saveUser.userName,
            lastName: saveUser.lastName
        }
        return jwt.sign(tokenPayload,'mySecretKey',{ expiresIn: '24h'});  
    }


    return { getUsers, postUsers, getUserById, getUsersByUserName, putUsers, deleteUserById, userLogin};
}

module.exports = usersController; 