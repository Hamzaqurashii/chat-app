import { Link } from "react-router-dom";
import { getAllUsersRequest } from "../request";
import { useContext, useEffect, useState } from "react";
import { IUser } from "../interface";
import AuthContext from "../auth-store";


export default function PrivateChat() {
  const [users, setUsers] = useState<IUser[]>([]);

  const { auth } = useContext(AuthContext);

  const getUserList = async () => {
    const data = await getAllUsersRequest();
    setUsers(data);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {users.map(
        (person) =>
          auth._id !== person._id && (
            <Link to={`/chat/${person._id}`} key={person._id}>
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {person.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">Employee</p>
                </div>
              </li>
            </Link>
          )
      )}
    </ul>
  );
}
