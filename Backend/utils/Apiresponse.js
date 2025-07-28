class Apiresponse {
  constructor(statusCode, message , success= true ,error = false, data) {
   this.statusCode = statusCode
   this.message = message
   this.success = success
   this.data = data
   this.error = error
  }

}
export default Apiresponse;
