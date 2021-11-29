const app = require("express").Router();
const jwt = require("jsonwebtoken");
const userOperation = require("../Db/helpers/userCRUD");

app.post("/login", (req, res) => {
  userOperation.login(req.body, res);
});

app.post("/signup", (req, res) => {
  userOperation.AddUser(req.body, res);
});

app.post("/getData", async (req, res) => {
  var result = await userOperation.Find(req.body.username);
  if (result) {
    res.json({ user: result });
  } else {
    console.log("not possible");
  }
});

app.get("/getUser", (req, res) => {
  const bearerHeader = req.headers["authorization"];
  // bearer Header or token = "bearer <token>"

  if (typeof bearerHeader !== "undefined") {
    // split at the space so that we get two array one containing bearer and another token

    const bearer = bearerHeader.split(" ");
    //   get token from array
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        // console.log("---------------authData-------------------------");
        // console.log(authData);
        // console.log("---------------authData-------------------------");
        res.json({ userdata: authData });
      }
    });
  } else {
    res.sendStatus(403);
  }
});

app.post("/AddFriend", (req, res) => {
  // console.log("Hello data ", req.body);
  userOperation.AddFriend(req.body, res);
});

app.post("/addExp", (req, res) => {
  userOperation.AddExp(req.body, res);
});
app.post("/settle", (req, res) => {
  userOperation.settle(req.body, res);
});

module.exports = app;
