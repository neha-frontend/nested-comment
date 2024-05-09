import React, { useState } from "react";

const CommentForm = ({
  handleSubmit,
  btnText,
  handleCancel,
  initialText = "",
  parentId,
}) => {
  const [text, setText] = useState(initialText);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text, parentId);
    setText("");
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      onSubmit(e);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <textarea
        placeholder="Write comment....."
        className="w-100 p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onEnterPress}
      />
      {btnText !== "Write" && (
        <button
          className="btn btn-secondary px-3 py-1 my-2 me-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
      <button
        className="btn btn-primary px-3 py-1 my-2"
        disabled={text?.length === 0}
        type="submit"
      >
        {btnText}
      </button>
    </form>
  );
};

export default CommentForm;
