const newComment = document
  .querySelector(".addComment")
  .querySelector(".replyArea");
const newCommentBTN = document
  .querySelector(".addComment")
  .querySelector(".ReplyButton");
let newCommentValue;
const showReply = (id) => {
  document
    .getElementById(id)
    .querySelector(".ReplySection")
    .classList.toggle("inactive");
};
const nameMonth = () => {
  const coreDate = new Date();
  let month;
  switch (coreDate.getMonth()) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "Jun";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "december";
      break;
  }
  return month;
};
newCommentBTN.addEventListener("click", () => {
  newCommentFunction();
});
const newCommentFunction = () => {
  if (newComment.value) {
    newCommentValue = newComment.value;
    const id = dataBase.length + 1;
    const coreDate = new Date();
    let month = nameMonth();
    const createdAt = coreDate.getDate() + " " + month;
    const user = currentUser.username;
    const profilePic = currentUser.profilePic;
    const newCommentObj = {
      id,
      createdAt,
      user: { username: user, image: profilePic },
      content: newCommentValue,
      score: 0,
      replies: [],
    };
    dataBase.push(newCommentObj);
    newComment.value = "";
    createComment(
      newCommentObj.id,
      newCommentObj.content,
      newCommentObj.createdAt,
      newCommentObj.score,
      newCommentObj.user.username,
      newCommentObj.user.image
    );
    addingID();
  }
};
const sendReply = (id) => {
  const replyArea = document.getElementById(id).querySelector(".replyArea");
  if (replyArea.value) {
    createReply(id, replyArea.value);
    replyArea.value = " ";
  } else {
    return;
  }
};
const addingID = async () => {
  const commentList = Array.from(
    document.querySelectorAll(".comment-container")
  );
  commentList.forEach((comment) => {
    comment.setAttribute("id", commentList.indexOf(comment) + 1);
  });
};
const markReplies = (id, replyOBJ) => {
  const replies = Array.from(
    document
      .getElementById(id)
      .querySelector(".repliesContainer")
      .querySelectorAll(".reply-wrapper")
  );
  replies.forEach((element) => {
    if (element.id) {
      console.log("there is id");
    } else {
      element.setAttribute("id", `reply${replyOBJ.id}`);
    }
  });
};
const createReply = async (id, text, PostedAt, user) => {
  const replyClone = document.importNode(reply, true);
  const coreDate = new Date();
  let month = nameMonth();
  let createdAt;
  if (!PostedAt) {
    createdAt = coreDate.getDate() + " " + month;
  } else {
    createdAt = PostedAt;
  }
  if (!user) {
    replyClone.querySelector(
      ".profilePic"
    ).innerHTML = `<img src="${currentUser.profilePic}">`;
    replyClone.querySelector(".user").innerHTML = currentUser.username;
  } else {
    replyClone.querySelector(
      ".profilePic"
    ).innerHTML = `<img src="${user.image.png}">`;
    replyClone.querySelector(".user").innerHTML = user.username;
  }
  replyClone.querySelector(".date").innerHTML = createdAt;
  replyClone.querySelector(".comment").innerHTML = text;
  const replyOBJ = {
    parentID: id,
    id: replies.length + 1,
    replyingTo: dataBase[id - 1].user.username,
    content: text,
    createdAt: createdAt,
    user: {
      image: currentUser.profilePic,
      username: currentUser.username,
    },
  };
  replyClone.querySelector(
    ".delete"
  ).innerHTML = `<button onclick="deleteReply(${replyOBJ.parentID},${replyOBJ.id})">delete</button>`;
  replyClone.querySelector(
    ".edit"
  ).innerHTML = `<button onclick="edit(${replyOBJ.parentID},${replyOBJ.id})">edit</button>`;
  replyClone.querySelector(
    ".doneEdit"
  ).innerHTML = `<button onclick="finishEdit(${replyOBJ.parentID},${replyOBJ.id})">finish Editing</button>`;
  document
    .getElementById(id)
    .querySelector(".repliesContainer")
    .appendChild(replyClone);
  dataBase.forEach((comment) => {
    if (comment.id === id) {
      comment.replies.forEach((reply) => {
        if (reply.content === replyOBJ.content) {
          return;
        } else {
          if (comment.id.replies) comment.replies.push(replyOBJ);
        }
      });
    }
  });
  replies.push(replyOBJ);
  markReplies(id, replyOBJ);
};
const upvote = (id, isReply) => {
  if (isReply) {
    document
      .getElementById(id)
      .querySelector(".repliesContainer")
      .querySelector(".number").innerHTML = dataBase[id - 1].score++;
  } else {
    document.getElementById(id).querySelector(".number").innerHTML = dataBase[
      id - 1
    ].score++;
  }
};
const downvote = (id, isReply) => {
  if (isReply) {
    document
      .getElementById(id)
      .querySelector(".repliesContainer")
      .querySelector(".number").innerHTML = dataBase[id - 1].score--;
  } else {
    document.getElementById(id).querySelector(".number").innerHTML = dataBase[
      id - 1
    ].score--;
  }
};
const deleteReply = (parentid, replyid) => {
  console.log(this);
  document
    .getElementById(parentid)
    .querySelector(`#reply${replyid}`)
    .closest(".reply-wrapper")
    .remove();
};
const edit = (parentid, replyid) => {
  let activeReply = {};
  replies.forEach((reply) => {
    if (reply.id === replyid) {
      activeReply = reply;
    }
  });
  document
    .getElementById(parentid)
    .querySelector(`#reply${replyid}`)
    .querySelector(".doneEdit")
    .classList.remove("inactive");
  document
    .getElementById(parentid)
    .querySelector(`#reply${replyid}`)
    .querySelector(
      ".comment"
    ).innerHTML = `<textarea class="editing">${activeReply.content}</textarea>`;
};
const finishEdit = (parentid, replyid) => {
  const editing = document
    .getElementById(parentid)
    .querySelector(`#reply${replyid}`)
    .querySelector(".editing");
  const original = document
    .getElementById(parentid)
    .querySelector(`#reply${replyid}`)
    .querySelector(".comment");
  original.innerHTML = editing.value;
  document
    .getElementById(parentid)
    .querySelector(`#reply${replyid}`)
    .querySelector(".doneEdit")
    .classList.add("inactive");
};
