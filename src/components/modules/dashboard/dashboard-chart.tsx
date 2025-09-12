// import LeadService from "@/services/lead-management/lead-service";
// import { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import tokenService from "@/services/token.service";
// const LeadChart = () => {
//   const { useFetchAllFranchiseLeadCounts } = LeadService();
//   const [userId, setUserId] = useState<number | undefined>();
//   useEffect(() => {
//     const LoginPersonId = tokenService?.getLastUserData()?.id;
//     if (LoginPersonId) {
//       setUserId(LoginPersonId);
//     }
//   }, []);

//   const { data: apiData } = useFetchAllFranchiseLeadCounts(userId);
//   console.log("leadCounts", apiData);

//   const chartData = {
//     series: [
//       {
//         name: "Leads",
//         data: [
//           apiData?.data?.totalLeads,
//           apiData?.data?.sendQuotation,
//           apiData?.data?.paymentDone,
//           apiData?.data?.inProgress,
//           apiData?.data?.feePaid,
//           apiData?.data?.completed,
//         ],
//       },
//     ],
//     options: {
//       chart: {
//         type: "bar",
//         height: 350,
//         toolbar: {
//           show: false, // Hide toolbar for cleaner look
//         },
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 8, // Rounded bars
//           horizontal: false,
//           columnWidth: "50%", // Adjust bar width
//         },
//       },
//       dataLabels: {
//         enabled: true, // Enable data labels
//         style: {
//           fontSize: "14px",
//           fontWeight: "bold",
//           colors: ["#1f2937"], // Dark color for better contrast
//         },
//         offsetY: -20, // Position the label above the bar
//         formatter: (val: any) => val, // Show the exact value
//       },
//       colors: [
//         "#ff854b",
//         "#7c3aed",
//         "#a855f7",
//         "#d8b4fe",
//         "#e9d5ff",
//         "#c084fc",
//       ], // Purple shades
//       xaxis: {
//         categories: [
//           "Total Leads",
//           "Send Quotation",
//           "Payment Done",
//           "In Progress",
//           "Fee Paid",
//           "Completed",
//         ],
//         labels: {
//           rotate: -45, // Rotate labels to avoid overlap
//           style: {
//             fontSize: "14px",
//             fontWeight: 500,
//             colors: "#4b5563",
//           },
//         },
//         axisBorder: {
//           color: "#d1d5db",
//         },
//         axisTicks: {
//           color: "#d1d5db",
//         },
//       },
//       yaxis: {
//         labels: {
//           style: {
//             fontSize: "14px",
//             fontWeight: 500,
//             colors: "#ff854b",
//           },
//         },
//         axisBorder: {
//           show: true,
//           color: "#d1d5db",
//         },
//       },
//       grid: {
//         borderColor: "#e5e9eb", // Light grid lines
//       },
//       tooltip: {
//         theme: "light",
//         style: {
//           fontSize: "14px",
//           color: "#1f2937",
//         },
//       },
//     },
//   };

//   return (
//     <div className="p-6 bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-auto ">
//       <h1 className="text-3xl font-bold text-center mb-6 text-indigo-900">
//         Lead Statistics Dashboard
//       </h1>
//       <Chart
//         options={chartData?.options}
//         series={chartData?.series}
//         type="bar"
//         height={350}
//       />
//     </div>
//   );
// };

// export default LeadChart;
