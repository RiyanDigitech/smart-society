import { getAllRegisterUsersbyId, getStatsRegisterUsersbyId } from "@/services/RegisterUnitServices/RegisterUnitServic";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Card, Tag, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const RegisterUnitDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["register", id],
    queryFn: () => getAllRegisterUsersbyId(id),
  });

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: "#16a34a" }} spin />
  );
  // actual record yahan se nikalo
  const unit = data?.data;


  // Stats Datails

  const {data : statsDetail} = useQuery({
    queryKey: ["stats", id],
    queryFn: () => getStatsRegisterUsersbyId(id),
  })

  const statsData = statsDetail?.data
  console.log("statsData", statsData?.totalComplaints)



  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between p-3">
        <button
          className="font-bold active:scale-110 bg-green-600 text-white rounded p-2"
          onClick={() => navigate("/register-unit")}
        >
          Back to Register Unit Table
        </button>
      </div>
      <Spin
        spinning={isLoading}
        tip="Loading..."
        className="text-green-600"
        size="large"
        indicator={antIcon}
      >
        {unit && (
          <div>
            <Card
              title="Unit Details"
              bordered={false}
              className="shadow-md rounded-lg"
            >
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Full Name">{unit.fullname}</Descriptions.Item>
                <Descriptions.Item label="Email">{unit.email}</Descriptions.Item>
                <Descriptions.Item label="Phone">{unit.phone}</Descriptions.Item>
                <Descriptions.Item label="CNIC">{unit.cnic}</Descriptions.Item>
                <Descriptions.Item label="Block">{unit.block}</Descriptions.Item>
                <Descriptions.Item label="Infant">{unit.infant}</Descriptions.Item>
                <Descriptions.Item label="Children">{unit.children}</Descriptions.Item>
                <Descriptions.Item label="Adult">{unit.adult}</Descriptions.Item>
                <Descriptions.Item label="Flat Type">{unit.flatType}</Descriptions.Item>
                <Descriptions.Item label="Occupation">{unit.occupation}</Descriptions.Item>
                <Descriptions.Item label="Role">{unit.role}</Descriptions.Item>
                <Descriptions.Item label="Unit No">{unit.unitNo}</Descriptions.Item>
                <Descriptions.Item label="Password">{unit.password}</Descriptions.Item>
                <Descriptions.Item label="Total Members">{unit.totalMembers}</Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              title="Vehicles"
              bordered={false}
              className="shadow-md rounded-lg mt-6"
            >
              {unit?.vehicle && unit.vehicle.length > 0 ? (
                unit.vehicle.map((veh: any, index: number) => (
                  <Descriptions
                    key={index}
                    bordered
                    size="small"
                    column={2}
                    title={`Vehicle ${index + 1}`}
                    className="mb-4"
                  >
                    <Descriptions.Item label="Plate No">{veh?.plateNo}</Descriptions.Item>
                    <Descriptions.Item label="Name">{veh?.name}</Descriptions.Item>
                    <Descriptions.Item label="Model">{veh?.model}</Descriptions.Item>
                    <Descriptions.Item label="Color">{veh?.color}</Descriptions.Item>
                    <Descriptions.Item label="Type">
                      <Tag color={veh?.type === "Car" ? "blue" : "green"}>
                        {veh?.type}
                      </Tag>
                    </Descriptions.Item>
                  </Descriptions>
                ))
              ) : (
                <p>No vehicles added</p>
              )}
            </Card>

             <Card
              title="Unit Stats Details"
              bordered={false}
              className="shadow-md rounded-lg mt-6"
            >
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Total Maintenance">{statsData?.totalMaintenance}</Descriptions.Item>
                <Descriptions.Item label="Total Complaints">{statsData?.totalComplaints}</Descriptions.Item>
                <Descriptions.Item label="Total Members">{statsData?.totalMembers}</Descriptions.Item>
                <Descriptions.Item label="Total SupplementaryAccount">{statsData?.totalSupplementaryAccount}</Descriptions.Item>
                <Descriptions.Item label="Total Vehicles">{statsData?.totalVehicles}</Descriptions.Item>
                <Descriptions.Item label="Total Visitors">{statsData?.totalVisitors}</Descriptions.Item>
                <Descriptions.Item label="User Id">{statsData?.userId}</Descriptions.Item>
                
              </Descriptions>
            </Card>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default RegisterUnitDetailPage;
