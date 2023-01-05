const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server live at http://localhost:${PORT}`));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());

// Route for index
app.use("/login", require("./routes/Login.jsx"));
app.use("/leave-application", require("./routes/LeaveApplication.jsx"));
app.use("/user-profile", require("./routes/UserProfile.jsx"));
app.use("/filter", require("./routes/FilterData.jsx"));
app.use("/details-by-employee-id", require("./routes/EmployeeData.jsx"));
app.use("/submit-changes", require("./routes/EditDetails.jsx"));

