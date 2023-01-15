const express = require("express");
const data = require("../commentsData");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const CommentModel = require("../schemas/commentSchema");

router.get("/", (request, response) => {
  CommentsModel.find({}, (err, data) => {
    if (err) {
      response.status(400).json({ message: err.message });
    }
    response.status(200).json({ data: data });
  });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.status(404).json({ message: "comment id is required" });
  }
  CommentsModel.findById(id, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Internal server error" });
    }
    response.status(200).json({ data: data });
  });
});

router.put("/:commentId", (request, response) => {
  const { id } = request.params;
  const body = request.body;
  if (!id) {
    response.status(400).json({ errorMessage: "Bad Request" });
  }
  if (!body.id || !body.comment) {
    response.status(204).json({ errorMessage: "id and comment Is Missing" });
  }
  CommentModel.findOneAndUpdate(id, body, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Internal server error" });
    }
    response
      .status(201)
      .json({ message: "Successfully updated the comment", data: data });
  });
});

router.post("/", (request, response) => {
  console.log(request);
  const body = request.body;
  console.log(body);
  if (!body.id) {
    response.status(400).json({ errorMessage: "id required " });
  } else {
    CommentModel.create(body, (err, data) => {
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
  CommentModel.findOneAndRemove(id, (err, data) => {
    if (err) {
      response.status(500).json({ message: "Internal server error" });
    }
    response.status(200).json({ message: "Successfully deleted" });
  });
});;


module.exports = router;
