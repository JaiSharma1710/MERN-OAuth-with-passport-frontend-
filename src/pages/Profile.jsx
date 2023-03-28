import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Profile() {
  useEffect(() => {
    getData();
  }, []);

  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/userdata', {
        withCredentials: true,
      });
      localStorage.setItem('UserData', JSON.stringify(data.user));
      setUserData(data.user);
    } catch (err) {
      navigate('/');
    }
  };

  const logUserOut = async () => {
    try {
      await axios.get('http://localhost:7000/logout', {
        withCredentials: true,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-3/4 h-4/5 flex flex-col gap-4 justify-center items-center rounded-md bg-white">
      <img
        src={userData?.profilePic}
        width="100px"
        height="100px"
        alt="profile pic"
        className="rounded-full"
      />
      <table className="flex w-full md:w-3/4 flex-col gap-4 border p-4 rounded-md">
        <tbody>
          <tr className="flex flex-col border lg:flex-row lg:divide-x-2">
            <th className="inline-block w-1/2 mx-2 p-2 text-left">
              First Name
            </th>
            <td className="inline-block w-1/2 mx-2 p-2">
              {userData?.firstName}
            </td>
          </tr>

          <tr className="flex flex-col lg:flex-row border lg:divide-x-2">
            <th className="inline-block w-1/2 mx-2 p-2 text-left">Last Name</th>
            <td className="inline-block w-1/2 mx-2 p-2">
              {userData?.lastName}
            </td>
          </tr>

          <tr className="flex border flex-col lg:flex-row lg:divide-x-2">
            <th className="inline-block w-1/2 mx-2 p-2 text-left">Email</th>
            <td className="inline-block w-1/2 mx-2 p-2">{userData?.email}</td>
          </tr>

          <tr className="flex border flex-col lg:flex-row lg:divide-x-2">
            <th className="inline-block w-1/2 mx-2 p-2 text-left">Source</th>
            <td className="inline-block w-1/2 mx-2 p-2">{userData?.source}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={logUserOut}
        className="bg-red-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-red-300"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
