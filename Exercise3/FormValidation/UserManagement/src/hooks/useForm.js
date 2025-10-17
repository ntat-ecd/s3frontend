//useForm.js
import { useEffect, useState } from "react";

//onSubmit = handleLogin
export const useForm = ({ initialValues, validate, onSubmit }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    console.log("validationErrors:", validationErrors);
    setErrors(validationErrors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);

    await onSubmit(values);

    setIsSubmitting(false);
  };

  return { values, errors, isSubmitting, handleChange, handleSubmit };
};
