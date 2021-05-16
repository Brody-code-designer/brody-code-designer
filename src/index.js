// Import our libraries
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const {check, validationResult} =require("express-validator")

const validation = [
    check("name", "A valid name is required").not().isEmpty().trim().escape(),
    check("email", "Please provide a valid email").isEmail(),
    check("subject").optional().trim().escape(),
    check("message", "Please provide a message that is under two thousand characters")
        .trim()
        .escape().isLength({min:1, max:2000})

]

//initialize Express
const app = express()

// app.use allows for different middleware to be brought into Express
// Morgan: a logger for express so that we have a record for debugging.
app.use(morgan("dev"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const indexRoute = express.Router()


const handleGetRequest = (request, response, next) => {
    return(response.json("server is live"))
}
const handlePostRequest = (request, response, next) => {

    //TODO remove when Docker is up and running
    response.append("Content-Type", "text/html")
    response.append("Access-Control-Allow-Origin", "*")

    const errors = validationResult(request)

    if (errors.isEmpty() === false) {
        const currentError = errors.array()[0]
        return response.send(Buffer.from(`<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> ${currentError.msg}</div>`))
    }
    console.log(request.body)
    return(response.json("Thank you for submitting an email")) //not getting a message returned
}

indexRoute.route("/")
    .get(handleGetRequest)
    .post(validation, handlePostRequest)

app.use("/apis", indexRoute)

app.listen(4200, ()=> {console.log("express successfully built")})
