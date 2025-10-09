import { getComplaintbyId } from "@/services/ComplaintServices/ComplaintServices";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Card, Tag, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import StaffDropDown from "./StaffDropDown";
import AssignButton from "./AssignButton";

const ComplaintDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["complaint", id],
    queryFn: () => getComplaintbyId(id),
    enabled: !!id,
  });

  const unit = data?.data;

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 40, color: "#16a34a" }} spin />
  );


  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between p-3">
        <button
          className="font-bold active:scale-110 bg-green-600 text-white rounded p-2"
          onClick={() => navigate("/complaint")}
        >
          Back to Complaint Table
        </button>
      </div>

        <Spin
          spinning={isLoading}
          tip="Loading..."
          className="text-green-600 flex items-center justify-center h-screen"
          size="large"
          indicator={antIcon}
        >
          {unit && (
            <div>

              {/* Data  */}
              <Card
                title="Complaint Details"
                bordered={false}
                className="shadow-md rounded-lg"
              >
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="Complaint ID">{unit.id}</Descriptions.Item>
                  <Descriptions.Item label="Title">{unit.title}</Descriptions.Item>
                  <Descriptions.Item label="Description">{unit.description}</Descriptions.Item>
                  <Descriptions.Item label="Type">{unit.type}</Descriptions.Item>
                  <Descriptions.Item label="Priority">{unit.priority}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={unit.complaintStatus === "Pending" ? "gold" : "green"}>
                      {unit.complaintStatus}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="User ID">{unit.userId}</Descriptions.Item>
                  {/* <Descriptions.Item label="User ID">{unit.userId}</Descriptions.Item> */}
                  <Descriptions.Item label="Flat No">{unit.unitNo}</Descriptions.Item>
                  <Descriptions.Item label="Created At">{unit.createdAt}</Descriptions.Item>
                  <Descriptions.Item label="Updated At">{unit.updatedAt}</Descriptions.Item>
                  {/* <Descriptions.Item label="Updated At">{unit.image}</Descriptions.Item> */}
                </Descriptions>

                {/* 🔹 Show dropdown if status = Pending */}
                {/* {unit.complaintStatus === "Pending" && (

                <StaffDropDown />
                
              )}

              {unit.complaintStatus === "Assign" && (

                <AssignButton />
                
              )} */}
              </Card>

              {/* Video  */}
              <Card bordered={false} className="shadow-md rounded-xl p-4 mt-5 mb-5">
                <Descriptions
                  bordered
                  column={2}
                  labelStyle={{ fontWeight: '600', background: '#f9fafb' }}
                >
                  <Descriptions.Item label="Videos">
                    {unit.video ? (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <div
                          style={{
                            width: '250px',
                            height: '150px',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
                          }}
                        >
                          <video
                            src={unit.video}
                            controls
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '12px',
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: 'center',
                          color: '#999',
                          fontStyle: 'italic',
                          padding: '10px 0',
                        }}
                      >
                        No Video Found
                      </div>
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              {/* Images */}
              <Card bordered={false} className="shadow-md rounded-xl p-4">
                <Descriptions
                  bordered
                  column={2}
                  labelStyle={{ fontWeight: '600', background: '#f9fafb' }}
                >
                  <Descriptions.Item label="Images">
                    {Array.isArray(unit.image) && unit.image.length > 0 ? (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '30px',
                          marginTop: '8px',
                        }}
                      >
                        {unit.image.map((img, index) => (
                          <div
                            key={index}
                            style={{
                              width: '100px',
                              height: '100px',
                              overflow: 'hidden',
                              borderRadius: '10px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            }}
                          >
                            <img
                              src={img}
                              alt={`Unit Image ${index + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: 'center',
                          color: '#999',
                          fontStyle: 'italic',
                          padding: '10px 0',
                        }}
                      >
                        No Image Found
                      </div>
                    )}
                  </Descriptions.Item>
                </Descriptions>

                {/* 🔹 Show dropdown if status = Pending */}
                {unit.complaintStatus === 'Pending' && <StaffDropDown />}

                {unit.complaintStatus === 'Assign' && <AssignButton />}
              </Card>

            </div>
          )}
        </Spin>
      </div>
  );
};

export default ComplaintDetailPage;
