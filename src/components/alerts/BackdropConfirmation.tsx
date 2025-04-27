interface Props {
  close: () => void;
}

const AddCardForm = ({ close }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
        <p className="mb-4">Are you sure you want to proceed?</p>
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={close}
          >
            Cancel
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardForm;
