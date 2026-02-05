"use client";
import React, { useState } from "react";
import Heading from "../typography/Heading";
import { GoArrowRight } from "react-icons/go";
import { FaSpinner } from "react-icons/fa";
import { GoUpload } from "react-icons/go";

export default function DynamicForm({ title, subtitle, fields, onSuccess, buttonText = "Send Message" }) {
  const initialState = {};
  fields.forEach((f) => (initialState[f.name] = ""));

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    fields.forEach((field) => {
      const value = formData[field.name];

      // required
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
      }

      // email validation
      if (field.type === "email" && value) {
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          newErrors[field.name] = "Enter a valid email";
        }
      }

      // phone validation
      if (field.type === "number" && field.name === "phone" && value) {
        if (!/^[0-9]{10}$/.test(value)) {
          newErrors[field.name] = "Enter a valid 10-digit phone number";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (onSuccess) onSuccess(formData);
    }, 800);
  };

  const handleFileChange = (field, file) => {
    setFormData({ ...formData, [field]: file });
  };

  return (
    <div>
      {/* Heading + Subtitle */}
      <Heading className="text-start mb-[10px]">{title}</Heading>
      <p className="text-black tracking-[1.2] text-[12px] lg:text-[14px]">
        {subtitle}
      </p>

      <form className="lg:mt-[44px] mt-[25px]" onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="input-container mb-[40px]">
            {/* TEXT / NUMBER / EMAIL */}
            {(field.type === "text" ||
              field.type === "email" ||
              field.type === "number") && (
                <>
                  <input
                    type={field.type}
                    className="border-b-[1px] w-full border-b-[#000] pb-[20px] placeholder:text-[#000] tracking-[1.1] font-louize"
                    placeholder={field.placeholder}
                    maxLength={field.maxLength || 60}
                    value={formData[field.name]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-[13px] mt-1">
                      {errors[field.name]}
                    </p>
                  )}
                </>
              )}

            {/* TEXTAREA */}
            {field.type === "textarea" && (
              <>
                <textarea
                  className="border-b-[1px] w-full border-b-[#000] pb-[20px] placeholder:text-[#000] tracking-[1.1] font-louize"
                  placeholder={field.placeholder}
                  rows={1}
                  maxLength={field.maxLength || 200}
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </>
            )}

            {/* DROPDOWN */}
            {field.type === "select" && (
              <>
                <select
                  className="border-b-[1px] w-full border-b-[#000] pb-[20px] tracking-[1.1] font-louize"
                  value={formData[field.name]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                >
                  <option value=""> {field.label}</option>
                  {field.options?.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors[field.name] && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </>
            )}

            {/* FILE UPLOAD */}
            {field.type === "file" && (
              <>
                <label className="relative border-b-[1px] w-full border-b-[#000] pb-[15px] font-louize tracking-[1.1] flex items-center justify-between cursor-pointer">
                  <span className="text-[#000]">
                    {formData[field.name] ? formData[field.name].name : field.placeholder || "Upload File"}
                  </span>

                  {/* Upload icon */}
                  <GoUpload className="text-[16px]" />

                  <input
                    type="file"
                    accept={field.accept || "*"}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleFileChange(field.name, e.target.files[0])}
                  />
                </label>

                {errors[field.name] && (
                  <p className="text-red-500 text-[13px] mt-1">
                    {errors[field.name]}
                  </p>
                )}
              </>
            )}

          </div>
        ))}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isLoading}
          className="font-louize w-fit text-black text-[20px] font-normal leading-normal tracking-[1.5px] capitalize flex items-center justify-start gap-[20px] disabled:opacity-50"
        >
          {isLoading ? "Processing..." : buttonText}
          <span className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-[var(--primary)]">
            {isLoading ? <FaSpinner className="animate-spin" /> : <GoArrowRight />}
          </span>
        </button>
      </form>
    </div>
  );
}
