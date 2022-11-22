const mongoose = require('mongoose')

//=========================validation for email===================================

const isValidEmail = function (value) {
  let emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
  if (emailRegex.test(value)) return true;
};

//==========================validation for string==================================

const isValidString = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//==============================validation for name===============================

const isValidName = function (name) {
  if (/^[a-zA-Z, ]+$/.test(name)) {
    return true;
  }
};

//==============================validation for mobile ===============================

const isValidMobile = function (mobile) {
 if (/^[0]?[789]\d{9}$/.test(mobile)){
    return true
 }
}
//===========================validation for image===================================

const isValidImage = function (image) {
  if (/^(https\:\/\/.*\.(?:png|jpg))/.test(image)){
     return true
  }
 }

 
//============================= module exports ==============================

module.exports = { isValidEmail, isValidString,isValidName,isValidMobile,isValidImage}