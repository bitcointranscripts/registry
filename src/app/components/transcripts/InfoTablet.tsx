import React from 'react'

const InfoTablet = ({idx, text}:{idx: number, text:string}) => {
  return (
    <p
    key={idx}
    className='py-[4.11px] px-[16.43px] rounded-[5.13px] bg-gray-custom-700 max-md:px-3 max-md:py-[2px] max-xl:text-[13px] max-md:text-sm max-md:border max-md:border-gray-custom-300 max-md:leading-[100%]'
  >
    {text}
  </p>
  )
}

export default InfoTablet