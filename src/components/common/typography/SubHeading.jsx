import React from 'react'

const SubHeading = ({children , className = "",...props}) => {
  return (
    <h3 {...props}
       className={`font-louize text-[#000] text-center text-[16px] md:text-[24px] leading-[30px] md:leading-[42px] tracking-[1.5px] capitalize ${className}`}>
      {children}
    </h3>
  )
}

export default SubHeading
