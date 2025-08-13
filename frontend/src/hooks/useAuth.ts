"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { authAPI } from "@/lib/api";

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

  const onSubmit = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true);
      setError(""); // Clear previous errors at start

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
        console.error("Login error:", err);

        // Better error handling
        let errorMessage = "Login failed";
        if (err && typeof err === "object" && "response" in err) {
          const response = (err as any).response;
          if (response?.data?.detail) {
            errorMessage = response.data.detail;
          } else if (response?.status === 401) {
            errorMessage = "Incorrect username or password";
          } else if (response?.status === 422) {
            errorMessage = "Invalid input data";
          } else if (response?.status >= 500) {
            errorMessage = "Server error. Please try again later.";
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [login, router]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        username: formData.get("username") as string,
        password: formData.get("password") as string,
      };
      onSubmit(data);
    },
    [onSubmit]
  );

  return {
    register,
    handleSubmit,
    watch,
    errors,
    isLoading,
    error,
    onSubmit: handleFormSubmit,
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

  const onSubmit = useCallback(
    async (data: RegisterFormData) => {
      if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      setIsLoading(true);
      setError(""); // Clear previous errors at start

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

        router.push("/dashboard");
      } catch (err: unknown) {
        console.error("Registration error:", err);

        // Better error handling
        let errorMessage = "Registration failed";
        if (err && typeof err === "object" && "response" in err) {
          const response = (err as any).response;
          if (response?.data?.detail) {
            errorMessage = response.data.detail;
          } else if (response?.status === 400) {
            errorMessage = "Email or username already exists";
          } else if (response?.status === 422) {
            errorMessage = "Invalid input data";
          } else if (response?.status >= 500) {
            errorMessage = "Server error. Please try again later.";
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [login, router]
  );

  const handleFormSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const data = {
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
      };
      onSubmit(data);
    },
    [onSubmit]
  );

  return {
    register,
    handleSubmit,
    watch,
    errors,
    isLoading,
    error,
    onSubmit: handleFormSubmit,
  };
};
