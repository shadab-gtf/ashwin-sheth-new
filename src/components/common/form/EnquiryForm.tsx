"use client"
import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

import GlobalModal from "../model/GlobalModal"
import DynamicForm from './DynamicForm';
// import Form from "./DynamicForm"

type Props = {
  open: boolean;
  onClose: () => void;
};

const EnquiryForm = ({ open, onClose }: Props) => {
    return (
        <div>

                     <GlobalModal open={open} onClose={onClose} closeButton={false}>
                <div className="bg-white p-6 relative">
                    <button   onClick={onClose} className="absolute top-[25px] right-[25px] text-gray-500 hover:text-black md:text-[28px]"><IoMdClose /></button>

                    <DynamicForm

                        title="Share Your Details"
                        subtitle="Our Team Will Get Back To You At The Earliest."
                        buttonText="Send Message"
                        fields={[
                            { name: "fullName", placeholder: "Full Name", label: "Full Name", type: "text", required: true },
                            { name: "email", placeholder: "Email Address", label: "Email", type: "email", required: true },
                            { name: "phone", placeholder: "Phone Number", label: "Phone", type: "number", required: true },
                            { name: "message", placeholder: "Message / Cover Note", label: "Message", type: "textarea", required: true },
                        ]}
                        onSuccess={(data: any) => console.log("Contact Submitted:", data)}
                    />
                </div>
            </GlobalModal>

        </div>
    )
}

export default EnquiryForm
