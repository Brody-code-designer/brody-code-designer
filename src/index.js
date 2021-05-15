// Import our libraries
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")

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
    response.header("Access-Control-Allow-Origin", "*")
    console.log(request.body)
    return(response.json("Thank you for submitting an email"))
}

indexRoute.route("/")
    .get(handleGetRequest)
    .post(handlePostRequest)

app.use("/apis", indexRoute)

app.listen(4200, ()=> {console.log("express successfully built")})
