import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { MenuFoldOutlined, MenuUnfoldOutlined, MoneyCollectFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { MdShoppingBag } from "react-icons/md";
import { MdReceipt } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

import { Input, Layout, Menu, theme, Dropdown, MenuProps } from "antd";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import "../../index.css";
import tokenService from "@/services/token.service";
const { Header, Sider, Content } = Layout;
// import { jwtDecode } from "jwt-decode";
// import dayjs from "dayjs";

// const person = tokenService.getUser();
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("");

  const [see, setSee] = useState(true);
  // const [lastPersonData, setLastPersonData] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    token: { colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    // const token = tokenService?.getLocalAccessToken();
    // if (token) {
    //   try {
    //     const decodedToken = jwtDecode(token);
    //     const currentTime = dayjs()?.unix();
    //     console.log(decodedToken?.exp, "current time", currentTime);
    //     if (decodedToken?.exp && decodedToken?.exp < currentTime) {
    //       tokenService?.clearStorage();
    //       navigate("/login");
    //     }
    //   } catch (error) {
    //     navigate("/login");
    //   }
    // } else {
    //   navigate("/login");
    // }
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0) {
      const cleanedSegment = pathSegments
        .filter((segment) => !/^\d+$/.test(segment)) // Ignore segments that are only numbers
        .join(" "); // Join remaining segments with a space

      // Replace dashes with spaces and capitalize words
      const readableTitle = cleanedSegment
        .replace(/-/g, " ") // Replace dashes with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize words
      setCurrentPage(readableTitle);
    }
    const handleResize = () => {
      if (window.outerWidth < 768) {
        setSee(false);
      } else {
        setSee(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [pathname]);
  const getSiderWidth = () => {
    if (!see && collapsed) return 0;
    if (see && collapsed) return 70;
    if (see && !collapsed) return 240;
    if (!see && !collapsed) return 70;
    return 220;
  };

  const getMarginLeft = () => {
    if (!see && collapsed) return "ml-0";
    if (see && collapsed) return "ml-[73px] mr-[0px]";
    if (see && !collapsed && currentPage !== "Account Details")
      return "ml-[235px] mr-[0px]";
    if (see && !collapsed && currentPage === "Account Details")
      return "ml-[5px] mr-[0px]";
    if (!see && !collapsed) return "ml-[69px]";
    return "ml-[220px]";
  };

  const handleButtonClick = () => {
    navigate("/account-details");
  };
  // console.log(see, collapsed);
 
  const items: MenuProps["items"] = [
    {
      key: "",
      label: (
        <div
          className="flex justify-center cursor-default"
          // onClick={HomeNavigate}
        >
          <img src="/dp-img.jpg" className="h-10 w-10 rounded-full" alt="" />
        </div>
      ),
      disabled: true,
    },

    {
      key: "3",
      label: (
        <div className="">
          <button
            // onClick={ChangePassword}
            className="mx-auto flex justify-center font-manrope text-xs  font-semibold"
          >
            Change Password
          </button>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="">
          <button
            // onClick={logout}
            className="mx-auto flex justify-center font-manrope text-xs  font-semibold"
          >
            LogOut
          </button>
        </div>
      ),
    },
  ];
  // const { useFetchTargetedAdmin } = AuthService();

  // const { data } = useFetchTargetedAdmin();

//   console.log("admin data", data?.data);
  return (
    <>
      {" "}
      <Layout className="">
        <Sider
          className={`transition-all duration-300 h-full hide-scrollbar `}
          trigger={null}
          width={getSiderWidth()}
          style={{
            overflowY: "auto",

            position: "fixed",
            left: 0,
            background: colorPrimary,
            zIndex: 10,
          }}
          collapsible
        >
          {getSiderWidth() > 70 && (
            <div className="w-full flex justify-center items-center opacity-100 h-17 ">
              <span className="text-black-2 font-extrabold text-lg">  Smart Society </span>
              {/* <img
                className=""
                src={"/Logo-Container.png"}
                alt="logo"
                // width={180}
                height={10}
              /> */}
            </div>
          )}{" "}
          {getSiderWidth() > 70 && (
            <div className="w-full flex  items-center opacity-100 h-17 ml-8 text-[#64748B] font-DMSans">
              MAIN MENU
            </div>
          )}
          {getSiderWidth() === 70 && (
            <div className="w-full flex justify-center items-center bg-[#d4d4d4]">
              <img
                className="py-5 h-19 w-15 object-contain"
                src={"/service.png"}
                alt="logo"
              />
            </div>
          )}
          {tokenService?.getUserRoleFromCookie() === "Admin" ? (
            <>
              {" "}
              <Menu
                className=" mb-[80px] ant-dashboard-layout"
                style={{ background: colorPrimary }}
                mode={!see || (see && collapsed) ? "vertical" : "inline"}
                defaultSelectedKeys={[pathname]}
                onClick={({ key }) => navigate(key)}
                items={[
                  {
                    key: "/",
                    icon: (
                      <MdDashboard
                        className={` ${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: <div className="text-[#0F172A]">Dashboard</div>,
                  },
                  {
                    key: "/register-unit",
                    icon: (
                      <FaUsers 
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className=" text-[#0F172A]">
                        Register Unit
                      </div>
                    ),
                  },
                  {
                    key: "/franchise-list",
                    icon: (
                      <MdShoppingBag
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className=" text-[#0F172A]">
                        Franchise Management
                      </div>
                    ),
                  },
                  // {
                  //   key: "/customer-list",
                  //   icon: (
                  //     <RiCustomerService2Fill
                  //       className={`${
                  //         collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  //       }`}
                  //     />
                  //   ),
                  //   label: (
                  //     <div className=" text-[#0F172A]">Customer Management</div>
                  //   ),
                  // },
                  // {
                  //   key: "/complaint",
                  //   icon: (
                  //     <MdInventory2
                  //       className={`${
                  //         collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  //       }`}
                  //     />
                  //   ),
                  //   label: (
                  //     <div className="text-[#0F172A]">Complaint Management</div>
                  //   ),
                  // },
                  // {
                  //   key: "/service-list",
                  //   icon: (
                  //     <MdTask
                  //       className={`${
                  //         collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  //       }`}
                  //     />
                  //   ),
                  //   label: (
                  //     <div className="text-[#0F172A]">Service Management</div>
                  //   ),
                  // },
                  // {
                  //   key: "/lead-list",
                  //   icon: (
                  //     <MdReceipt
                  //       className={`${
                  //         collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  //       }`}
                  //     />
                  //   ),
                  //   label: (
                  //     <div className="text-[#0F172A]">Lead Management</div>
                  //   ),
                  // },

                  // {
                  //   key: "/account-details",
                  //   icon: (
                  //     <MdDashboard
                  //       className={` ${
                  //         collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  //       }`}
                  //     />
                  //   ),
                  //   label: <div className="">Settings</div>,
                  // },
                ]}
              />
            </>
          ) : (
            <>
              {" "}
              <Menu
                className=" mb-[80px] ant-dashboard-layout"
                style={{ background: colorPrimary }}
                mode={!see || (see && collapsed) ? "vertical" : "inline"}
                defaultSelectedKeys={[pathname]}
                onClick={({ key }) => navigate(key)}
                items={[
                  {
                    key: "/",
                    icon: (
                      <MdDashboard
                        className={` ${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: <div className="text-[#0F172A]">Dashboard</div>,
                  },

                  {
                    key: "/lead",
                    icon: (
                      <MdReceipt
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className="text-[#0F172A]">Lead Management</div>
                    ),
                  },
                   {
                    key: "/complaint",
                    icon: (
                      <QuestionCircleOutlined 
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className=" text-[#0F172A]">
                       Complaint
                      </div>
                    ),
                  },
                   {
                    key: "/register-unit",
                    icon: (
                      <FaUsers 
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className=" text-[#0F172A]">
                        Register Unit
                      </div>
                    ),
                  },
                   {
                    key: "/visitors",
                    icon: (
                      <MdReceipt
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className=" text-[#0F172A]">
                        Visitors
                      </div>
                    ),
                  },
                   {
                    key: "/staff",
                    icon: (
                      <MdReceipt
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className=" text-[#0F172A]">
                        Staff
                      </div>
                    ),
                  },
                   {
                    key: "/emergency",
                    icon: (
                      <MdReceipt
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className=" text-[#0F172A]">
                        Emergency
                      </div>
                    ),
                  },
                   {
                    key: "/expenses",
                    icon: (
                      <MoneyCollectFilled
                        className={`${
                          collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                        }`}
                      />
                    ),
                    label: (
                      <div className=" text-[#0F172A]">
                        Expenses
                      </div>
                    ),
                  },
                  // {
                  //   key: "/complaint-list",
                  //   icon: (
                  //     <MdInventory2
                  //       className={`${
                  //         collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  //       }`}
                  //     />
                  //   ),
                  //   label: (
                  //     <div className="text-[#0F172A]">Complaint Management</div>
                  //   ),
                  // },
                  // {
                  //   key: "/account-details",
                  //   icon: (
                  //     <MdDashboard
                  //       className={` ${
                  //         collapsed || !see ? "ml-1 h-[20px] w-[20px] mr-5" : ""
                  //       }`}
                  //     />
                  //   ),
                  //   label: <div className="">Settings</div>,
                  // },
                ]}
              />
            </>
          )}
        </Sider>
        {getSiderWidth() > 70 && currentPage === "Account Details" && (
          <>
            <div className="z-99999 ml-[239px] ">
              <div className="text-[#0F172A] font-bold py-5 ml-4  text-2xl">
                Setting
              </div>{" "}
              <div className="border-b-[1px] w-10/12 mx-auto ">
                <Input
                  // size="large"
                  placeholder="Search in setting"
                  prefix={<img src="/preffixsearch.png" />}
                  className="border-none bg-[#f8fafc] pl-2"
                />
              </div>
              <div
                onClick={handleButtonClick} // Add navigation here
                className={`flex items-center mt-8 mx-auto   w-10/12 p-3 cursor-pointer ${
                  currentPage === "Account Details" ? "bg-[#e2e8f0]" : ""
                }`}
              >
                <span className="ml-0">
                  <img src="man.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Accounts Details
                </div>
              </div>{" "}
              <div
                className={`flex items-center mt-2 mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="security.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Security
                </div>
              </div>{" "}
              <div
                className={`flex items-center mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="notifications.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Notification
                </div>
              </div>{" "}
              <div
                className={`flex items-center mx-auto   w-10/12 p-3 cursor-pointer `}
              >
                <span className="ml-0">
                  <img src="billing.png" alt="" />
                </span>
                <div
                  className={`ml-2 text-[#1E293B] font-DMSans
                }`}
                >
                  Plan & Billing
                </div>
              </div>
            </div>
          </>
        )}{" "}
        <Layout>
          <Header
            className={`flex  items-center  ${getMarginLeft()} transition-all duration-300`}
            style={{
              paddingLeft: 6,
              paddingRight: 12,
            }}
          >
            <button
              className="mx-3 text-lg"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <div className=" w-full flex justify-end items-center sm:justify-between">
              {/* <div className="font-DMSans text-[#0F172A] font-bold text-lg max-sm:hidden">
                {currentPage === "Lead" ? "Lead List" : currentPage}
              </div> */}
              <div className=" w-8/12 sm:w-3/12 lg:w-80 flex items-center justify-between">
                {/* {currentPage !== "Account Details" ? (
                  <>
                    {" "}
                    <div
                      className={`bg-[#f1f5f9] w-9 h-9 rounded-full justify-center items-center ${
                        see ? "flex" : "hidden"
                      }`}
                    >
                      <img src="/msg.png" alt="img" className="h-3 w-4" />
                    </div>
                    <div className="bg-[#f1f5f9] w-9 h-9 rounded-full flex justify-center items-center ">
                      <img
                        src="/notification.png"
                        alt="img"
                        className="h-4 w-4"
                      />
                    </div>
                  </>
                ) : (
                  ""
                )} */}

               
              </div>
               <Dropdown className=" " menu={{ items }} placement="top" arrow>
                  <div className="flex items-center cursor-pointer">
                    <div>
                      <img
                        src="/dp-img.jpg"
                        className="rounded-full h-10 w-10"
                        alt="img"
                      />
                    </div>
                    <div className="leading-5 ml-2">
                      <div className="font-bold">{
                    //   data?.data?.username ||
                       "Qazi Nauman"}</div>
                      <div className={`${see ? "flex" : "hidden"}`}>
                        {
                        // data?.data?.email.slice(0, 10) || 
                        "Admin"
                        }
                      </div>
                    </div>
                  </div>
                </Dropdown>
            </div>
          </Header>
          <Content
            className={`${getMarginLeft()} transition-all duration-300 `}
            style={{
              // paddingLeft: 18,
              minHeight: "100vh",
              backgroundColor: "#f8fafc",
              padding: 12,
              // paddingTop: 12,
            }}
          >
            <Outlet />
          </Content>{" "}
        </Layout>
      </Layout>{" "}
     
    </>
  );
};

export default DashboardLayout;
