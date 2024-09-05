import React, { useState } from "react";
import Header from "../Components/Header/index";
import Sidebar from "../Components/Sidebar/index";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
        {/* <div className="dark:bg-boxdark-2 dark:text-bodydark py-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} BillWisePro. All rights reserved.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default DefaultLayout;
