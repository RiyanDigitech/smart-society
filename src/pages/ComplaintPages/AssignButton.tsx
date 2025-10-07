import { statusResolved } from "@/services/ComplaintServices/ComplaintServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { useParams } from "react-router-dom"

function AssignButton() {
// statusResolved
const id = useParams()
const complaintId = Number(id.id)
const handleChangeResolved = () => {
assignResolvedMutation.mutate(complaintId)
}

const queryClient = useQueryClient();
    const assignResolvedMutation = useMutation({
        mutationFn: statusResolved,
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["complaint"] });
            message.success(res?.message || "Status Resolved Successfully ");
        },
        onError: (error: any) => {
            message.error(error?.response?.data?.message || "Failed to Status Resolved");
        },
    })

  return (
    <div className="flex justify-center">
      <button className='font-bold active:scale-110 bg-green-600 text-white rounded p-2 mt-4'
          onClick={handleChangeResolved}
        >Resolved Complaint</button>
    </div>
  )
}

export default AssignButton
