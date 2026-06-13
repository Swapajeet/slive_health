require('dotenv').config();
const express = require("express");
const  mongoose = require("mongoose");
const {pridicationModel} = require("./Model/pridication");
const {userModel} = require("./Model/userModel");
const bodyparser = require("body-parser");
const { createSecretToken } = require("./util/SecretToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const{ CookiesProvider }= require( "react-cookie");
const cors = require("cors");
const { PythonShell } =
require("python-shell");

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "https://slive-health-1.onrender.com", // frontend URL
    credentials: true,
  })
);
app.use(express.json());

const db_url = process.env.MONGO_URL;
try{
   mongoose.connect(db_url);
   console.log("HI i am databese ");
}catch(e) {
   console.log(e);
}

app.post("/predict", async (req, res) => {
  try {
    // Get token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_KEY
    );

    const userId = decoded.id;

    console.log(
      "Logged User ID:",
      userId
    );

    // Get frontend data
    const {
      conductivity,
      oxygen,
      methane,
      ammonia,
    } = req.body;

    // Python arguments
    const options = {
      args: [
        conductivity,
        oxygen,
        methane,
        ammonia,
      ],
    };

    const path = require("path");

    // Run Python file
    const result =
      await PythonShell.run(
        path.join(
          __dirname,
          "python",
          "predict.py"
        ),
        options
      );

    // Parse Python JSON output
    const predictionData =
      JSON.parse(result[0]);

    console.log(
      "Prediction Data:",
      predictionData
    );

    // Find highest percentage disease
    const topDisease =
      predictionData.reduce(
        (max, current) =>
          current.percentage >
          max.percentage
            ? current
            : max
      );

    console.log(
      "Top Disease:",
      topDisease
    );

    // Save prediction
    const newPrediction =
      await pridicationModel.create({
        owner: userId,
        conductivity,
        oxygen,
        methane,
        ammonia,
        disease:
          topDisease.disease,
        percentage:
          topDisease.percentage,
      });

    console.log(
      "Prediction Saved:",
      newPrediction
    );

    // Find user
    const user =
      await userModel.findById(
        userId
      );

    if (!user) {
      return res.status(404)
        .json({
          success: false,
          message:
            "User not found",
        });
    }

    // Add prediction to user
    user.checkup.push(
      newPrediction._id
    );

    await user.save();

    console.log(
      "Prediction added to user checkup"
    );

    // Send response to frontend
    res.status(200).json({
      success: true,
      result: predictionData,
      predictedDisease:
        topDisease.disease,
      confidence:
        topDisease.percentage,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message:
        "Server Error",
    });
  }
});


    app.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check user already exists
    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const user = await userModel.create({
      email,
      password,
      username,
    });

    // Create token
    const token = createSecretToken(user._id);

    // Save token in cookie
   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

    // Response
    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const user = await userModel.findOne({ email });

    console.log(user);

    if (!user) {
      return res.json({
        message: "Incorrect password or email"
      });
    }

    const auth = await bcrypt.compare(
      password,
      user.password
    );

    console.log(auth);

    if (!auth) {
      return res.json({
        message: "Incorrect password or email"
      });
    }

    const token = createSecretToken(user._id);

   res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", (req, res) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });

  res.status(200).json({
    message: "Logout successful"
  });

});

app.get("/verify", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
    });
  }

  try {
    jwt.verify(token, process.env.TOKEN_KEY);

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
    });
  }
});


app.listen(3001,
() => {
    console.log(
        "Server Running"
    );
});