import React from 'react'
import { useOutletContext } from 'react-router-dom'
import { MessageSquare } from 'lucide-react'

const UserDashboard = () => {
  const { user } = useOutletContext()

  return (
    <div className='w-full h-full bg-[#0f172a] flex flex-col items-center justify-center text-white p-6'>
      <div className='w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center mb-4 text-blue-500'>
        <MessageSquare size={40} />
      </div>
      <h2 className='text-2xl font-bold mb-2'>
        Welcome{user?.name ? `, ${user.name}` : ''}! 👋
      </h2>
      <p className='text-gray-400 text-sm text-center max-w-sm'>
        Select a conversation from the sidebar to start chatting.
      </p>
    </div>
  )
}

export default UserDashboard