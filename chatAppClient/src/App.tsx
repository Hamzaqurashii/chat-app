import { useContext } from "react";
import "./App.css";
import Login from "./Component/login";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import AuthContext from "./auth-store";
import Header from "./Component/header";
import GroupList from "./Component/group-chat";
import PrivateChat from "./Component/private-chat";
import ChatBox from "./Component/Chatbox/[_id]";
import GroupChatBox from "./Component/grouproom/[_id]";

const _App = () => {
  return (
    <div className="lg:mx-44 md:mx-32 mx-2">
      <Header />
      <Outlet />
    </div>
  );
};

function App() {
  const { auth } = useContext(AuthContext);

  if (!auth.isLoggedIn) {
    return <Login />;
  }

  const route = createBrowserRouter([
    {
      path: "/",
      element: <_App />,
      children: [
        { path: "/", element: <PrivateChat /> },
        { path: "/group-list", element: <GroupList /> },
        { path: "/chat/:id", element: <ChatBox /> },
        { path: "/room/:id", element: <GroupChatBox /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default App;
