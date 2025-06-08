import React from 'react'

const CardComponent = ({label,icon}) => {
  return (
   <div className='flex flex-col m-1 min-w-[30%] border-gray-400 border-[1px] flex-wrap items-center justify-center p-4  dark:bg-gray-600 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-300'>
{icon}
        <span className='text-sm font-medium text-gray-800 dark:text-white mt-2'>{label}</span>
   </div>
  )
}

export default CardComponent