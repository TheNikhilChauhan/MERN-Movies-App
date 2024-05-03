import { useState } from "react";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useUpdateGenreMutation,
  useFetchGenreQuery,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import GenreForm from "../../components/GenreForm";
import Modal from "../../components/Modal";

const GenreList = () => {
  const [name, setName] = useState("");

  const [selectGenre, setSelectGenre] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [modalVisible, setModalVisible] = useState("");

  const { data: genre, refetch } = useFetchGenreQuery();
  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required.");
      return;
    }
    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Genre deletion failed. Try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required.");
      return;
    }
    try {
      const result = await updateGenre({
        id: selectGenre._id,
        updateGenre: {
          name: updateName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated.`);
        refetch();
        setSelectGenre(null);
        setUpdateName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <h1 className="h-12">Manage Genres</h1>
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />
        <br />

        <div className="flex flex-wrap">
          {genre?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectGenre(genre);
                    setUpdateName(genre.name);
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updateName}
            setValue={setUpdateName}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
