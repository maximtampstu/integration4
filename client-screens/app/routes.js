import { route, layout, index } from "@react-router/dev/routes";

export default [
  layout("layouts/BaseLayout.jsx", [
    index("routes/home.jsx"),
    route("/about", "routes/about.jsx"),
    route("/previous-event-gallery", "routes/previous-event-gallery.jsx"),
    route("/upload-info", "routes/upload-info.jsx"),
    route("/vote-art", "routes/vote-art.jsx"),
    route("/vote-complete/:id", "routes/vote-complete.jsx"),
    route("/vote-theme", "routes/vote-theme.jsx"),
    route("/vote", "routes/vote.jsx"),
  ]),
];