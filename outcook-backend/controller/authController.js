import dotenv from "dotenv";
dotenv.config();
import z from "zod";
import jwt from "jsonwebtoken";
import dbService from "../utils/dbService.js";
import ApiResponse from "../utils/ApiReponses.js";
import UserData from "../model/userdata.js";
import CookieData from "../model/cookieData.js";
import { v4 as uuidv4 } from "uuid";

const privateKey = process.env.Private_key;

const emailSchema = z.string().email({ message: "Invalid email address" });
const usernameSchema = z.string().min(2, { message: "username too short" });
const passwordSchema = z.coerce.string()
const authCookieOptions = {
  //we will be storing cookies for 30 days
  maxAge: 30 * 24 * 60 * 60 * 1000 ,
  httpOnly: true,
  sameSite: "None",
  secure : true
}

const authController = {
  signUp: async (req, res) => {
    const username = req.body.username.replaceAll(" ", "");
    const password = req.body.password;
    const email = req.body.email;

    if (!username) {
      return new ApiResponse(res).customError(400, {
        err: "Bad Request! username not found",
      });
    } else if (!email) {
      return new ApiResponse(res).customError(400, {
        err: "Bad Request! email not found",
      });
    } else if (!password) {
      return new ApiResponse(res).customError(400, {
        err: "Bad Request! password not found",
      });
    }

    const userCheck = usernameSchema.safeParse(username);
    const emailCheck = emailSchema.safeParse(email);
    const passwordCheck = passwordSchema.safeParse(password);

    const passwordHash = jwt.sign(password, privateKey);

    //will replace with a bloom filter later on

    const user = await dbService.findOne(UserData, { email: email });

    if (user) {
      return new ApiResponse(res).customError(400, {
        message: "user already exists with the same email",
      });
    }

    if (userCheck.success && passwordCheck.success && emailCheck.success) {
      try {
        await dbService.create(UserData, {
          email: email,
          username: username,
          password: passwordHash,
        });

        return new ApiResponse(res).successful("user signup successful");
      } catch (err) {
        return new ApiResponse(res).customError(400, {
          err: err.toString(),
        });
      }
    } else {
      const failiureMessageArr = new Array();

      if (userCheck.success === false) {
        failiureMessageArr.push(userCheck);
      }

      if (emailCheck.success === false) {
        failiureMessageArr.push(emailCheck);
      }

      if (passwordCheck.success === false) {
        failiureMessageArr.push(password);
      }

      let failiureMsg = "";

      for(let i = 0 ; i < failiureMessageArr.length - 1; i++){
          failiureMsg += failiureMessageArr[i];   
      }
      return new ApiResponse(res).customError(402,failiureMsg );
    }
  },

  signIn: async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    if (!email) {
      return new ApiResponse(res).customError(400, {
        err: "Bad Request! email not found",
      });
    } else if (!password) {
      return new ApiResponse(res).customError(400, {
        err: "Bad Request! password not found",
      });
    }

    const passwordHash = jwt.sign(password, privateKey);

    //check in user db if the user exists
    const user = await dbService.findOne(UserData, {
      email: email,
      password: passwordHash,
    });

    if (!user) {
      return new ApiResponse(res).customError(400, {
        message:
          "please check email and password and make sure you have signed up before signing in!",
      });
    }

    //check in cookie db if the user session already exists , if the user session already exists just return the user session
    const user_cookie = await dbService.findOne(CookieData, { email: email });

    if (user_cookie) {
      //HAVE TO SEND A COOKIE TO THE USER BROWSER***************
      res.cookie("access_token", user_cookie.access_token, authCookieOptions);
      return new ApiResponse(res).successful("user signup successful", {
        token: user_cookie.access_token,
      });
    }

    const token = jwt.sign(
      {
        email: email,
        uuid: uuidv4(),
      },
      privateKey
    );

    try {
      await dbService.create(CookieData, {
        email: email,
        access_token: token,
      });
      console.log("created new entry....");

      res.cookie("access_token", token, authCookieOptions);

      return new ApiResponse(res).successful("user signin successful", {
        token: token,
      });
    } catch (err) {
      return new ApiResponse(res).customError(400, {
        err: err.toString(),
      });
    }
  },
  signOut: async (req, res) => {
    const email = req.body.email;

    //check for token

    const cookie = req.cookies.access_token;

    if (!cookie) {
      return new ApiResponse(res).customError(400, {
        err: "token not found , please sign up or sign in first",
      });
    }
    //Clear cookies from the user's browser

    res.clearCookie("access_token");

    try {
      await dbService.deleteByQuery(CookieData, { email: email });
      return new ApiResponse(res).successful("user signout successful");
    } catch (err) {
      return new ApiResponse(res).customError(400, {
        err: err.toString(),
      });
    }
  },
};

export default authController;
