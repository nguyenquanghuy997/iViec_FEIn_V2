import React from "react";
// lib

// component
import HeadingBar from "@/components/heading-bar/HeadingBar";

const JobCreateHeader = ({children, ...props}) => {
  return (
      <HeadingBar style={{marginBottom: '28px', position: 'fixed', top: '64px'}} {...props}>
        {children}
      </HeadingBar>
  )
}
export default JobCreateHeader;