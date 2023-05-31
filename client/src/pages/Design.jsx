import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../toolkit/slices/authSlice";
import { FileBase64 } from "../helpers/base64";
import { createDesign, setDesignMsg } from "../../toolkit/slices/designSlice";
import LoadingBar from "react-top-loading-bar";
import { alertNotification } from "../components/alertNotification";

const Design = () => {
  const dispatch = useDispatch();
  const { progress } = useSelector((state) => state.auth);
  const { designMsg, designData } = useSelector((state) => state.design);
  const [formData, setFormData] = useState({
    topHeading: "",
    description: "",
    bottomHeading: "",
    image: "",
  });
  const { topHeading, description, bottomHeading, image } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(setProgress(40));
      dispatch(
        createDesign({
          topHeading: topHeading ? topHeading : designData.topHeading,
          description: description ? description : designData.description,
          bottomHeading: bottomHeading
            ? bottomHeading
            : designData.bottomHeading,
          image: image ? image : designData?.image,
        })
      );
      dispatch(setProgress(100));
      setTimeout(() => {
        dispatch(setDesignMsg(""));
      }, 4000);
      setFormData({
        topHeading: "",
        description: "",
        bottomHeading: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <LoadingBar
        color="#0061ff"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />

      <div className="container">
        <h2 className="font-semibold text-3xl">Design</h2>
        <form
          className="pb-4 md:flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {designMsg?.length > 0 && alertNotification(designMsg, "green")}
          <div className="border-b border-gray-900/10 pb-12 w-[80vw] lg:w-full">
            <div className="mt-10 grid md:grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="topHeading"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Top heading
                </label>
                <div className="mt-2">
                  <input
                    value={formData.topHeading}
                    onChange={handleChange}
                    type="text"
                    name="topHeading"
                    id="topHeading"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    value={formData.description}
                    onChange={handleChange}
                    name="description"
                    id="description"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="bottomHeading"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Bottom heading
                </label>
                <div className="mt-2">
                  <input
                    value={formData.bottomHeading}
                    onChange={handleChange}
                    id="bottomHeading"
                    name="bottomHeading"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-full w-full mt-4">
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload Image</span>
                  <FileBase64
                    onDone={({ base64 }) =>
                      setFormData({ ...formData, image: base64 })
                    }
                  />
                </label>
              </div>
            </div>
            {formData.image && (
              <>
                <div className="h-20 cursor-pointer object-contain w-20 border-2 my-4 border-gray-400">
                  <img loading="lazy" src={formData.image} alt="" />
                </div>
              </>
            )}
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

export default Design;
