const main = document.querySelector(".main");
const comment = document.querySelector("#comment").content;
const reply = document.querySelector("#reply").content;
const dataBase = [];
const replies = [];
// dataBase.push(replies);
const currentUser = {};
const fillData = () => {
  document
    .querySelector(".addComment")
    .querySelector(".CurrentUser")
    .querySelector(".userPicture").src = currentUser.profilePic;
  document
    .querySelector(".addComment")
    .querySelector(".CurrentUser")
    .querySelector(".username").textContent = currentUser.username;
};
const createComment = async (
  id,
  content,
  createdAt,
  score = 0,
  username,
  image
) => {
  const commentClone = document.importNode(comment, true);
  commentClone.querySelector(".likes").innerHTML = `
    <button class="add" onclick="upvote(${id})"><img src="images/icon-plus.svg" /></button>
    <span class="number" id="${id}">${score}</span>
    <button class="minus" onclick="downvote(${id})"><img src="images/icon-minus.svg" /></button>
    `;
  commentClone.querySelector(".profilePic").innerHTML = `<img src="${image}">`;
  commentClone.querySelector(".user").innerHTML = username;
  commentClone.querySelector(".date").innerHTML = createdAt;
  commentClone.querySelector(".reply").innerHTML = `
    <img src="images/icon-reply.svg" />
    <span class="bold" onclick="showReply(${id})">Reply</span>`;
  commentClone.querySelector(".comment").innerHTML = content;
  commentClone.querySelector(
    ".ReplyButton"
  ).innerHTML = `<button onclick="sendReply(${id})">Reply</button>`;
  main.appendChild(commentClone);
};
const getData = async () => {
  const path = await fetch(`./data.json`);
  const data = await path.json();
  currentUser.username = data.currentUser.username;
  currentUser.profilePic = data.currentUser.image.png;
  data.comments.forEach((element) => {
    dataBase.push(element);
  });
  createComment(
    dataBase[0].id,
    dataBase[0].content,
    dataBase[0].createdAt,
    dataBase[0].score,
    dataBase[0].user.username,
    dataBase[0].user.image.png
  );
  createComment(
    dataBase[1].id,
    dataBase[1].content,
    dataBase[1].createdAt,
    dataBase[1].score,
    dataBase[1].user.username,
    dataBase[1].user.image.png
  );
  addingID();
  fillData();
  createReply(
    2,
    dataBase[1].replies[0].content,
    dataBase[1].replies[0].createdAt,
    dataBase[1].replies[0].user
  );
  createReply(
    2,
    dataBase[1].replies[1].content,
    dataBase[1].replies[1].createdAt,
    dataBase[1].replies[1].user
  );
};

getData();
