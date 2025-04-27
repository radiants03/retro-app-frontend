import { ApiResponse } from "../type";
import { PCreateBoard, PUpdateBoard } from "./payloads";

export const getBoardDetailsById = async (
  boarId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/${boarId}`;
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

export const createBoard = async (
  payload: PCreateBoard
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/create`;
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

export const updateBoard = async (
  boardId: number,
  payload: PUpdateBoard
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/${boardId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "include",
      body: JSON.stringify(payload),
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

export const deleteBoard = async (boardId: number): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/${boardId}`;
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
