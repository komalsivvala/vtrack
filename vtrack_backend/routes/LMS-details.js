const express = require("express");
const postgressqlConnection = require("../databasepg");
const multer = require("multer");
const path = require("path");
const router = express.Router();


router.get("/get_leave_types", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const { emp_id, department_id } = req.query;
        const currDate=new Date();
        const year=currDate.getFullYear().toString();
        console.log("year::",year);
        console.log(emp_id);
        console.log(department_id);

        // Query to get leave types for the year 2024
        const leaveTypesQuery = `SELECT * FROM leave_types WHERE leaves_year = $1`;
        const leaveTypesResult = await client.query(leaveTypesQuery, [year]);

        // Query to get user leaves for the year 2024
        const userLeavesQuery = `SELECT * 
                                 FROM user_leaves 
                                 WHERE emp_id = $1 AND EXTRACT(YEAR FROM leave_applied_date) = $2`;
        const userLeavesResult = await client.query(userLeavesQuery, [emp_id, year]);

        // Query to get department details based on department_id
        const departmentQuery = `SELECT * FROM department WHERE department_id = $1`;
        const departmentResult = await client.query(departmentQuery, [department_id]);

        // Query to get the employee's manager_id and first name
        const empDetailsQuery = `SELECT manager_id, emp_first_name FROM emp_details WHERE emp_id = $1`;
        const empDetailsResult = await client.query(empDetailsQuery, [emp_id]);

        // Get manager_id from the result of the previous query
        const manager_id = empDetailsResult.rows[0].manager_id;

        // Query to get the manager's details (first name and email) based on manager_id
        const managerDetailsQuery = `SELECT emp_first_name, email FROM emp_details WHERE emp_id = $1`;
        const managerDetailsResult = await client.query(managerDetailsQuery, [manager_id]);

        const hrDetailsQuery = `SELECT emp_first_name, email FROM emp_details WHERE role ='hr' and status='Active'`;
        const hrResult = await client.query(hrDetailsQuery);

        res.status(200).json({
            message: "Data fetched successfully",
            leaveTypes: leaveTypesResult.rows,
            userLeaves: userLeavesResult.rows,
            departmentDetails: departmentResult.rows,
            managerDetails: managerDetailsResult.rows,
            hrDetails:hrResult.rows
        });

    } catch (e) {
        console.log(e);
        res.status(500).json("Internal server error");
    }
});

router.post("/leave_monthly_generator", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const { employee, year, month } = req.body;
        console.log(employee + "   " + year + "   " + month);


        const query = `
            SELECT *
            FROM user_leaves
            WHERE emp_id = $1 
              AND EXTRACT(YEAR FROM leave_applied_date) = $2
              AND EXTRACT(MONTH FROM leave_applied_date) = $3;
        `;

        const queryParams = [employee, year, month];
        const result = await client.query(query, queryParams);

        const query2 = `select * from leave_types where leaves_year=$1`
        const result2 = await client.query(query2, [year]);

        const query3 = `select * from user_leaves where  emp_id=$1 AND EXTRACT(YEAR FROM fromdate)=$2`;
        const queryParams3 = [employee, year];
        console.log("query3:::",query3);
        console.log("queryParams3:::",queryParams3)
        const result3 = await client.query(query3, queryParams3);

        res.status(200).json({ message: "Data fetched successfully", user_leaves: result.rows, leave_types: result2.rows, userLeavesData: result3.rows });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});



router.get("/get_emp_details", async (req, res) => {
    try {
        const client = await postgressqlConnection();
        const query = 'SELECT emp_id, emp_first_name FROM emp_details';
        const result = await client.query(query);

        res.status(200).json({
            message: "Data fetched successfully",
            data: result.rows // Only return the rows from the result
        });
    } catch (error) {
        console.error('Error fetching employee details:', error);
        res.status(500).json({ message: "Internal server error" });
    } finally {
        client.release(); // Ensure the client is released after the query
    }
});



