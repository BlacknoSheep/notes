import "./style/index.css";
document.body.insertAdjacentHTML("beforeend", "<h1>Hello, world!</h1>");
document.body.onclick = () => {
  alert("被点了！");
};
