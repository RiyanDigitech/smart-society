import { assignComplainttoStaff, assignStatusResolved } from '@/services/ComplaintServices/ComplaintServices';
import { getAllStaffFunction } from '@/services/StaffServices/StaffServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message, Select } from 'antd';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function StaffDropDown() {

    const id = useParams()
    const complaintId = Number(id.id)
    const { data } = useQuery({
        queryKey: ["staff"],
        queryFn: getAllStaffFunction,
    });

    const [selectedStaff, setSelectedStaff] = useState(null);

    const dropDwonData = data?.data?.staff;

    //   assignComplainttoStaff
    // assignStatusResolved

    const handleAssignButton = () => {
        console.log("Hello Click", selectedStaff, complaintId)
        
        const payload = {
            complaintId: complaintId,
            registerUnitId: selectedStaff
        }
        assignResolvedMutation.mutate(complaintId)
        assignStaffMutation.mutate(payload)
    }

    const queryClient = useQueryClient();
    const assignResolvedMutation = useMutation({
        mutationFn: assignStatusResolved,
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["complaint"] });
            message.success(res?.message || "Status Assign Successfully ");
        },
        onError: (error: any) => {
            message.error(error?.response?.data?.message || "Failed to Status Assign");
        },
    })
    const assignStaffMutation = useMutation({
        mutationFn: assignComplainttoStaff,
        onSuccess: (res: any) => {
            queryClient.invalidateQueries({ queryKey: ["complaint"] });
            message.success(res?.message || "Assign Staff Successfully");

        },
        onError: (error: any) => {
            message.error(error?.response?.data?.message || "Failed to Assign Staff");
        },
    })



    return (
        <div className="mt-6 flex justify-between">
            <div>
                <h3 className="font-semibold mb-2">Select Staff:</h3>
                <Select
                    style={{ width: 250 }}
                    className={`${!selectedStaff ? 'border !border-red-600 rounded-lg' : 'border-none'}`}
                    placeholder="Select Staff"
                    options={dropDwonData?.map((itm: any) => ({
                        label: itm.name,
                        value: itm.id,
                    }))}
                    onChange={(value) => setSelectedStaff(value)} // update selected staff
                />
            </div>

            <div>
                <button
                    className={`font-bold active:scale-110 rounded p-2 mt-7 transition-all duration-200 ${selectedStaff
                        ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        }`}
                    disabled={!selectedStaff}
                    onClick={handleAssignButton}
                >
                    Assign Complaint
                </button>
            </div>
        </div>
    );
}

export default StaffDropDown;
