import { ApiResponse } from "../type";
import { PCreateComment, PUpdateComment } from "./payloads";

export const getCommentsByCardId = async (
  cardId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/comments/search/${cardId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
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

export const createComment = async (
  payload: PCreateComment
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/comments/create`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
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

export const updateComment = async (
  cardId: number,
  commentId: number,
  payload: PUpdateComment
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/comments/${cardId}/${commentId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
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

export const deleteCommentByCardIdAndCommentId = async (
  cardId: number,
  commentId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/comments/${cardId}/${commentId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
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
