// const express = require("express");
// const router = express.Router();
// const postgressqlConnection = require("../databasepg");
// const schedule = require("node-schedule");
// const nodemailer = require("nodemailer");

// // Setup nodemailer transporter
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com', // Explicit Gmail host
//     port: 587,             // Use port 587 for secure connections
//     secure: false,         // Use TLS (not SSL)
//     auth: {
//         user: 'thullurivamsi25@gmail.com',
//         pass: 'klggzpqfwlufmmko'  // Ensure this is the correct app password
//     },
//     tls: {
//         rejectUnauthorized: false // Allows self-signed certificates
//     }
// });

// // Execute queries and schedule jobs
// (async () => {
//     const client = await postgressqlConnection();
//     const query1 = `SELECT TO_CHAR(dob, 'YYYY-MM-DD') AS dob, emp_id FROM emp_personal_details`;
//     const query2 = `SELECT TO_CHAR(anniversary_date, 'YYYY-MM-DD') AS anniversary_date, emp_id FROM emp_additional_details_form`;

//     try {
//         const result1 = await client.query(query1);
//         const result2 = await client.query(query2);

//         const currDate = new Date();

//         for (const row of result1.rows) {
//             const dobDate = new Date(row.dob);
//             dobDate.setHours(6, 0, 0, 0); // Set time to 6:00 AM

//             if (dobDate.getDate() === currDate.getDate() && dobDate.getMonth() === currDate.getMonth()) {
//                 const result3 = await client.query("SELECT emp_first_name, email FROM emp_details WHERE emp_id = $1 and status='Active'", [row.emp_id]);
//                 const name = result3.rows[0]?.emp_first_name;
//                 const email = result3.rows[0]?.email;

//                 if (name && email) {
//                     schedule.scheduleJob(dobDate, () => {
//                         const mailOptions = {
//                             from: 'thullurivamsi25@gmail.com',
//                             to: email,
//                             subject: 'Birthday Reminder',
//                             text: `Happy Birthday, ${name}!`
//                         };

//                         transporter.sendMail(mailOptions, (error, info) => {
//                             if (error) {
//                                 console.error('Error sending email:', error);
//                             } else {
//                                 console.log('Email sent successfully:', info.response);
//                             }
//                         });
//                     });
//                 }
//             }
//         }

//         for (const row of result2.rows) {
//             const anniversaryDate = new Date(row.anniversary_date);
//             anniversaryDate.setHours(6, 0, 0, 0);

//             if (anniversaryDate.getDate() === currDate.getDate() && anniversaryDate.getMonth() === currDate.getMonth()) {
//                 const result4 = await client.query("SELECT emp_first_name, email FROM emp_details WHERE emp_id = $1", [row.emp_id]);
//                 const name = result4.rows[0]?.emp_first_name;
//                 const email = result4.rows[0]?.email;

//                 if (name && email) {
//                     schedule.scheduleJob(anniversaryDate, () => {
//                         const mailOptions = {
//                             from: 'thullurivamsi25@gmail.com',
//                             to: email,
//                             subject: 'Work Anniversary Reminder',
//                             text: `Happy Work Anniversary, ${name}!`
//                         };

//                         transporter.sendMail(mailOptions, (error, info) => {
//                             if (error) {
//                                 console.error('Error sending email:', error);
//                             } else {
//                                 console.log('Email sent successfully:', info.response);
//                             }
//                         });
//                     });
//                 }
//             }
//         }

//         const result4 = await client.query("SELECT emp_first_name, email FROM emp_details WHERE status='Active'");
//         for (const row of result4.rows) {
//             const name = row.emp_first_name;
//             const email = row.email;

//             const mailOptions1 = {
//                 from: 'thullurivamsi25@gmail.com',
//                 to: email,
//                 subject: 'Time Sheet Reminder',
//                 text: `Hello ${name},\n\nThis is your Time Sheet reminder email.\n\nKindly fill it.`
//             };

//             schedule.scheduleJob({ hour: 12, minute: 32, dayOfWeek: 3 }, () => {
//                 console.log("Sending weekly reminder email...");

//                 transporter.sendMail(mailOptions1, (error, info) => {
//                     if (error) {
//                         console.error('Error sending email:', error);
//                     } else {
//                         console.log('Email sent successfully:', info.response);
//                     }
//                 });
//             });
//         }

//         console.log("Jobs scheduled successfully!");
//     } catch (err) {
//         console.error("Error scheduling jobs:", err);
//     }
// })();


// module.exports = router;


const express = require("express");
const router = express.Router();
const postgressqlConnection = require("../databasepg");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");

