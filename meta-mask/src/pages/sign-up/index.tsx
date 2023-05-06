import React, { useState } from "react";
import { useAppStore } from "../../store/app-store";
import { Button, Input } from "antd";
import { useRouter } from "next/router";
import { ROUTES } from "../../utils/api.util";
import { parseCookies } from "../../helpers";

const index = () => {
  const { handleWalletConnection } = useAppStore();
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Meta chat
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  UserName
                </label>

                <Input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="bharat_dusa"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <Button
                disabled={!username}
                className="w-full bg-primary-600 text-white"
                onClick={() => handleWalletConnection(username)}
              >
                Continue with metamask
              </Button>
            </form>
          </div>
        </div>
        <Button
          className="bg-primary-600 text-white hover:text-black mt-8"
          onClick={() => router.push(ROUTES.HOME)}
        >
          Go back
        </Button>
      </div>
    </section>
  );
};

export default index;

index.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req)

if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" })
      res.end()
    }
  }

  return {
    data: data && data,
  }
}
