const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 3000;

// morgan hilft uns eingehende requests zu sehen
app.use(morgan("dev"));

// wandelt json in object literals um und hängt sie an req.body an
app.use(express.json());

app.use(cors());

// http://localhost:3000/
app.get("/", (req, res) => {
  res.send({ response: "Hello!" });
});

app.post("/form-validation", (req, res) => {
  const { firstName, lastName, email, message, requestType } = req.body;

  console.log(req.body);

  if (!onlyLettersSpaces(firstName)) {
    res.status(400).send({
      response:
        "Your first name does not consist only of letters. Please change!",
    });
    return;
  }

  if (!onlyLettersSpaces(lastName)) {
    res.status(400).send({
      response:
        "Your last name does not consist only of letters. Please change!",
    });
    return;
  }
  if (!validateEmail(email)) {
    res
      .status(400)
      .send({ response: "Your email is not valid, Please change!" });
    return;
  }

  if (!validateMessage(message)) {
    res.status(400).send({ response: "Please only use 200 letters & spaces!" });
    return;
  }

  if (!validateRequestType(requestType)) {
    res.status(400).send({ response: "Please choose a valid request type!" });
    return;
  }

  res
    .status(200)
    .send({ response: "you have passed form validation, congrats!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// validate functions
function onlyLettersSpaces(str) {
  if (/^[a-zA-Z\\s]+$/.test(str)) {
    return true;
  } else {
    return false;
  }
}

function validateEmail(email) {
  if (email.includes("@")) {
    return true;
  } else {
    return false;
  }
}

function validateMessage(message) {
  if (message.length <= 200) {
    return true;
  } else {
    return false;
  }
}

function validateRequestType(type) {
  //type: "priceRequest", "offer", "other"
  // const acceptedRequests = ["priceRequest", "offer", "other"]
  // return acceptedRequests.includes(type)
  if (type === "priceRequest" || type === "offer" || type === "other") {
    return true;
  } else {
    return false;
  }
}

// todo
// 1) input types form: button, email, text, select, checkbox
// 2) frontend validierung + fehlermeldungen
// 3)
