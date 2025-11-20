// import axios from "axios";
// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod";

// console.error("Starting MCP vtrack server...");

// const BASE_URL = "http://192.168.2.120:3003/employeeDetails";
// let session = { token: null, emp_id: null, role: null };

// const server = new McpServer({ name: "vtrack", version: "1.0.0" });

// server.tool(
//   { name: "login_employee", description: "Login with employee credentials", inputSchema: z.object({ emp_id: z.string(), emp_password: z.string() }) },
//   async ({ emp_id, emp_password }) => {
//     try {
//       const res = await axios.post(`${BASE_URL}/login_emp_details`, { emp_id, emp_password });
//       session.token = res.data.token;
//       session.emp_id = emp_id;
//       session.role = res.data.data[0].role;
//       return { content: [{ type: "text", text: `✅ Login successful for ${emp_id}` }] };
//     } catch (err) {
//       return { content: [{ type: "text", text: `❌ Login failed: ${err.response?.data?.message || err.message}` }] };
//     }
//   }
// );

// server.tool(
//   { name: "get_leave_balance", description: "Fetch leave balance", inputSchema: z.object({}) },
//   async () => {
//     if (!session.token || !session.emp_id)
//       return { content: [{ type: "text", text: "⚠️ Please login first." }] };
//     try {
//       const res = await axios.get(
//         `http://192.168.2.120:3003/leave/get_leave_types?emp_id=${session.emp_id}&department_id=1`,
//         { headers: { Authorization: session.token } }
//       );
//       return { content: [{ type: "text", text: `📅 Found ${res.data.leaveTypes.length} leave types.` }] };
//     } catch (err) {
//       return { content: [{ type: "text", text: `❌ Error: ${err.message}` }] };
//     }
//   }
// );

// server.tool(
//   { name: "apply_leave", description: "Apply leave for logged-in employee", inputSchema: z.object({ fromdate: z.string(), todate: z.string(), leavetypeid: z.string(), reason: z.string() }) },
//   async ({ fromdate, todate, leavetypeid, reason }) => {
//     if (!session.token || !session.emp_id)
//       return { content: [{ type: "text", text: "⚠️ Please login first." }] };
//     try {
//       const leave = {
//         leave_id: Math.random().toString(36).substring(2, 8),
//         leave_applied_date: new Date().toISOString().split("T")[0],
//         fromdate,
//         todate,
//         leavemode: "Full Day",
//         duration: "1",
//         reason,
//         leavetypeid,
//         emp_id: session.emp_id,
//         privilage_id: "",
//         status: "Pending"
//       };
//       await axios.post("http://192.168.2.120:3003/leave/post_leave_form", leave, {
//         headers: { Authorization: session.token }
//       });
//       return { content: [{ type: "text", text: `✅ Leave applied: ${fromdate} → ${todate}` }] };
//     } catch (err) {
//       return { content: [{ type: "text", text: `❌ Failed: ${err.message}` }] };
//     }
//   }
// );

// server.tool(
//   { name: "logout_employee", description: "Logout employee", inputSchema: z.object({}) },
//   async () => {
//     session = { token: null, emp_id: null, role: null };
//     return { content: [{ type: "text", text: "👋 Logged out successfully." }] };
//   }
// );

// await server.connect(new StdioServerTransport());
// console.error("MCP vtrack server connected.");
