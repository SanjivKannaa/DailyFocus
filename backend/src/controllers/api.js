// controllers/userController.js
const helloWorld = (req, res) => {
  res.json({ message: "Hello World!" , metadata: "visit /docs for api documentation"});
};

const docs = (req, res) => {
  res.json({message: "api documentation"});
}
  
module.exports = { helloWorld, docs};
