import { route, layout, index } from "@react-router/dev/routes";

export default [
  layout("layouts/BaseLayoutWebsite.jsx", [
    index("routes/website/home.jsx"),
    // route("/about", "routes/website/about.jsx"),
    // route("/art-detail/:id", "routes/website/art-detail.jsx"),
    // route("/current-event", "routes/website/current-event.jsx"),
    // route("/my-gallery", "routes/website/my-gallery.jsx"),
    // route("/participate", "routes/website/participate.jsx"),
    // route("/previous-events", "routes/website/previous-events.jsx"),
    // route("/event-gallery/:id", "routes/website/event-gallery.jsx"),
    // route("/upload", "routes/website/upload-list.jsx"),
    // route("/upload/:id", "routes/website/upload.jsx"),
    // route("/vote-art", "routes/website/vote-art.jsx"),
    // route("/vote-art/:id", "routes/website/art-category.jsx"),
    // route("/vote-theme", "routes/website/vote-theme.jsx"),
    // route("/vote-complete/:artId", "routes/website/vote-complete.jsx"),
    // route("/edit-art/:id", "routes/website/edit-art.jsx"),
    // route("/destroy-art/:artId", "routes/website/destroy-art.jsx"),
    // route("/upload-success/:id", "routes/website/upload-success.jsx"),
  ]),
  // layout("layouts/BaseLayoutKiosk.jsx", [
  //   route("/kiosk/home", "routes/kiosk/home.jsx"),
  //   route("/kiosk/about", "routes/kiosk/about.jsx"),
  //   route("/kiosk/previous-event-gallery", "routes/kiosk/previous-event-gallery.jsx"),
  //   route("/kiosk/upload-info", "routes/kiosk/upload-info.jsx"),
  //   route("/kiosk/vote-art", "routes/kiosk/vote-art.jsx"),
  //   route("/kiosk/vote-complete/:id", "routes/kiosk/vote-complete.jsx"),
  //   route("/kiosk/vote-theme", "routes/kiosk/vote-theme.jsx"),
  //   route("/kiosk/vote", "routes/kiosk/vote.jsx"),
  // ]),
];
