//validate fields
export const validateField = (name, value) => {
 //console.log("validateField function called with [name,value]=", name, value);

  const specialCharRegex = /[^\w.@]/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^\d{10,}$/;

  switch (name) {
    case "userName":
      if (!value) return "Vui lòng nhập tên đăng nhập.";
      if (specialCharRegex.test(value))
        return "Tên đăng nhập không được chứa ký tự đặc biệt.";
      break;

    case "userPassword":
      if (!value) return "Vui lòng nhập mật khẩu.";
      if (value.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
      break;

    case "userEmail":
      if (!value) return "Vui lòng điền email.";
      if (!emailRegex.test(value)) return "Email không hợp lệ.";
      break;

    case "userPhoneNumber":
      if (!value) return "Vui lòng nhập số điện thoại.";
      if (!phoneRegex.test(value))
        return "Số điện thoại phải có ít nhất 10 chữ số.";
      break;

    default:
      break;
  }
  return "";
};

//validate full form
export const validateForm = (values) => {
  const newErrors = {};

  for (const name in values) {
    const error = validateField(name, values[name]);
    if (error) newErrors[name] = error;
  }

  return newErrors;
};
