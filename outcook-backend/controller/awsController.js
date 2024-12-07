import ApiResponse from "../utils/ApiReponses.js";
import { getUploadURL } from "../utils/aws.js";

const awsController = {
  getPreSignedUrl: async (req, res) => {

    const key = req.params.key;
    const response = await getUploadURL(key);
        

    if (!key) {
      return new ApiResponse(res).badRequest(
        400,
        "bad request please provide a key name"
      );
    }

    try {

      return new ApiResponse(res).successful(
        "presigned url generated",
        JSON.parse(response)
      );
    } catch (err) {
      return new ApiResponse(res).internalServerError();
    }
  },
};

export default awsController;
