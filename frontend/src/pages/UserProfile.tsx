import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SignInResponse {
    id: string;
    username: string;
    email: string;
    steam_id?: string;
    psn_auth_code?: string;
}

function UserProfile() {
    const [resp, setData] = useState<SignInResponse | undefined>(undefined);
    const nav = useNavigate();

    useEffect(() => {
        const localStorageUser = localStorage.getItem("user");
        if (localStorageUser != null) {
            const userData = JSON.parse(localStorageUser);
            setData(userData);
        } else {
            nav("/");
        }
    }, []);

    const logout = () => {
        setData(undefined);
        if (localStorage.getItem("user") != null) {
            localStorage.removeItem("user");
        }

        nav("/");
    };

    return (
        <div className="flex items-center h-screen w-full justify-center">
            <div className="max-w-xs">
                <div className="bg-white shadow-xl rounded-lg py-3">
                    <div className="photo-wrapper p-2">
                        <img
                            className="w-32 h-32 rounded-full mx-auto"
                            src="../../images/acastro_210113_1777_gamingstock_0002.jpg"
                            alt="TestUser"
                        ></img>
                    </div>
                    <div className="p-2">
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                            {resp?.username}
                        </h3>
                        <table className="text-xs my-3">
                            <tbody>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                        Email
                                    </td>
                                    <td className="px-2 py-2">{resp?.email}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                        SteamId
                                    </td>
                                    <td className="px-2 py-2">{resp?.steam_id}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                        PsnId
                                    </td>
                                    <td className="px-2 py-2">{resp?.psn_auth_code}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-2 text-gray-500 font-semibold">
                                        XboxId
                                    </td>
                                    <td className="px-2 py-2">testId2</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="text-center my-3">
                            <button onClick={logout}>Sign out</button>
                            <Link
                                to="/"
                                className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
