import React, { useEffect, useState } from "react";

import { getComments } from "../data/commentData";

import "./comments.css";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (comment) => comment.parentId === null
  );

  useEffect(() => {
    getComments().then((data) => setBackendComments(data));
  }, []);
  console.log(backendComments, "backendComents");
  console.log(rootComments, "root");
  const getReply = (id) => {
    return backendComments
      .filter((comment) => comment.parentId === id)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };
  const addComment = (comment, parentId, commentId) => {
    const newComment = {
      id: backendComments.length + 1,
      body: comment,
      username: "Jack",
      userId: "1",
      parentId: commentId ? commentId : parentId,
      createdAt: new Date().toISOString(),
    };
    setBackendComments((prev) => [newComment, ...prev]);
    setActiveComment(null);
  };
  const handleDelete = (id) => {
    const updatedComment = backendComments.filter(
      (comment) => comment.id !== id
    );
    setBackendComments(updatedComment);
  };
  const handleEdit = (text, id) => {
    const index = backendComments.findIndex((item) => item.id === id);
    const updatedData = [...backendComments];
    updatedData[index] = { ...updatedData[index], body: text };
    setBackendComments(updatedData);
    setActiveComment(null);
  };
  return (
    <>
      <h2 className="mb-4">Comments</h2>
      <div className="mb-4">
        <h4>Write Comment</h4>
        <CommentForm
          handleSubmit={addComment}
          btnText="Write"
          parentId={null}
        />
      </div>
      {rootComments?.length &&
        rootComments.map((comment) => {
          return (
            <Comment
              comment={comment}
              key={comment.id}
              getReply={getReply}
              replies={getReply(comment.id)}
              currentUserId={currentUserId}
              handleDelete={handleDelete}
              addComment={addComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              handleEdit={handleEdit}
              parentId={comment.parentId}
            />
          );
        })}
    </>
  );
};

export default Comments;
