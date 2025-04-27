import { ApiResponse } from "../type";
import { PCreateCard, PUpdateCard } from "./payloads";

export const getCardsDetailsByCategoryId = async (
  categoryId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/search/${categoryId}`;
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

export const createCard = async (
  payload: PCreateCard
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/create`;
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

export const updateCard = async (
  categoryId: number,
  cardId: number,
  payload: PUpdateCard
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/${categoryId}/${cardId}`;
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

export const deleteCardByCategoryAndCardId = async (
  categoryId: number,
  cardId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/${categoryId}/${cardId}`;
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

export const likeCard = async (
  categoryId: number,
  cardId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/like/${categoryId}/${cardId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "POST",
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

export const dislikeCard = async (
  categoryId: number,
  cardId: number
): Promise<ApiResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/boards/categories/cards/dislike/${categoryId}/${cardId}`;
  const token = localStorage.getItem("accessToken");

  try {
    const response = await fetch(url, {
      method: "POST",
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
