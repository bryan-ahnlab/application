import { useState } from "react";
import { useForm } from "react-hook-form";
import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const response = await authAPI.login(data.username, data.password);
      const { access_token } = response.data;

      // Store token first with temporary user data
      const tempUser = {
        id: 0,
        email: "",
        username: data.username,
        is_active: true,
        created_at: new Date().toISOString(),
      };
      login(access_token, tempUser);
      localStorage.setItem("access_token", access_token);

      // Now get user info with the token
      const userResponse = await authAPI.getMe();
      const user = userResponse.data;

      // Update user data in store
      useAuthStore.getState().updateUser(user);

      // Clear any previous errors on success
      setError("");

      console.log(
        "Login successful, token stored in both Zustand and localStorage:",
        access_token
      );
      console.log("User data:", user);

      // Verify token is stored
      const authState = useAuthStore.getState();
      console.log("Auth state after login:", {
        isAuthenticated: authState.isAuthenticated,
        hasToken: !!authState.token,
        tokenPreview: authState.token
          ? authState.token.substring(0, 20) + "..."
          : "none",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      console.error("Login error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    isLoading,
    error,
    onSubmit: handleSubmit(onSubmit),
  };
};

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.register({
        email: data.email,
        username: data.username,
        password: data.password,
      });

      // Auto login after successful registration
      const loginResponse = await authAPI.login(data.username, data.password);
      const { access_token } = loginResponse.data;

      // Store in both Zustand store and localStorage for redundancy
      login(access_token, response.data);
      localStorage.setItem("access_token", access_token);

      // Clear any previous errors on success
      setError("");

      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    isLoading,
    error,
    onSubmit: handleSubmit(onSubmit),
  };
};
