import VisitorService from "@/services/VisitorService/VisitorsService";
import { notification, Select, Spin } from "antd";
import { useEffect, useState } from "react";

interface UpdateVisitorProps {
  isOpen: boolean;
  onClose: () => void;
  visitorId: number | null;
}

const UpdateStatusModal: React.FC<UpdateVisitorProps> = ({
  isOpen,
  onClose,
  visitorId,
}) => {
  const { getVisitorById, updateVisitorStatus } = VisitorService();

  const { data, isLoading } = getVisitorById(visitorId!); 
  const mutation = updateVisitorStatus;

  const [formData, setFormData] = useState({ visitor_status: "" });
  const [initialStatus, setInitialStatus] = useState("");

  useEffect(() => {
    if (data) {
      setFormData({
        visitor_status: data.visitor_status || "",
      });
      setInitialStatus(data.visitor_status || "");
    }
  }, [data, isOpen]);

  const isDirty = formData.visitor_status !== initialStatus;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(
      {
        visitorId: visitorId!,
        visitorStatus: formData.visitor_status,
      },
      {
        onSuccess: () => {
          notification.success({ message: "Status Updated Successfully" });
          onClose();
        },
        onError: (error: any) => {
          notification.error({ message: error.message || "Update failed" });
        },
      }
    );
  };

  if (!isOpen || !visitorId) return null;
  if (isLoading) return <Spin />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-inter">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4 relative h-auto max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Update status</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <Select
              value={formData.visitor_status || undefined}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, visitor_status: value }))
              }
              className="w-full"
              placeholder="Select status"
              options={[
                { value: "In", label: "In" },
                { value: "Pending", label: "Pending" },
                { value: "Out", label: "Out" },
              ]}
            />
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border rounded-lg text-[#EF4A00] border-[#EF4A00]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white rounded-lg transition disabled:opacity-50"
              disabled={!isDirty || mutation.isPending}
            >
              {mutation.isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStatusModal;


// import {
//   getVisitorById,
//   updateVisitorStatus,
// } from "@/services/VisitorService/VisitorsService";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { notification, Select, Spin } from "antd";
// import { useEffect, useState } from "react";

// interface UpdateVisitorProps {
//   isOpen: boolean;
//   onClose: () => void;
//   visitorId: number;
// }

// const UpdateStatusModal: React.FC<UpdateVisitorProps> = ({
//   isOpen,
//   onClose,
//   visitorId,
// }) => {
//   const { data, isLoading } = useQuery({
//     queryKey: ["visitor", visitorId],
//     queryFn: () => getVisitorById(visitorId!),
//     enabled: !!visitorId,
//   });

//   /*
// const { useFetchVisitorById, useUpdateVisitorStatus } = VisitorService();
//   const { data: singleVisitor } = useFetchVisitorById(5);

// const updateVisitor = useUpdateVisitorStatus();
// updateVisitor.mutate({ visitorId: 5, visitorStatus: "approved" });
  
//   */ 

//   console.log("Visitor data:", data);

//   const [formData, setFormData] = useState({ visitor_status: "" });
//   const [initialStatus, setInitialStatus] = useState("");

//   useEffect(() => {
//     if (data) {
//       setFormData({
//         visitor_status: data.visitor_status || "",
//       });
//       setInitialStatus(data.visitor_status || "");
//     }
//   }, [data, isOpen]);

//   const isDirty = formData.visitor_status !== initialStatus;
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: updateVisitorStatus,
//     onSuccess: () => {
//       notification.success({ message: "Status Updated Successfully" });
//       queryClient.invalidateQueries(["visitor", visitorId]);
//       onClose();
//     },
//     onError: (error: any) => {
//       notification.error({ message: error.message || "Update failed" });
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     mutation.mutate({
//       visitorId: visitorId!,
//       visitorStatus: formData.visitor_status,
//     });
//   };

//   if (!isOpen) return null;

//   if (isLoading) return <Spin/>

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 font-inter">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4 relative h-auto max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-lg font-semibold">Update status</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800 text-xl"
//           >
//             ✕
//           </button>
//         </div>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-semibold mb-1">Status</label>
//             <Select
//               value={formData.visitor_status || undefined}
//               onChange={(value) =>
//                 setFormData((prev) => ({ ...prev, visitor_status: value }))
//               }
//               className="w-full"
//               placeholder="Select status"
//               options={[
//                 { value: "In", label: "In" },
//                 { value: "Pending", label: "Pending" },
//                 { value: "Out", label: "Out" },
//               ]}
//             />
//           </div>
//           <div className="flex justify-center gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-5 py-2 border rounded-lg text-[#EF4A00] border-[#EF4A00]"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-5 py-2 bg-primary text-backgroundPrimary rounded-lg text-white transition disabled:opacity-50"
//               disabled={!isDirty}
//             >
//               {mutation.isPending ? "Updating..." : "Update"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateStatusModal;
