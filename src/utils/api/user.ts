import { ApiResponse } from "../type";
import { PLoginUser, PPasswordReset, PRegisterUser } from "./payloads";

export const createUser = async (
  payload: PRegisterUser
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to create user" };
    }

    return { data };
  } catch (e) {
    if (e instanceof Error) {
      return { error: e.message || "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const login = async (payload: PLoginUser): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to login" };
    }

    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const resetPassword = async (
  payload: PPasswordReset
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "An unknown error occurred" };
    }

    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const userProfile = async (): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "An unknown error occurred" };
    }

    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const logout = async (): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "An unknown error occurred" };
    }

    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};
