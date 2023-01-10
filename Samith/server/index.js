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

app.use("/filter", require("./routes/FilterData.jsx"));
app.use(
  "/details-by-employee-id",
  require("./routes/EditEmployeeRoutes/EmployeeData.jsx")
);
app.use(
  "/submit-changes",
  require("./routes/EditEmployeeRoutes/EditDetails.jsx")
);
app.use(
  "/AddEmergencyInfo",
  require("./routes/NewEmployeeRoutes/AddNewEmergencyInfo.jsx")
);
app.use("/AddNewUser", require("./routes/AddNewUser.jsx"));

/* Routing the request to the ALTER TABLE file. */
app.use("/show_tables", require("./routes/AlterTableRoutes/ShowTables.jsx"));
app.use(
  "/show_columns",
  require("./routes/AlterTableRoutes/ShowTableColumns.jsx")
);
app.use("/Alter_Table", require("./routes/AlterTableRoutes/AlterTable.jsx"));

/* Routing the request to the SALARY CHANGE file. */
app.use("/Change_Salary", require("./routes/SalaryRoutes/ChangeSalary.jsx"));
app.use("/get_salaries", require("./routes/SalaryRoutes/GetSalaries.jsx"));
app.use("/AddSalaryEntry", require("./routes/SalaryRoutes/AddSalaryEntry.jsx"));

/* Routing the request to the BRANCH INFO file. */
app.use(
  "/change_branch_info",
  require("./routes/BranchRoutes/ChangeBranches.jsx")
);
app.use("/get_branch_info", require("./routes/BranchRoutes/GetBranches.jsx"));
app.use(
  "/add_branch_entry",
  require("./routes/BranchRoutes/AddBranchEntry.jsx")
);

/* Routing the request to the Dependencies file. */
app.use(
  "/change_dependents",
  require("./routes/DependentRoutes/ChangeDependents.jsx")
);
app.use(
  "/get_dependents",
  require("./routes/DependentRoutes/GetDependencies.jsx")
);
app.use(
  "/add_dependent",
  require("./routes/DependentRoutes/AddDependentEntry.jsx")
);

/* Routing the request to the LeaveAcceptApplication file */
app.use(
  "/get_leave_applications",
  require("./routes/LeaveAcceptRoutes/GetLeaveApplications.jsx")
);
app.use(
  "/accept_leave",
  require("./routes/LeaveAcceptRoutes/AcceptLeaveApplication.jsx")
);
app.use(
  "/reject_leave",
  require("./routes/LeaveAcceptRoutes/RejectLeaveApplication.jsx")
);

/* Routing the request to the LeaveAcceptApplication file */
app.use(
  "/get_leaves_by_department",
  require("./routes/LeaveReportRoutes/DepartmentLeaves.jsx")
);

/* Routing the request to the LeaveFillApplication file */
app.use(
  "/leave-application",
  require("./routes/LeaveFillRoutes/LeaveApplication.jsx")
);
app.use("/is_applicable", require("./routes/LeaveFillRoutes/Applicable.jsx"));

/* Routing the request to the Custom Attributes file */
app.use(
  "/add_custom_field",
  require("./routes/CustomAttributeRoute/CustomField.jsx")
);
app.use(
  "/get_custom_columns",
  require("./routes/CustomAttributeRoute/GetCustomColumns.jsx")
);
app.use(
  "/add_details",
  require("./routes/CustomAttributeRoute/AddCustomDetails.jsx")
);

// C:\Engineering\DBMS\Project\Group Project\Humans\Humans\Samith\server\routes\CustomAttributeRoute\AddCustomDetails.jsx


/* Routing the request to the Profile Page file */
app.use(
  "/change_password",
  require("./routes/ProfilePageRoutes/ChangePassword.jsx")
);
app.use("/user-profile", require("./routes/ProfilePageRoutes/UserProfile.jsx"));
