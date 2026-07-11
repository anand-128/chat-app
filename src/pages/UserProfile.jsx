import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { toast } from 'react-toastify'

const UserProfile = () => {

    const { user } = useOutletContext()

    const [userData, setUserData] = useState({})
    const [isEdit, setIsEdit] = useState(true)

    useEffect(() => {
        setUserData(user)
    }, [user])


    let handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    let handleEdit = async () => {
        if (isEdit) {
            setIsEdit(false)
        }
        else {

            // API Call for User Data Updation
            // console.log(user._id)
            let URL = "https://api.skillsvarz.com/api/user/" + user._id
            // console.log(URL);

            let resp = await fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })

            let res = await resp.json()

            if (resp.status === 200 || resp.status === 201) {
                toast.success('User Updated Successfully')
                setIsEdit(true)
            }
            else toast.error('Try Again')
        }
    }

    let handleCancel = () => {
        setUserData(user)
        setIsEdit(true)
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-[#0f172a] text-white">

            <div className="w-[400px] bg-gray-900 rounded-2xl shadow-lg p-6 space-y-4">

                {/* 👤 Title */}
                <h2 className="text-xl font-semibold text-center mb-4">
                    {user.name} Profile
                </h2>

                {/* 🧾 Input Fields */}
                <div className="space-y-3">

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-400">Your Name</label>
                        <input
                            onChange={handleChange}
                            disabled={isEdit}
                            type="text"
                            name="name"
                            value={userData.name}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm text-gray-400">Your Email</label>
                        <input
                            onChange={handleChange}
                            disabled={isEdit}
                            type="email"
                            name="email"
                            value={userData.email}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm text-gray-400">Your Phone</label>
                        <input
                            onChange={handleChange}
                            disabled={isEdit}
                            type="number"
                            name="phone"
                            value={userData.phone}
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="text-sm text-gray-400">Username</label>
                        <input
                            onChange={handleChange}
                            disabled={isEdit}
                            type="text"
                            name="username"
                            value={userData.username}
                            placeholder="Enter your username..."
                            className="w-full mt-1 px-3 py-2 rounded-lg bg-gray-800 outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        />
                    </div>

                </div>

                {/* 🔘 Buttons */}
                <div className="flex gap-3 pt-3">

                    <button
                        onClick={handleEdit}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition"
                    >
                        {isEdit ? 'Edit Profile' : 'Save Changes'}
                    </button>

                    {!isEdit && (
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>

            </div>
        </div>

    )
}

export default UserProfile