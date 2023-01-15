const express = require("express");
const router = express.Router();
const data = require("../postDummyData");
const { v4: uuidv4 } = require("uuid");
const PostModel = require("../schemas/postSchema");

router.get("/", (request, response) => {
  PostModel.find({}, (err, data) => {
    if (err) {
      response.status(400).json({ message: err.message });
    }
    response.status(200).json({ data: data });
  });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.status(404).json({ message: "id is required" });
  }
  PostModel.findById(id, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Internal server error" });
    }
    response.status(200).json({ data: data });
  });
});

router.put("/:id", (request, response) => {
  const { id } = request.params;
  const body = request.body;
  if (!id) {
    response.status(400).json({ errorMessage: "Bad Request" });
  }
  if (!body.title || !body.content) {
    response.status(204).json({ errorMessage: "title Or content Is Missing" });
  }
  PostModel.findOneAndUpdate(id, body, (err, data) => {
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
  if (!body.title) {
    response.status(400).json({ errorMessage: "title Name required " });
  } else {
    PostModel.create(body, (err, data) => {
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
  PostModel.findOneAndRemove(id, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Internal server error" });
    }
    response.status(200).json({ message: "Successfully deleted" });
  });
});

module.exports = router;
