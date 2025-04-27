import Board from "../page";

const Page = async ({ params }: { params: { boardId: number } }) => {
  const { boardId } = await params;

  return <Board boardId={boardId} />;
};

export default Page;
