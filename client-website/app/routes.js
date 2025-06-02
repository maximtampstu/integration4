import { route, layout, index } from "@react-router/dev/routes";

export default [
  layout("layouts/BaseLayout.jsx", [
    index("routes/home.jsx"),
    route("/about", "routes/about.jsx"),
    route("/profile", "routes/profile.jsx"),
  ]),
];
