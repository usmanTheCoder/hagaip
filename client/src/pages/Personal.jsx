import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../toolkit/slices/authSlice";
import {
  getPersonalData,
  submitPersonal,
} from "../../toolkit/slices/personalSlice";
import LoadingBar from "react-top-loading-bar";
import { alertNotification } from "../components/alertNotification";

const Personal = () => {
  const dispatch = useDispatch();
  const { progress } = useSelector((state) => state.auth);
  const { personalData, personalMsg } = useSelector((state) => state.personal);
  const [formData, setFormData] = useState({
    aboutMe: "",
    equipment: "",
    declare: "",
    additionalInfo: "",
  });
  const { aboutMe, equipment, declare, additionalInfo } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(setProgress(40));
      dispatch(
        submitPersonal({
          aboutMe: aboutMe ? aboutMe : personalData.aboutMe,
          equipment: equipment ? equipment : personalData.equipment,
          declare: declare ? declare : personalData.declare,
          additionalInfo: additionalInfo
            ? additionalInfo
            : personalData.additionalInfo,
        })
      );
      dispatch(setProgress(100));
      setFormData({
        aboutMe: "",
        equipment: "",
        declare: "",
        additionalInfo: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(getPersonalData());
  }, [dispatch]);

  return (
    <>
      <LoadingBar
        color="#0061ff"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />

      <div className="container">
        <h2 className="font-semibold text-3xl">Personal</h2>
        <form
          className="pb-4 md:flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {personalMsg?.length > 0 && alertNotification(personalMsg, "green")}
          <div className="border-b border-gray-900/10 pb-12 w-[80vw] lg:w-full">
            <div className="mt-10 grid md:grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="aboutMe"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About me
                </label>
                <div className="mt-2">
                  <textarea
                    value={formData.aboutMe}
                    onChange={handleChange}
                    name="aboutMe"
                    id="aboutMe"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="equipment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Equipment
                </label>
                <div className="mt-2">
                  <textarea
                    value={formData.equipment}
                    onChange={handleChange}
                    name="equipment"
                    id="equipment"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="declare"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Declare
                </label>
                <div className="mt-2">
                  <textarea
                    value={formData.declare}
                    onChange={handleChange}
                    id="declare"
                    name="declare"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="additionalInfo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Additional Information
                </label>
                <div className="mt-2">
                  <textarea
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    id="additionalInfo"
                    name="additionalInfo"
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

export default Personal;
