import mongoose ,{Schema}from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
username:{
    type:String,
    required: true,
    lowercase:true
},
password:{
    type:String,
    required:true,
    select:false
},
email:{
    type:String,
    unique:true,
    required:true
},
refreshToken:{
    type:String,
    exprires : 24*7,
    createdAt: Date.now()
},
mobile:{
    type:String,
    default:null
},
address:{
   type:mongoose.Schema.Types.ObjectId,
   ref: "Address",
   default: null
},
cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    default: null
}
},{timestamps:true})


userSchema.pre('save',async function (next) {
    if(!this.isModified('password')) return null
    const salt = await bcrypt.genSalt(10)
   this.password =  await bcrypt.hash(this.password,salt)
    next()
})
userSchema.methods.isMatchPassword= async  function (password){
    let isValidPass = await bcrypt.compare(password,this.password)
    return isValidPass
}
const User = mongoose.model('User' , userSchema)
export default User
