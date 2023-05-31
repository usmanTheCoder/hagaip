import { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { userInfo, userUpdate } from "../../toolkit/slices/profileSlice";
import { setProgress } from "../../toolkit/slices/authSlice";
import { FileBase64 } from "../helpers/base64";
import LoadingBar from "react-top-loading-bar";

const Profile = () => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile);
  const { progress } = useSelector((state) => state.auth);
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    firstName: "",
    lastName: "",
  });
  const { image, firstName, lastName } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(setProgress(40));
      dispatch(
        userUpdate({
          image: image ? image : profileData.image,
          firstName: firstName ? firstName : profileData.firstName,
          lastName: lastName ? lastName : profileData.lastName,
        })
      );
      dispatch(setProgress(100));
      setProfileUpdated(true);

      setFormData((prev) => {
        return {
          ...prev,
          firstName: "",
          lastName: "",
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(userInfo());
  }, [dispatch, profileUpdated]);

  return (
    <>
      <LoadingBar
        color="#0061ff"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <div className="container">
        <h2 className="font-semibold text-3xl">Profile</h2>
        <form
          className="pb-4 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col w-full items-center">
            <div className="text-2xl font-semibold">
              {profileData?.firstName || formData.firstName} {profileData?.lastName || formData.lastName}
            </div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              ({profileData?.role})
            </label>
            <div className="mt-2 flex items-center flex-col">
              <div className="rounded-full h-20 w-20 md:h-32 md:w-32 object-contain">
                {formData.image || profileData?.image ? (
                  <img
                    src={formData.image || profileData?.image}
                    className="rounded-full"
                    loading="lazy"
                    alt=".."
                  />
                ) : (
                  <BiUserCircle
                    className="h-full w-full text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload Photo</span>
                  <FileBase64
                    onDone={({ base64 }) =>
                      setFormData({ ...formData, image: base64 })
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12 w-[50vw]">
            <div className="mt-10 grid md:grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    value={formData.firstName}
                    onChange={handleChange}
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.lastName}
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full flex items-center justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
