export const validateSignUpData = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  isTerms: boolean;
}) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/; // Indian 10-digit number
  const nameRegex = /^[a-zA-Z\s]{3,}$/;

  if (!data.name || !nameRegex.test(data.name)) {
    return 'Enter a valid full name (letters only, min 3 chars).';
  }
  if (!data.email || !emailRegex.test(data.email)) {
    return 'Enter a valid email address.';
  }
  if (!data.phone || !phoneRegex.test(data.phone)) {
    return 'Enter a valid 10-digit mobile number.';
  }
  if (!data.password || data.password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  if (data.password !== data.confirmPassword) {
    return 'Passwords do not match.';
  }
  if (!data.role) {
    return 'Please select a role (Student or Tutor).';
  }
  if (!data.isTerms) {
    return 'You must agree to Terms & Conditions.';
  }

  return ''; 
};
