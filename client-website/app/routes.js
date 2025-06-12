import { route, layout, index } from "@react-router/dev/routes";

export default [
  layout("layouts/BaseLayout.jsx", [
    index("routes/home.jsx"),
    route("/about", "routes/about.jsx"),
    route("/profile", "routes/profile.jsx"),
    route("/art-detail/:id", "routes/art-detail.jsx"),
    route("/current-event", "routes/current-event.jsx"),
    route("/my-gallery", "routes/my-gallery.jsx"),
    route("/participate", "routes/participate.jsx"),
    route("/previous-events", "routes/previous-events.jsx"),
    route("/event-gallery/:id", "routes/event-gallery.jsx"),
    route("/upload", "routes/upload-list.jsx"),
    route("/upload/:id", "routes/upload.jsx"),
    route("/vote-art", "routes/vote-art.jsx"),
    route("/vote-art/:id", "routes/art-category.jsx"),
    route("/vote-theme", "routes/vote-theme.jsx"),
    route("/vote-complete/:artId", "routes/vote-complete.jsx"),
    route("/edit-art/:id", "routes/edit-art.jsx"),
    route("/destroy-art/:artId", "routes/destroy-art.jsx"),
    route("/upload-success/:id", "routes/upload-success.jsx"),
  ]),
];
