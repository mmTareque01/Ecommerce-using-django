

class errorStatus {


    serverError(res){
        return res.status(500).send(
            {error: "Internal Server Error! We are working to fix it. Please try again later. Thank you."}
        )
    }

    dataNotFound(res){
        return res.status(404).send(
            {error: "Invalid user!!!"}
        )
    }








}

module.exports = new errorStatus();


