router.post("/post_leave_form", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const data = req.body;
        const query = `INSERT INTO user_leaves(
            leave_id, leave_applied_date, fromdate, todate, leavemode, duration, reason, leavetypeid, emp_id, privilage_id,status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)`;
        const queryParams = [
            data.leave_id,
            data.leave_applied_date,
            data.fromdate,
            data.todate,
            data.leavemode,
            data.duration,
            data.reason,
            data.leavetypeid,
            data.emp_id,
            data.privilage_id === "" ? null : data.privilage_id,
            data.status
        ];
        const result = await client.query(query, queryParams);
        res.status(200).json({ message: "Data added successfully" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/get_pending_leaves", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();

        // First query to get pending leaves
        const query = `SELECT * FROM user_leaves WHERE status='Pending'`;
        const result = await client.query(query);

        if (result.rows.length > 0) {
            const empIds = result.rows.map(ele => ele.emp_id);
            const empDetailsQuery = `SELECT emp_id, emp_first_name FROM emp_details WHERE emp_id = ANY($1)`;
            const empDetailsResult = await client.query(empDetailsQuery, [empIds]);

            const leaveTypeIds = result.rows.map(ele => ele.leavetypeid);
            const leaveTypeQuery = `SELECT leavetypeid, leavetype FROM leave_types WHERE leavetypeid = ANY($1)`;
            const leaveTypeResult = await client.query(leaveTypeQuery, [leaveTypeIds]);

            res.status(200).json({
                message: "Data fetched successfully",
                data: result.rows,
                empDetails: empDetailsResult.rows,
                leaveTypeDetails: leaveTypeResult.rows
            });
        } else {
            res.status(200).json({ message: "No pending leaves found", data: [] });
        }

    } catch (e) {
        console.error("Error fetching pending leaves:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.put("/update_pending_leaves", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const data = req.body;
        const query = `UPDATE user_leaves SET status = $1 WHERE leave_id = $2`;
        const queryParams = [data.status, data.leave_id];
        const result = await client.query(query, queryParams);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "No leave found with the provided leave_id" });
        }

        return res.status(200).json({ message: "Updated successfully", data: result.rows });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/get_leave_types_data", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const query = `select * from leave_types`;
        const result = await client.query(query);
        res.status(200).json({ message: "Data fetched successfully", data: result.rows });
    }
    catch (e) {
        console.log(e);
        res.status(500).json("Internal Server Error");
    }

});

router.post("/post_leave_types", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const data = req.body;
        const query = `insert into leave_types values($1,$2,$3,$4,$5)`;
        const queryParams = [data.leavetypeid, data.leavetype, data.description, data.leaves_per_year, data.leaves_year];
        const result = await client.query(query, queryParams);
        res.status(200).json("Data add successfully");
    }
    catch (e) {
        res.status(500).json("Something went wrong");
    }
})

router.put("/update_leave_type", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const data = req.body;
        const query = `update leave_types set leavetype=$1, description=$2, leaves_per_year=$3, leaves_year=$4`;
        const queryParams = [data.leavetype, data.description, data.leaves_per_year, data.leaves_year];
        const result = await client.query(query, queryParams);
        res.status(200).json("Data Updated successfully");
        res.status(400).json("Some thing went wrong")
    }
    catch (e) {
        console.log(e);

        res.status(500).json("Internal Server Error")
    }
})

