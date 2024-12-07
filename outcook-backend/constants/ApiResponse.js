export const responses = {
    successful: {
        status: 200,
        message: { msg: "Successful" }
    },
    
    badRequest: {
        status: 400,
        message: { msg: "Bad Request" }
    },
    
    unauthorized: {
        status: 401,
        message: { msg: "Unauthorized" }
    },

    forbidden: {
        status: 403,
        message: { msg: "Forbidden" }
    },

    notFound: {
        status: 404,
        message: { msg: "Not Found" }
    },

    internalServerError: {
        status: 500,
        message: { msg: "Internal Server Error" }
    },

    customError: (status, message) => ({
        status: status,
        message: { msg: message }
    })
};
