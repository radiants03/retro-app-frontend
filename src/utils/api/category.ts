import { ApiResponse } from "../type";
import { PCreateCategory } from "./payloads";

export const getCategoriesByBoardId = async (
  boarId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/search/${boarId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to load board details" };
    }

    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const createCategory = async (
  payload: PCreateCategory
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/create`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to load card details" };
    }

    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};

export const deleteCategory = async (
  boardId: number,
  categoryId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/${boardId}/${categoryId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.message || "Failed to load card details" };
    }

    return { data };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message || "An unknown error occurred" };
    }
    return { error: "An unknown error occurred" };
  }
};
