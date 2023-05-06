import React from "react";

export default function index() {
  return (
    <div className="2xl:mx-auto 2xl:container flex justify-center items-center   md:py-12 py-9 xl:px-20 sm:px-6 px-4 ">
      <div className=" xl:w-auto md:flex hidden flex-col space-y-6 xl:space-y-0 xl:flex-row justify-center items-center">
        <div className="flex  justify-between w-full   items-center space-x-6 xl:space-x-8 ">
          <div className="flex justify-center items-center">
            <img
              className="hidden xl:block"
              src="https://images.unsplash.com/photo-1667808926106-11fd8c36fe1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              width={400}
              alt="Etherum"
            />
          </div>
          <div className="flex flex-col justify-between  xl:mt-0  items-center space-y-6  xl:space-y-8">
            <div className="flex flex-col xl:flex-row justify-between h-full xl:justify-center items-center space-y-8 xl:space-y-0 xl:space-x-8">
              <div className="md:w-72 mx-1 md:h-64 lg:mt-4 xl:mt-0  flex flex-col justify-center items-center text-center">
                <p className=" text-3xl xl:text-4xl font-semibold  leading-7 xl:leading-9 text-center text-gray-800">
                  About Us
                </p>
              </div>
              <div className=" ">
                <img
                  className="hidden xl:block"
                  src="https://images.unsplash.com/photo-1667808926106-11fd8c36fe1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  width={400}
                  alt="Etherum"
                />
                <img
                  className="xl:hidden"
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
                  alt="Node"
                />
              </div>
            </div>
            <div className="hidden xl:flex flex-row justify-center  items-center space-x-6 xl:space-x-8">
              <div className="">
                <img
                  className="xl:hidden"
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
                  width={400}
                  alt="Node"
                />
              </div>
              <div className="">
                <img
                  className="hidden xl:block"
                  src="https://images.unsplash.com/photo-1667808926106-11fd8c36fe1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  width={400}
                  alt="Etherum"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="xl:hidden flex flex-row justify-between   space-x-6 xl:space-x-8">
          <div className="">
            <img
              className="hidden xl:block"
              src="https://images.unsplash.com/photo-1667808926106-11fd8c36fe1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              width={400}
              alt="Etherum"
            />
          </div>
          <div className="">
            <img
              className="hidden xl:block"
              src="https://images.unsplash.com/photo-1667808926106-11fd8c36fe1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              width={400}
              alt="Etherum"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
