import React from "react";
import USER_ICON from "../assets/img/user-icon.png";
import CommentForm from "./CommentForm";

const Comment = ({
  comment,
  replies,
  currentUserId,
  handleDelete,
  addComment,
  activeComment,
  setActiveComment,
  handleEdit,
  parentId,
  getReply,
}) => {
  const handleCancel = () => {
    setActiveComment(null);
  };
  const replyId = parentId ? parentId : comment.id;
  return (
    <div className="mb-4">
      <div className="d-flex gap-2 mb-2">
        <div className="img-container">
          <img src={USER_ICON} alt="" className="user_icon" />
        </div>
        <div>
          <div className="d-flex gap-2 user_info">
            <p className="username">{comment.username}</p>
            <p className="date">
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
          <p>{comment.body}</p>
          <div className="d-flex gap-2 btn_container">
            <span
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
              className={activeComment?.type === "replying" && "active"}
            >
              Reply
            </span>
            {comment.userId === currentUserId && (
              <>
                <span
                  onClick={() =>
                    setActiveComment({ id: comment.id, type: "editing" })
                  }
                  className={activeComment?.type === "editing" && "active"}
                >
                  Edit
                </span>
                <span onClick={() => handleDelete(comment.id)}>Delete</span>
              </>
            )}
          </div>
          {activeComment && activeComment?.id === comment.id && (
            <CommentForm
              btnText={activeComment.type === "replying" ? "Reply" : "Edit"}
              handleCancel={handleCancel}
              parentId={comment.parentId}
              initialText={
                activeComment.type !== "replying" ? comment.body : ""
              }
              handleSubmit={(text) =>
                activeComment.type === "replying"
                  ? addComment(text, replyId, comment.id)
                  : handleEdit(text, comment.id)
              }
            />
          )}
        </div>
      </div>

      {replies?.length > 0 && (
        <div className="ms-5 mb-2">
          {replies.map((reply) => (
            <Comment
              comment={reply}
              currentUserId={currentUserId}
              addComment={addComment}
              activeComment={activeComment}
              setActiveComment={setActiveComment}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              parentId={comment.id}
              getReply={getReply}
              replies={getReply(reply.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