router.get("/get_All_user_leaves", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const { emp_id, manager_id } = req.query;

        // Queries
        const query1 = `SELECT * FROM user_leaves WHERE emp_id=$1`;
        const query2 = `SELECT * FROM leave_types`;
        const query3 = `SELECT emp_first_name FROM emp_details WHERE emp_id=$1`;
        const query4 = `SELECT emp_first_name, doj FROM emp_details WHERE emp_id=$1`;

        // Execute all queries concurrently
        const [result1, result2, result3, result4] = await Promise.all([
            client.query(query1, [emp_id]),
            client.query(query2),
            client.query(query3, [manager_id]),
            client.query(query4, [emp_id]),
        ]);

        return res.status(200).json({
            message: "Data fetched successfully",
            user_leaves: result1.rows,
            leaveTypes: result2.rows,
            managerDetails: result3.rows[0], // Assuming you want the first row for manager
            emp_Details: result4.rows,       // Employee details
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
});


router.get("/get_userLeaves_data", async (req, res) => {
    try {
        const client = await postgressqlConnection();
        const emp_id = req.query.emp_id;

        console.log("Received emp_id:", emp_id);

        // Construct query based on emp_id existence
        const query = `
            SELECT * 
            FROM user_leaves 
            WHERE (${emp_id ? "emp_id = $1 AND" : ""} 
                  EXTRACT(YEAR FROM fromdate) IN (EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(YEAR FROM CURRENT_DATE) - 1));
        `;

        const query2 = `SELECT emp_first_name, emp_id FROM emp_details WHERE status='Active'`;

        const query3 = `SELECT * FROM leave_types WHERE leaves_year IN (EXTRACT(YEAR FROM CURRENT_DATE), EXTRACT(YEAR FROM CURRENT_DATE) - 1);`;

        // Log generated query
        console.log("Executing query:", query);
        
        const params = emp_id ? [emp_id] : [];

        // Execute queries
        const result = await client.query(query, params);
        const result2 = await client.query(query2);
        const result3 = await client.query(query3);

        // Release the connection
        // client.release();

        if (result.rows.length > 0 || result2.rows.length > 0 || result3.rows.length > 0) {
            res.status(200).json({ 
                message: "Data fetched successfully", 
                data: result.rows, 
                empDetails: result2.rows, 
                leavetype: result3.rows 
            });
        } else {
            res.status(404).json({ message: "No data found", data: [] });
        }
    } catch (e) {
        console.error("Error fetching user leaves data:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



router.put("/leaveRequestUpdate", async(req,res,next)=>{
    try{
        const client= await postgressqlConnection();
        const leave_id=req.query.leave_id;
        const query=`update user_leaves set status='Cancelled' where leave_id=$1`;
        const result=await client.query(query,[leave_id]);
        res.status(200).json("Leave request updated successfully");
    }
    catch(e){
        console.log(e);    
        res.status(500).json("Internal Server Error");  
    }

})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/files')); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

router.post("/uploadHolidayDoc", upload.single('holidayDoc'), async (req, res, next) => {
    try {
        const client = await postgressqlConnection();

        // Retrieve file information from multer
        const holiday_loc = req.file ? req.file.filename : null; // multer stores the file info in req.file
        console.log("holiday_loc:::",holiday_loc);
        
        if (!holiday_loc) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const holidayId = req.body.holidayId;
        if (!holidayId) {
            return res.status(400).json({ message: "holidayId is required." });
        }

        const holiday_name = "Holidays Doc";
        const status = "Active";
        const currentDate = new Date();
        const holiday_date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        // SQL query
        const query = `
            INSERT INTO holidays (holiday_id, holiday_name, holiday_date, holiday_location, status) 
            VALUES ($1, $2, $3, $4,$5)
        `;
        const queryData = [holidayId, holiday_name, holiday_date, holiday_loc,status];

        // Execute query
        await client.query(query, queryData);

        res.status(200).json({ message: "Data posted successfully." });
    } catch (error) {
        console.error("Error in /uploadHolidayDoc:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/getHolidayDoc", async(req,res,next)=>{
    try{
        const client=await postgressqlConnection();
        const query=`select * from holidays`;
        const result= await client.query(query);
        if(result.rows.length>0){
            res.status(200).json({message:"Data fetched successfully", data:result.rows})
        }
        else{
            res.status(400).json("No page found");
        }
    }
    catch(e){
        console.log(e);
        res.status(500).json("Internal Server Error");
    }
})

router.put("/deleteHolidayDoc", async (req, res, next) => {
    try {
        const client = await postgressqlConnection();
        const holiday_id = req.query.holiday_id;

        if (!holiday_id) {
            return res.status(400).json("Holiday ID is required");
        }

        const query = `UPDATE holidays SET status = 'InActive' WHERE holiday_id = $1 RETURNING *`;
        const result = await client.query(query, [holiday_id]);

        if (result.rowCount === 0) {
            return res.status(404).json("No data found");
        }

        res.status(200).json("Data updated successfully");
    } catch (e) {
        console.error("Error updating holiday status:", e);
        res.status(500).json("Internal Server Error");
    }
});
router.get("/get_leave_balance", async (req, res) => {
    try {
        const client = await postgressqlConnection();
        const emp_id = req.query.emp_id;
        const year = new Date().getFullYear();

        const query = `
            SELECT lt.leavetype, lt.leaves_per_year,
                   COALESCE(sum(ul.duration),0) AS used
            FROM leave_types lt
            LEFT JOIN user_leaves ul 
            ON lt.leavetypeid = ul.leavetypeid 
               AND ul.emp_id = $1 
               AND EXTRACT(YEAR FROM ul.fromdate) = $2
            GROUP BY lt.leavetype, lt.leaves_per_year;
        `;
        const result = await client.query(query, [emp_id, year]);

        const balance = result.rows.map(r => ({
            type: r.leavetype,
            total: r.leaves_per_year,
            used: Number(r.used),
            remaining: r.leaves_per_year - Number(r.used)
        }));

        res.status(200).json({ emp_id, year, balance });

    } catch (e) {
        res.status(500).json("Internal Server Error");
    }
});


module.exports = router;