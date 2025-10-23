//useForm.js
import { useState } from "react";
import { validateField, validateForm } from "../utils/validate";

//onSubmit = handleLogin
export const useForm = ({ initialValues, onSubmit }) => {
  // console.log("useForm called with parameter(s): ", initialValues);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e) => {
    // console.log("HandleBlur called by ", e.target.name);
    const { name, value } = e.target;

    const validationError = validateField(name, value);
    // console.log("validationErrors: ", validationError);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationError,
    }));
    // console.log("errors: ", errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(values);
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
    setValues,
  };
};
