// import { TableColumnsType } from "antd";
// import { useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { Lead, User } from "@/lib/types/lead";
// import "../../../index.css";
// const LeadListTableColumns = () => {
//   const navigate = useNavigate();

//   return useMemo<TableColumnsType<Lead>>(
//     () => [
//       {
//         title: "Work Id",
//         dataIndex: "id",
//         key: "id",
//         render: (id: string) => (
//           <div className="lg:w-fit rounded-md uppercase">{id}</div>
//         ),
//       },
//       {
//         title: "Name",
//         dataIndex: "user",
//         key: "user",
//         render: (user: User) => (
//           <div className="lg:w-fit rounded-md uppercase">
//             {user?.username ? user.username.slice(0, 15) + "..." : "No Name"}
//           </div>
//         ),
//       },
//       {
//         title: "Title",
//         dataIndex: "title",
//         key: "title",
//         render: (title: string) => (
//           <div className="lg:w-fit rounded-md uppercase">
//             {title.slice(0, 10)}
//           </div>
//         ),
//       },
//       {
//         title: "Email",
//         dataIndex: "email",
//         key: "email",
//         render: (email: string) => (
//           <div className="lg:w-fit rounded-md uppercase">{email}</div>
//         ),
//       },
//       {
//         title: "Mobile",
//         dataIndex: "applicantMobile",
//         key: "applicantMobile",
//         render: (applicantMobile: string) => (
//           <div className="lg:w-fit rounded-md uppercase">{applicantMobile}</div>
//         ),
//       },
//       {
//         title: "Applicant Name",
//         dataIndex: "applicantName",
//         key: "applicantName",
//         render: (applicantName: string | null) => (
//           <div className="lg:w-fit rounded-md uppercase">
//             {applicantName ? applicantName.slice(0, 15) + "..." : "-"}
//           </div>
//         ),
//       },
//       {
//         title: "Date",
//         dataIndex: "createdAt",
//         key: "createdAt",
//         render: (createdAt: string) => (
//           <div className="lg:w-fit rounded-md uppercase">
//             {createdAt.slice(0, 10)}
//           </div>
//         ),
//       },
//       {
//         title: "Action",
//         dataIndex: "action",
//         key: "action",
//         render: (_, record) => (
//           <div className="lg:w-fit rounded-md flex">
//             <button
//               onClick={() => {
//                 if (!record?.leadStatus) {
//                   navigate(`/send-quotation/${record.id}`);
//                 } else if (record.leadStatus !== "Quotation Sent") {
//                   navigate(`/payment-recieved/${record.id}`);
//                 }
//               }}
//               className={`cursor-pointer text-white text-xs p-2 rounded-lg ${
//                 record?.leadStatus === "Quotation Sent"
//                   ? "bg-[#FF6820]"
//                   : record?.leadStatus === "Payment Done"
//                   ? "bg-[#55ad22]"
//                   : !record?.leadStatus
//                   ? "bg-[#f18891]"
//                   : record?.leadStatus === "Payment Failed"
//                   ? "bg-[#f12a3b]"
//                   : "bg-[#008444]"
//               }`}
//             >
//               {!record?.leadStatus
//                 ? "Send Quotation"
//                 : record?.leadStatus.slice(0, 20)}
//             </button>
//           </div>
//         ),
//       },
//     ],
//     [navigate]
//   );
// };

// export default LeadListTableColumns;
