const internModel = require("../models/InternModel")
const collegeModel = require("../models/CollegeModel")
const {isValidMobile,isValidEmail,isValidString,isValidName} = require('../validators/validations')



//================== create intern ============================================

const CreateIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeName } = data
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Request body cannot be empty" })

        if (!name) return res.status(400).send({ status: false, message: "name is mandatory" })
        if (!isValidString(name) || !isValidName(name)) return res.status(400).send({ status: false, message: "Please provide valid name" })

        if (!email) return res.status(400).send({ status: false, message: "email is mandatory" })
        if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Please provide valid email" })

        const datas = await internModel.findOne({ email: email })
        if (datas) return res.status(400).send({ status: false, message: "Email is already exist in Intern DB" })

        if (!mobile) return res.status(400).send({ status: false, message: "mobile number is mandatory" })
        if (!isValidMobile(mobile)) return res.status(400).send({ status: false, message: "Please provide valid mobile number" })
        const data2 = await internModel.findOne({ mobile: mobile })
        if (data2) return res.status(400).send({ status: false, message: "mobile number is already exist in Intern DB" })

        if(!collegeName) return res.send({msg : "please enter college name"})
        if(! isValidName(collegeName)) return res.send({msg : "please provide valid college name"})

        const collegeData = await collegeModel.findOne({ name : collegeName })
        if (!collegeData) return res.status(400).send({ status: false, message: "No such college found" })

        data.collegeId = collegeData._id.toString()
    
        const internData = await internModel.create(data)
        return res.status(201).send({ status: true, data: internData, message: "data created successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}
 


module.exports={CreateIntern}