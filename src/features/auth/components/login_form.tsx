import { LoginFormOrganism } from "@/shared//components/organisms/LoginForm.tsx";
import { useLoginAuth } from "../hooks/useLoginAuth.ts";
import { useLoginForm } from "../hooks/useLoginForm.ts";

export const LoginForm = () => {
  const { loading, error, handleLogin } = useLoginAuth();
  const {
    email,
    password,
    emailError,
    passwordError,
    validateEmail,
    validatePassword,
    validateForm,
  } = useLoginForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    handleLogin(email, password);
  };

  return (
    <LoginFormOrganism
      email={email}
      password={password}
      emailError={emailError}
      passwordError={passwordError}
      error={error}
      loading={loading}
      onEmailBlur={validateEmail}
      onPasswordBlur={validatePassword}
      onSubmit={handleSubmit}
    />
  );
};

export default LoginForm;
