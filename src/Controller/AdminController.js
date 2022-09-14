const AdminModel = require('../Modal/AdminModal')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');



//Code for create user
async function saveAdmin(req, res) {
    try {
        const encryptedPass = await bcrypt.hash(req.body.password, 10)
        const Admin = new AdminModel({
            name: req.body.name,
            email: req.body.email,
            password: encryptedPass,
            phone: req.body.phone,
            Address: req.body.Address,
            Designation: req.body.Designation
        })
        const savedAdmin = await Admin.save()
        res.status(StatusCodes.OK).json(savedAdmin)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Can't save Admin" })
    }
}

//code for login a user
async function adminLogin(req, res) {
    try {
        let email = req.body.email
        const saveAdmin = await AdminModel.findOne({ email: email })

        if (saveAdmin) {
            if (bcrypt.compareSync(req.body.password, saveAdmin.password)) {
                const jwtToken = jwt.sign({ admin: saveAdmin }, process.env.SECRET_KEY, {expiresIn:'600s'})
                res.status(StatusCodes.OK).json({ message: 'login successful', token: jwtToken })
            } else {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: "invailid Pass" })
            }
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invailid Email" })
        }

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Spmething went wrong" })
    }
}

//code for listed all users available in database
async function listingUser(req, res) {
    try {
        AdminModel.find((error, data) => {
            if (!error) {
                res.status(StatusCodes.OK).json(data)
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "Message": "Can not Fetch Users" })
            }
        })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "Message": "Something went wrong" })
    }
}

//code for update a user status after login
async function updateUser(req, res) {
     try {
        const encryptedPass = await bcrypt.hash(req.body.password, 10)
        const UpdatedUser = await AdminModel.findOneAndUpdate({ name: req.params.name }, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: encryptedPass,
                phone: req.body.phone,
                Address: req.body.Address,
                Designation: req.body.Designation
            }
        })
         res.status(StatusCodes.OK).json({ user: UpdatedUser })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Message: "Something went wrong" })
    }
}

module.exports = {
    saveAdmin, adminLogin, listingUser, updateUser
}
