const internModel = require("../models/InternModel")
const collegeModel = require("../models/CollegeModel")
const {isValidString,isValidName,isValidImage} = require('../validators/validations')

const createCollege =async function (req,res){

    try{
        let data = req.body
        let {name,fullName,logoLink}=data
        if(Object.keys(data).length==0)   return res.status(400).send({status:false,message:"Request body is empty"})
        
        if(!name)  return res.status(400).send({status:false,message:"name is mandatory"})
        if(!isValidString(name) || !isValidName(name) ) return res.status(400).send({status:false,message:"Please provide valid name"})
        const data1= await collegeModel.findOne({name:name})
        if(data1)  return res.status(400).send({status:false,message:"name is already present in Intern DB"})
       
        if(!fullName)  return res.status(400).send({status:false,message:"fullName is mandatory"})
        if(!isValidString(fullName) || !isValidName(fullName) ) return res.status(400).send({status:false,message:"Please provide valid fullName"})
        
        if(!logoLink)  return res.status(400).send({status:false,message:"logoLink is mandatory"})
        if(!isValidImage(logoLink))  return res.status(400).send({status:false,message:"Please provide valid logoLink"})

        const savedData = await collegeModel.create(data)
        return res.status(201).send({status:true,data:savedData, message: "college  create successfully"})
    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    }  
}



//================get api==============================================

const getCollegeData =async function (req,res){

    try{
       let collegeName = req.query.collegeName
//=============query is not given=====================

        if(Object.keys(collegeName).length==0) return res.status(400).send({status:false,message:"Please provide collegeName"})
        
 //=============finding the valid college====================     

        const findCollege= await collegeModel.findOne({name:collegeName,isDeleted:false})

 //=================if college name is worng=====================   

        if(!findCollege)  return res.status(404).send({status:false,message:"collegeName doesn't exist"})
        let collegeId = findCollege._id

//==============finding interns in the college ==================================

        const interns  = await internModel.find({collegeId: collegeId,isDeleted: false}).select({name:1, email:1, mobile:1})
        if(interns.length==0)  return res.status(404).send({status:false,message:"No interns found for this College"})

        let obj={}
        const result = await collegeModel.findOne({name:collegeName, isDeleted:false})
        obj.name = result.name  
        obj.fullName = result.fullName
        obj.logoLink = result.logoLink
        obj.interns = interns

        return res.status(200).send({status:true, data:obj,message:"get data successfully" })

    }catch(error){
        return res.status(500).send({status:false,message:error.message})
    } 
}


module.exports.CreateCollege  = createCollege
module.exports.getCollegeData = getCollegeData