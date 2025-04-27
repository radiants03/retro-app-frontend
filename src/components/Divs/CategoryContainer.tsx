import {
  createCard,
  deleteCardByCategoryAndCardId,
  getCardsDetailsByCategoryId,
  updateCard,
} from "@/utils/api/card";
import {
  createComment,
  deleteCommentByCardIdAndCommentId,
  getCommentsByCardId,
  updateComment,
} from "@/utils/api/comment";
import { PCreateCard, PUpdateCard } from "@/utils/api/payloads";
import { DarkerColor } from "@/utils/color";
import { TCard, TComment } from "@/utils/type";
import { useEffect, useState } from "react";
import CardInput from "../fields/CardInput";
import { CloseIcon, CommentIcon, PlusIcon, RemoveIcon } from "../icons/icons";

interface Props {
  id: number;
  title: string;
  color: string;
  currentlyEditingCardId: number | undefined;
  setCurrentlyEditingCardId: (id: number | undefined) => void;
  currentlyEditingCommentId: number | undefined;
  setCurrentlyEditingCommentId: (id: number | undefined) => void;
}

const CategoryContainer = ({
  id,
  title,
  color,
  currentlyEditingCardId,
  setCurrentlyEditingCardId,
  currentlyEditingCommentId,
  setCurrentlyEditingCommentId,
}: Props) => {
  const [cardData, setCardData] = useState<TCard>();
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [showNewCommentForm, setShowNewCommentForm] = useState(false);
  const [showEditCardForm, setShowEditCardForm] = useState(false);
  const [showEditCommentForm, setShowEditCommentForm] = useState(false);
  const [newCardContent, setNewCardContent] = useState<string>("");
  const [newCommentContent, setNewCommentContent] = useState<string>("");
  const [editCardContent, setEditCardContent] = useState<string>("");
  const [editCommentContent, setEditCommentContent] = useState<string>("");
  const [openComments, setOpenComments] = useState<{
    [cardId: number]: boolean;
  }>({});
  const [comments, setComments] = useState<{
    [cardId: number]: TComment[];
  }>({});

  const fetchCardsData = async () => {
    const { data, error } = await getCardsDetailsByCategoryId(id);
    if (!error) {
      setCardData(data);
    }
  };

  const handleCreateCard = async () => {
    const payload: PCreateCard = {
      content: newCardContent,
      username: localStorage.getItem("username") || "Anonymous",
      category_id: id,
    };

    await createCard(payload);
    setNewCardContent("");
    setShowNewCardForm(false);
    fetchCardsData();
  };

  const handleEditCard = async (cardId: number) => {
    const payload: PUpdateCard = {
      content: editCardContent,
    };
    await updateCard(id, cardId, payload);
    setEditCardContent("");
    setCurrentlyEditingCardId(undefined);
    setShowEditCardForm(false);
    fetchCardsData();
  };

  const handleDeleteCard = async (categoryId: number, cardId: number) => {
    await deleteCardByCategoryAndCardId(categoryId, cardId);
    fetchCardsData();
  };

  const fetchCommentsByCardId = async (cardId: number) => {
    const { data, error } = await getCommentsByCardId(cardId);
    if (!error) {
      setComments((prev) => ({ ...prev, [cardId]: data }));
    }
  };

  const handleCreateComment = async (cardId: number) => {
    const payload = {
      content: newCommentContent,
      username: localStorage.getItem("username") || "Anonymous",
      cardId: cardId,
    };
    await createComment(payload);
    setNewCommentContent("");
    setShowNewCommentForm(false);
    fetchCommentsByCardId(cardId);
  };

  const handleEditComment = async (cardId: number, commentId: number) => {
    const payload = {
      content: editCommentContent,
    };
    await updateComment(cardId, commentId, payload);
    setEditCommentContent("");
    setCurrentlyEditingCommentId(undefined);
    setShowEditCommentForm(false);
    fetchCommentsByCardId(cardId);
  };

  const handleDeleteComment = async (cardId: number, commentId: number) => {
    await deleteCommentByCardIdAndCommentId(cardId, commentId);
    fetchCommentsByCardId(cardId);
  };

  useEffect(() => {
    fetchCardsData();
  }, []);

  useEffect(() => {
    setCurrentlyEditingCardId(undefined);
  }, [showNewCardForm]);

  return (
    <div
      className="flex flex-col items-center lg:max-w-90"
      style={{ minWidth: "300px" }}
    >
      <div
        className="rounded py-2 px-15 text-white border-1 border-gray-200 cursor-pointer w-full mb-2 text-center"
        style={{
          background: color,
        }}
      >
        <h1 className="text-md font-bold">{title || "Untitled"}</h1>
      </div>
      <hr className="w-90/100 border-t-1 border-gray-300 mb-4" />
      {cardData?.map((card, index) => {
        if (card.id !== currentlyEditingCardId) {
          return (
            <div
              key={`card-${index}`}
              className="group rounded py-2 px-3 text-white border-1 border-gray-200 w-full mb-2"
              style={{
                background: color,
              }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.id === "card-content") {
                  setCurrentlyEditingCardId(card.id);
                  setEditCardContent(card.content);
                  setShowEditCardForm(true);
                }
              }}
            >
              <div>
                <p
                  className="text-md leading-normal border border-white/10 px-2 rounded w-fit mb-3"
                  style={{
                    background: DarkerColor(color, -20),
                  }}
                >
                  {card.username}
                </p>
              </div>
              <h3
                id="card-content"
                className="text-2xl leading-normal cursor-pointer"
              >
                {card.content}
              </h3>
              <div className="flex flex-row items-center justify-between gap-2">
                <div className="flex flex-row gap-2">
                  <button
                    className="flex flex-row gap-2 text-white rounded-sm py-1 px-1 mt-4 hover:bg-white/20 transition-all duration-100 text-sm cursor-pointer group-hover:opacity-100 opacity-0 transition-all duration-500"
                    onClick={() => handleDeleteCard(id, card.id)}
                  >
                    <RemoveIcon className="text-white w-4 h-4" />
                  </button>
                  <button
                    className="flex flex-row gap-2 text-white rounded-sm py-1 px-1 mt-4 hover:bg-white/20 transition-all duration-100 text-sm cursor-pointer group-hover:opacity-100 opacity-0 transition-all duration-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (openComments[card.id]) {
                        setOpenComments((prev) => ({
                          ...prev,
                          [card.id]: false,
                        }));
                      } else {
                        setOpenComments((prev) => ({
                          ...prev,
                          [card.id]: true,
                        }));
                        fetchCommentsByCardId(card.id);
                      }
                    }}
                  >
                    <CommentIcon className="text-white w-4 h-4" />
                  </button>
                </div>
                <button className="flex flex-row gap-2 text-white rounded-sm py-1/2 px-1 mt-4 hover:bg-white/20 transition-all duration-100 text-sm cursor-pointer border border-white/30">
                  {card.like_count > 0 ? card.like_count + " Liked" : "Like"}
                </button>
              </div>
              {openComments[card.id] && (
                <>
                  <hr className="w-full border-t-1 border-white/20 my-2" />
                  {showNewCommentForm && (
                    <div className="flex flex-row items-center justify-between gap-2 mt-4">
                      <CardInput
                        id="comment-input"
                        placeholder="Write a comment.."
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        onBlur={() => {
                          if (newCommentContent !== "") {
                            handleCreateComment(card.id);
                          } else {
                            setShowNewCommentForm(false);
                          }
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            if (newCommentContent !== "") {
                              handleCreateComment(card.id);
                            } else {
                              setShowNewCommentForm(false);
                            }
                          }
                        }}
                      />
                    </div>
                  )}
                  <div className="flex flex-col gap-2 mt-2">
                    {!showNewCommentForm && (
                      <button
                        className="flex flex-row gap-2 text-white rounded-sm py-1 px-1 hover:bg-white/20 transition-all duration-100 text-sm cursor-pointer group-hover:opacity-100 opacity-0 transition-all duration-500 justify-center"
                        onClick={() => setShowNewCommentForm(true)}
                      >
                        <PlusIcon className="text-white w-4 h-4" />
                      </button>
                    )}
                    {comments[card.id]?.length > 0 ? (
                      comments[card.id]?.map((comment, index) => {
                        if (comment.id !== currentlyEditingCommentId) {
                          return (
                            <div
                              key={`comment-${index}`}
                              className="group rounded flex flex-row py-2 px-3 text-white border-1 border-white/30 w-full"
                              style={{
                                background: DarkerColor(color, -20),
                              }}
                              onClick={(e) => {
                                const target = e.target as HTMLElement;
                                if (target.id === "comment-content") {
                                  setCurrentlyEditingCommentId(comment.id);
                                  setEditCommentContent(comment.content);
                                  setShowEditCommentForm(true);
                                }
                              }}
                            >
                              <p
                                className="text-sm leading-normal border border-white/10 px-2 rounded w-fit h-fit mr-2"
                                style={{
                                  background: DarkerColor(color, 50),
                                }}
                              >
                                {comment.username}
                              </p>
                              <h3
                                className="text-md leading-normal w-full"
                                id="comment-content"
                              >
                                {comment.content}
                              </h3>
                              <button
                                className="flex flex-row gap-2 text-white rounded-sm py-1 px-1 hover:bg-white/20 transition-all duration-100 text-sm cursor-pointer group-hover:opacity-100 opacity-0 transition-all duration-500 h-fit w-fit"
                                onClick={() => {
                                  handleDeleteComment(card.id, comment.id);
                                }}
                              >
                                <CloseIcon className="text-white w-4 h-4" />
                              </button>
                            </div>
                          );
                        }
                      })
                    ) : (
                      <div className="text-white/50 text-sm text-center mb-2">
                        No comments yet.
                      </div>
                    )}

                    {showEditCommentForm && (
                      <div className="flex flex-row items-center justify-between gap-2 mt-4">
                        <CardInput
                          id="edit-comment-input"
                          placeholder="Edit comment.."
                          value={editCommentContent}
                          onChange={(e) =>
                            setEditCommentContent(e.target.value)
                          }
                          onBlur={() => {
                            if (editCommentContent !== "") {
                              handleEditComment(
                                card.id,
                                currentlyEditingCommentId as number
                              );
                            } else {
                              setCurrentlyEditingCommentId(undefined);
                              setShowEditCommentForm(false);
                            }
                          }}
                          onKeyUp={(e) => {
                            if (e.key === "Enter") {
                              if (editCommentContent !== "") {
                                handleEditComment(
                                  card.id,
                                  currentlyEditingCommentId as number
                                );
                              } else {
                                setCurrentlyEditingCommentId(undefined);
                                setShowEditCommentForm(false);
                              }
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        }
      })}

      {/* Show new card */}
      {showNewCardForm && (
        <div
          className="group rounded py-2 px-3 text-white border-1 border-gray-200 w-full mb-2"
          style={{
            background: color,
          }}
        >
          <CardInput
            id="new-card-input"
            placeholder="Write here.."
            textType="card"
            onChange={(e) => setNewCardContent(e.target.value)}
            onBlur={() => {
              if (newCardContent !== "") {
                handleCreateCard();
              } else {
                setShowNewCardForm(false);
              }
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                if (newCardContent !== "") {
                  handleCreateCard();
                } else {
                  setShowNewCardForm(false);
                }
              }
            }}
          />
          <div className="flex flex-row items-center justify-between gap-2"></div>
        </div>
      )}

      {/* Show edit card */}
      {showEditCardForm && (
        <div
          className="group rounded py-2 px-3 text-white border-1 border-gray-200 w-full mb-2"
          style={{
            background: color,
          }}
        >
          <CardInput
            id="edit-card-input"
            placeholder="Write here.."
            textType="card"
            value={editCardContent}
            onChange={(e) => setEditCardContent(e.target.value)}
            onBlur={() => {
              if (editCardContent !== "") {
                handleEditCard(currentlyEditingCardId as number);
              } else {
                setCurrentlyEditingCardId(undefined);
                setShowEditCardForm(false);
              }
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                if (editCardContent !== "") {
                  handleEditCard(currentlyEditingCardId as number);
                } else {
                  setCurrentlyEditingCardId(undefined);
                  setShowEditCardForm(false);
                }
              }
            }}
          />
          <div className="flex flex-row items-center justify-between gap-2"></div>
        </div>
      )}
      <div
        className="group flex flex-row rounded py-2 px-3 text-white border-1 border-gray-300 cursor-pointer w-full items-center justify-center hover:border-yellow-500 transition-all duration-200"
        onClick={() => {
          setShowNewCardForm(true);
        }}
      >
        <PlusIcon className="text-gray-500 group-hover:text-yellow-500 transition-all duration-200" />
      </div>
    </div>
  );
};
export default CategoryContainer;
