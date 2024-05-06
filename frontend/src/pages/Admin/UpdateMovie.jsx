import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  useGetSpecificMovieQuery,
  useDeleteMovieMutation,
  useUpdateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movie";
import { toast } from "react-toastify";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    detail: "",
    year: "",
    cast: [],
    ratings: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [UpdateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();

  const [
    updateImage,
    { isLoading: isUpdatingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
      <form>
        <p>UpdateMovie</p>

        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              value={movieData.name}
              className="border px-2 py-1 w-full"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              value={movieData.year}
              className="border px-2 py-1 w-full"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              value={movieData.detail}
              className="border px-2 py-1 w-full"
              onChange={handleChange}
            ></textarea>
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              value={movieData.cast.join(",")}
              className="border px-2 py-1 w-full"
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(",") })
              }
            />
          </label>
        </div>

        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload Image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>

        <button
          type="button"
          onClick={handleChange}
          className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded"
          disabled={isUpdatingMovie || isUpdatingImage}
        >
          {isUpdatingMovie || isUpdatingImage ? "Updating..." : "Update Movie"}
        </button>

        <button
          type="button"
          onClick={handleChange}
          className="bg-red-500 text-white px-4 py-2 rounded ml-2"
          disabled={isUpdatingMovie || isUpdatingImage}
        >
          {isUpdatingImage || isUpdatingMovie ? "Deleting..." : "Delete Movie"}
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
