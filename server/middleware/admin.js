// non admin users should not be able to post guitar brands
let admin = (req, res, next) => {
  //is user allowed to post?
  if (req.user.role === 0) {
    return res.send("Non-admin users not authorized");
  }
  //move to next
  next();
};
module.exports = { admin };
