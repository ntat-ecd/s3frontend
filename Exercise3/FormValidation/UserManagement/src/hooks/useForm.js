//useForm.js
import { useState } from "react";

//onSubmit = handleLogin
export const useForm = ({ initialValues, validate, onSubmit }) => {
  // console.log("useForm called with parameter(s): ", initialValues);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    const validationErrors = validate(values);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    // console.log("validationErrors:", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    await onSubmit(values);

    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues
  };
};
