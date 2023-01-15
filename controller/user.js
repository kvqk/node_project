const express = require("express");

const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../schemas/userSchema");

router.get("/", (request, response) => {
  UserModel.find({}, (err, data) => {
    if (err) {
      response.status(400).json({ message: err.message });
    }
    response.status(200).json({ data: data });
  });
});

router.get("/:userId", (request, response) => {
  const { userId } = request.params;
  if (!userId) {
    response.status(404).json({ message: "UserId is required" });
  }
  UserModel.findById(userId, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Internal server error" });
    }
    response.status(200).json({ data: data });
  });
});

router.put("/:userId", (request, response) => {
  const { userId } = request.params;
  const body = request.body;
  if (!userId) {
    response.status(400).json({ errorMessage: "Bad Request" });
  }
  if (!body.firstName || !body.email) {
    response
      .status(204)
      .json({ errorMessage: "firstName Or email Is Missing" });
  }
  UserModel.findOneAndUpdate(userId, body, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Internal server error" });
    }
    response
      .status(201)
      .json({ message: "Successfully updated the user", data: data });
  });
});

router.post("/", (request, response) => {
  console.log(request);
  const body = request.body;
  console.log(body);
  if (!body.firstName) {
    response.status(400).json({ errorMessage: "First Name required " });
  } else {
    UserModel.create(body, (err, data) => {
      if (err) {
        response.status(500).json({ message: "Internal server error" });
      }
      if (data) {
        response.status(201).json({ data: data });
      }
    });
  }
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ message: "Bad request" });
  }
  UserModel.findOneAndRemove(id, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Internal server error" });
    }
    response.status(200).json({ message: "Successfully deleted" });
  });
});

module.exports = router;

//put // update
//create // post
//delete // delete
//get //  all data
//get by id // specific user