// Setup nodemailer transporter for Vtrack SMTP
const transporter = nodemailer.createTransport({
    host: 'mail.vensaiinc.com',
    port: 587,
    secure: false,
    auth: {
        user: 'vtrack@vensaiinc.com',
        pass: 'VensaiTemp2013'
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Primary administrative email to receive copies of automated mails.
// Can be overridden with the ADMIN_EMAIL environment variable.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'sivvalakomalnaidu@gmail.com';

// Execute queries and schedule jobs
(async () => {
    const client = await postgressqlConnection();
    const query1 = `SELECT TO_CHAR(dob, 'YYYY-MM-DD') AS dob, emp_id FROM emp_personal_details`;
    const query2 = `SELECT TO_CHAR(anniversary_date, 'YYYY-MM-DD') AS anniversary_date, emp_id FROM emp_additional_details_form`;

    try {
        const result1 = await client.query(query1);
        const result2 = await client.query(query2);

        const currDate = new Date();

        for (const row of result1.rows) {
            const dob = new Date(row.dob); 
            const today = new Date();

            if (dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()) {

                const sendTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 57, 0, 0);

                const result3 = await client.query(
                    "SELECT emp_first_name, email FROM emp_details WHERE emp_id = $1 AND status = 'Active'",
                    [row.emp_id]
                );

                const name = result3.rows[0]?.emp_first_name;
                const email = result3.rows[0]?.email;

                if (name && email) {
                    console.log(`Scheduling birthday email for ${name} at ${sendTime}`);

                    schedule.scheduleJob(sendTime, () => {
                        const mailOptions = {
                            from: 'vtrack@vensaiinc.com',
                            to: ADMIN_EMAIL,
                            cc: email, // sending a copy to the employee
                            subject: 'Birthday Reminder',
                            html: `
                                <p>Dear <strong>${name}</strong>!</p>
                        
                                <p>Happy Birthday..!!! 🎉<br />
                                On behalf of the entire team, I want to extend our warmest wishes to you on your special day.
                                We hope it's filled with joy, laughter, and wonderful memories.</p>
                        
                                <p>Thanks & regards,<br />
                                Vensai Technologies</p>
                            `
                        };


                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error('Error sending email:', error);
                            } else {
                                console.log('Email sent successfully:', info.response);
                            }
                        });
                    });
                }
            }
        }


        for (const row of result2.rows) {
            const anniversaryDate = new Date(row.anniversary_date);
            const currDate = new Date(); // Make sure this is declared before using
        
            if (
                anniversaryDate.getDate() === currDate.getDate() &&
                anniversaryDate.getMonth() === currDate.getMonth()
            ) {
                const scheduledTime = new Date(); // create new Date for scheduling
                scheduledTime.setHours(14, 7, 0, 0); // schedule at 2:00 PM today
        
                const result4 = await client.query(
                    "SELECT emp_first_name, email FROM emp_details WHERE emp_id = $1",
                    [row.emp_id]
                );
        
                const name = result4.rows[0]?.emp_first_name;
                const email = result4.rows[0]?.email;
        
                if (name && email) {
                    schedule.scheduleJob(scheduledTime, () => {
                        const mailOptions = {
                            from: 'vtrack@vensaiinc.com',
                            to: ADMIN_EMAIL,
                            cc: ADMIN_EMAIL,
                            subject: 'Work Anniversary Reminder',
                            html: `
                            <p>Dear <strong>${name}</strong>!</p>
                            <div style="text-align: center;">
                                <p style="color: orange; font-size: large; font-weight: bold;">
                                    Happy <br />Work Anniversary..!!! 🎉
                                </p>
                                <p>
                                    On reaching a significant work anniversary milestone! We want to take a moment to express our heartfelt appreciation for your unwavering dedication,
                                    exceptional contributions, and valuable insights during your time.
                                </p>
                                <p>
                                    On this special occasion, we extend our warmest wishes for continued growth, fulfillment, and many more years of shared achievements.
                                    Thank you for your outstanding work and for being an integral part of our organization's journey.
                                </p>
                                </div>
                                <p>
                                    Thanks & regards,<br />
                                    Vensai Technologies
                                </p>
                        `
                        
                        };
        
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                console.error('Error sending email:', error);
                            } else {
                                console.log('Anniversary email sent successfully:', info.response);
                            }
                        });
                    });
                }
            }
        }
        

        const result4 = await client.query("SELECT emp_first_name, email FROM emp_details WHERE status='Active'");
        for (const row of result4.rows) {
            const name = row.emp_first_name;
            const email = row.email;

            const mailOptions1 = {
                from: 'vtrack@vensaiinc.com',
                to: ADMIN_EMAIL,
           
                subject: 'Time Sheet Reminder',
                text: `Hello ${name},\n\nThis is your Time Sheet reminder email.\n\nKindly fill it.`
            };

            schedule.scheduleJob({ hour: 12, minute: 32, dayOfWeek: 3 }, () => {
                console.log("Sending weekly reminder email...");

                transporter.sendMail(mailOptions1, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                    } else {
                        console.log('Email sent successfully:', info.response);
                    }
                });
            });
        }

        console.log("Jobs scheduled successfully!");
    } catch (err) {
        console.error("Error scheduling jobs:", err);
    }
})();

router.post("/lms-register", async(req, res, next)=>{
    const data=req.body;
    const mailOptions = {
        from: 'vtrack@vensaiinc.com',
        to: ADMIN_EMAIL,
        subject: data.subject,
        html: `
            <p>Dear <strong>${data.name}</strong>!</p>
    
            <p>Welcom to Vensai Family... 🎉<br />
            <br/>
            Id : ${data.emp_id}<br/>
            Password : ${data.message}</p>
    
            <p>Thanks & regards,<br />
            Vensai Technologies</p>
        `
    };
res.status(200).json("Email sent successfully");

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
})

router.post("/lms-leaves", async(req, res, next)=>{
    const data=req.body;
    const mailOptions = {
        from: 'vtrack@vensaiinc.com',
        to: ADMIN_EMAIL,
        cc:ADMIN_EMAIL,
        subject: data.subject,
        html: `
            <p>Dear <strong>${data.toName}</strong>!</p>
    
            <p>Leave approval request from ${data.fromName}<br />
            <br/>

            From date : ${data.message.fromdate}<br/>
            To date : ${data.message.todate}<br/>
           Duration : ${data.message.duration}<br/>
            Reason :${data.message.reason}<br/>
            </p>
    
            <p>Thanks & regards,<br />
            Vensai Technologies</p>
        `
    };
res.status(200).json("Email sent successfully");

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent successfully:', info.response);
        }
    });
})

module.exports = router;
