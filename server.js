import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "crypto";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const home_content =
  "Welcome to the blog website! Here you can find a variety of articles on different topics. Feel free to explore and share your thoughts.";
const about_content =
  "This is a blog website where users can share their thoughts and ideas on various topics. Users can create, read, update, and delete blog posts. The website is built using Node.js, Express, and EJS templating engine.";

const contact_content =
  "For any inquiries or feedback, please reach out to us at ";
const public_posts = [];
const posts = [];
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.post("/post", (req, res) => {
  const postContent = req.body.postContent;
  const postTitle = req.body.postTitle;
  const id = crypto.randomUUID();
  posts.push({ id: id, title: postTitle, content: postContent });
  console.log("New Post Created:");
  res.redirect(`/posts`);
});

app.post("/post/:id/delete", (req, res) => {
  const postId = req.params.id;
  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return res.status(404).send("Post not found");
  }
  posts.splice(postIndex, 1);
  console.log(`Post with ID ${postId} deleted.`);
  res.redirect("/posts");
});

app.get("/post/:id/public", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).send("Post not found");
  const alreadyPublic = public_posts.some((p) => p.id === post.id);
  if (!alreadyPublic) public_posts.push(post);

  res.redirect("/");
});

app.get("/post/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("post", {
    post,
  });
});
app.get("/post/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) {
    return res.status(404).send("Post not found");
  }
  res.render("edit", {
    post,
  });
});

app.post("/post/:id/edit", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  post.title = req.body.postTitle;
  post.content = req.body.postContent;
  res.redirect("/posts");
});
app.get("/", (req, res) => {
  res.render("index", {
    title: "Blogs",
    homeContent: home_content,
    post: public_posts,
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contact_content,
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: about_content,
  });
});

app.get("/posts", (req, res) => {
  res.render("blog_posts", {
    posts: posts,
  });
});

app.get("/posts/new", (req, res) => {
  res.render("new_posts");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
