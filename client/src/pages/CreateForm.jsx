import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AsyncCreatableSelect from "react-select/async-creatable";
import ImageEditor from "../components/ImageEditor";
import { useDispatch, useSelector } from "react-redux";
import { FileBase64 } from "../helpers/base64";
import { FiCamera } from "react-icons/fi";
import { setProgress } from "../../toolkit/slices/authSlice";
import {
  getChapsData,
  getSubChapsData,
  setLekiumImg,
} from "../../toolkit/slices/lekiumSlice";
import { setFormMsg, submitForm } from "../../toolkit/slices/formSlice";
import LoadingBar from "react-top-loading-bar";
import { alertNotification } from "../components/alertNotification";
import Webcam from "react-webcam";

const CreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const { chaps, subChaps, lekiumImg } = useSelector((state) => state.lekium);
  const { progress } = useSelector((state) => state.auth);
  const { formMsg } = useSelector((state) => state.form);
  const [checkSholam, setCheckSholam] = useState(true);
  const [checkLooSholam, setCheckLooSholam] = useState(false);
  const [subChapsData, setSubChapsData] = useState([]);
  const [chapsImg, setChapsImg] = useState("");
  const refPropertyDescription = useRef();
  const refReference = useRef();
  const refRecommendation = useRef();
  const refPrice = useRef();
  const refUnit = useRef();
  const refAmount = useRef();
  const refTotal = useRef();
  const webCamRef = useRef();
  const [camera, setCamera] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    selectOptions: "sholam",
    date: startDate,
    typeOfForm: "",
    typeOfTest: "",
    propertyType: "",
    typeOfConstruction: "",
    numberOfRooms: "",
    propertyDescription: "",
    typeOfFlooring: "",
    exteriorCladding: "",
    interiorCoverings: "",
    area: "",
    chapterName: "",
    subChapterName: "",
    reference: "",
    recommendation: "",
    image: "",
    price: "",
    unit: "",
    amount: "",
    total: "",
  });

  const openImgEditor = (e) => {
    e.preventDefault();
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  useEffect(() => {
    dispatch(getChapsData());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.firstName === "" ||
      formData.lastName === "" ||
      formData.email === "" ||
      formData.mobileNo === "" ||
      formData.selectOptions === "" ||
      formData.typeOfForm === "" ||
      formData.typeOfTest === "" ||
      formData.propertyType === "" ||
      formData.typeOfConstruction === "" ||
      formData.numberOfRooms === "" ||
      formData.propertyDescription === "" ||
      formData.typeOfFlooring === "" ||
      formData.exteriorCladding === "" ||
      formData.interiorCoverings === ""
    ) {
      dispatch(setFormMsg("Please fill in all the fields!"));
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch(setFormMsg(""));
      }, 5000);
      return;
    }
    dispatch(setProgress(40));
    dispatch(submitForm(formData));
    dispatch(setLekiumImg(""));
    dispatch(setProgress(100));
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      selectOptions: "",
      typeOfForm: "",
      typeOfTest: "",
      propertyType: "",
      typeOfConstruction: "",
      numberOfRooms: "",
      propertyDescription: "",
      typeOfFlooring: "",
      exteriorCladding: "",
      interiorCoverings: "",
      area: "",
      chapterName: "",
      subChapterName: "",
      reference: "",
      recommendation: "",
      image: "",
      price: "",
      unit: "",
      amount: "",
      total: "",
    });
    dispatch(setFormMsg(""));
    navigate("/dashboard");
  };

  const filterTypeOfForm = (inputValue) => {
    let tempArr = [];

    chaps?.map((item) => {
      if (item.typeOfForm === undefined) {
        return;
      }
      return tempArr.push({
        value: item.typeOfForm,
        label: item.typeOfForm,
      });
    });
    return tempArr?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptionsTypeOfForm = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterTypeOfForm(inputValue));
      }, 1000);
    });

  const selectedTypeOfForm = (option) => {
    setFormData({ ...formData, typeOfForm: option?.value });
  };

  const filterChapterName = (inputValue) => {
    let tempArr = [];

    chaps?.map((item) => {
      if (item.chapterName === undefined) {
        return;
      }
      return tempArr.push({
        value: item.chapterName,
        label: item.chapterName,
      });
    });
    return tempArr?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptionsChapterName = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterChapterName(inputValue));
      }, 1000);
    });

  const selectedChapterName = (option) => {
    chaps.forEach(
      (item) => item.chapterName === option.value && setChapsImg(item.image)
    );
    setFormData({ ...formData, chapterName: option?.value });
  };
  useEffect(() => {
    dispatch(getSubChapsData(formData.chapterName));
  }, [dispatch, formData.chapterName]);

  const filterSubChapterName = (inputValue) => {
    let tempArr = [];
    subChaps?.map((item) => {
      if (item.subChapterName === undefined) {
        return;
      }
      return tempArr.push({
        value: item.subChapterName,
        label: item.subChapterName,
      });
    });
    return tempArr?.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptionsSubChapterName = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterSubChapterName(inputValue));
      }, 2000);
    });

  const selectedSubChapterName = (option) => {
    if (subChaps?.length > 0) {
      if (
        subChaps?.map((item) => item.subChapterName).includes(option?.value)
      ) {
        const subChapters = subChaps.filter(
          (item) => item.subChapterName === option?.value
        );
        setSubChapsData(subChapters);
      }
    }
    setFormData({ ...formData, subChapterName: option?.value });
  };

  const handleChecked = (e) => {
    setCheckSholam(!checkSholam);
    setCheckLooSholam(!checkLooSholam);
    if (checkSholam && !checkLooSholam) {
      setFormData({ ...formData, selectOptions: e.target.value });
      return;
    } else if (checkLooSholam && !checkSholam) {
      setFormData({ ...formData, selectOptions: e.target.value });
      return;
    } else {
      return;
    }
  };

  const takeScreenShot = () => {
    setFormData({ ...formData, image: webCamRef.current.getScreenshot() });
    setCamera(!camera);
  };

  const openCamera = () => {
    return (
      <>
        <div className="card text-center mt-2">
          <div className="card-body d-flex flex-column">
            <Webcam
              className="block md:hidden w-full"
              screenshotFormat="image/jpeg"
              ref={webCamRef}
            />
            <button type="button" className="" onClick={takeScreenShot}>
              <FiCamera size={30} />
            </button>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    setFormData({
      ...formData,
      propertyDescription: refPropertyDescription.current?.value,
      reference: refReference.current?.value,
      recommendation: refRecommendation.current?.value,
      price: refPrice.current?.value,
      unit: refUnit.current?.value,
      amount: refAmount.current?.value,
      total: refTotal.current?.value,
    });
  }, [subChapsData.length > 0, formData.chapterName]);

  useEffect(() => {
    setFormData({ ...formData, image: lekiumImg });
  }, [lekiumImg]);

  useEffect(() => {
    setFormData({ ...formData, image: chapsImg });
  }, [chapsImg]);

  return (
    <>
      <LoadingBar
        color="#0061ff"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <div className="container">
        <h2 className="font-semibold text-3xl">Create Form</h2>
        <form className="pb-4 w-[90%] md:w-full md:flex flex-col items-center justify-center" onSubmit={handleSubmit}>
          {formMsg?.length > 0 && alertNotification(formMsg, "green")}
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 mt-4 text-gray-900">
                Personal Information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.firstName}
                      onChange={handleChange}
                      type="text"
                      name="firstName"
                      id="firstName"
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.lastName}
                      onChange={handleChange}
                      type="text"
                      name="lastName"
                      id="lastName"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.email}
                      onChange={handleChange}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date
                  </label>
                  <div className="mt-2">
                    <DatePicker
                      selected={startDate}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(date) => setStartDate(date)}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile No.
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.mobileNo}
                      onChange={handleChange}
                      id="number"
                      name="mobileNo"
                      type="phone"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <fieldset className="whitespace-nowrap">
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Select Options
                  </legend>
                  <div className="mt-4 flex gap-5">
                    <div className="flex items-center gap-x-1">
                      <input
                        id="sholam"
                        name="sholam"
                        onChange={handleChecked}
                        checked={checkSholam}
                        value="sholam"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="sholam"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Sholam
                      </label>
                    </div>
                    <div className="flex items-center gap-x-1">
                      <input
                        id="looSholam"
                        name="looSholam"
                        onChange={handleChecked}
                        checked={checkLooSholam}
                        value="loo sholam"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="looSholam"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Loo Sholam
                      </label>
                    </div>
                  </div>
                </fieldset>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Type of form
                  </label>
                  <div className="mt-2">
                    <AsyncCreatableSelect
                      loadOptions={promiseOptionsTypeOfForm}
                      allowCreateWhileLoading
                      cacheOptions
                      defaultOptions
                      onChange={selectedTypeOfForm}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Al Nehes
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="typeOfTest"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Type of test
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.typeOfTest}
                      onChange={handleChange}
                      id="typeOfTest"
                      name="typeOfTest"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="propertyType"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Property type
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.propertyType}
                      onChange={handleChange}
                      id="propertyType"
                      name="propertyType"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="constructionType"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Construction type
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.typeOfConstruction}
                      onChange={handleChange}
                      id="constructionType"
                      name="typeOfConstruction"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="numberOfRooms"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Number of rooms
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.numberOfRooms}
                      onChange={handleChange}
                      id="numberOfRooms"
                      name="numberOfRooms"
                      type="number"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="col-span-full mt-4">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Construction Characteristics
                  </h2>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="typeOfFlooring"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Type of flooring
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.typeOfFlooring}
                      onChange={handleChange}
                      id="typeOfFlooring"
                      name="typeOfFlooring"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="exteriorCladding"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Exterior Cladding
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.exteriorCladding}
                      onChange={handleChange}
                      id="exteriorCladding"
                      name="exteriorCladding"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="interiorCoverings"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Interior Coverings
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.interiorCoverings}
                      onChange={handleChange}
                      id="interiorCoverings"
                      name="interiorCoverings"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Area
                  </label>
                  <div className="mt-2">
                    <input
                      value={formData.area}
                      onChange={handleChange}
                      id="area"
                      name="area"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="chapterName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Chapter name
                  </label>
                  <div className="mt-2">
                    <AsyncCreatableSelect
                      loadOptions={promiseOptionsChapterName}
                      cacheOptions
                      allowCreateWhileLoading
                      defaultOptions
                      onChange={selectedChapterName}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="subChapterName"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Sub-Chapter name
                  </label>
                  <div className="mt-2">
                    <AsyncCreatableSelect
                      loadOptions={promiseOptionsSubChapterName}
                      cacheOptions
                      defaultOptions
                      allowCreateWhileLoading
                      onChange={selectedSubChapterName}
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="propertyDescription"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Property description
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={
                        subChapsData?.length > 0
                          ? subChapsData?.[0].propertyDescription
                          : formData.propertyDescription
                      }
                      onChange={handleChange}
                      ref={refPropertyDescription}
                      id="propertyDescription"
                      name="propertyDescription"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="reference"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Reference
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={
                        subChapsData?.length > 0
                          ? subChapsData?.[0].reference
                          : formData.reference
                      }
                      onChange={handleChange}
                      ref={refReference}
                      id="reference"
                      name="reference"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="recommendation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Recommendation
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={
                        subChapsData?.length > 0
                          ? subChapsData?.[0].recommendation
                          : formData.recommendation
                      }
                      onChange={handleChange}
                      ref={refRecommendation}
                      id="recommendation"
                      name="recommendation"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Price
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={
                        subChapsData?.length > 0
                          ? subChapsData?.[0].price
                          : formData.price
                      }
                      onChange={handleChange}
                      ref={refPrice}
                      id="price"
                      name="price"
                      type="number"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="unit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Unit
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={
                        subChapsData?.length > 0
                          ? subChapsData?.[0].unit
                          : formData.unit
                      }
                      onChange={handleChange}
                      ref={refUnit}
                      id="unit"
                      name="unit"
                      type="text"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Amount
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={
                        subChapsData?.length > 0
                          ? subChapsData?.[0].amount
                          : formData.amount
                      }
                      onChange={handleChange}
                      ref={refAmount}
                      id="amount"
                      name="amount"
                      type="number"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="constructionType"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Total
                  </label>
                  <div className="mt-2">
                    <input
                      defaultValue={
                        subChapsData?.length > 0
                          ? subChapsData?.[0].total
                          : formData.total
                      }
                      onChange={handleChange}
                      ref={refTotal}
                      id="total"
                      name="total"
                      type="number"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full mt-2">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Upload Image
                </label>
                <div className="flex justify-between items-center">
                  {!camera && (
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload</span>
                        <FileBase64
                          onDone={({ base64 }) =>
                            setFormData({ ...formData, image: base64 })
                          }
                        />
                      </label>
                    </div>
                  )}
                  <div className="block md:hidden">
                    <button
                      type="button"
                      onClick={() => setCamera(!camera)}
                      className="mt-4 cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 p-1.5"
                    >
                      {camera ? "Cancle" : "Capture"}
                    </button>
                  </div>
                </div>
                {formData.image !== "" && (
                  <div className="h-20 cursor-pointer object-contain w-20 border-2 my-4 border-gray-400">
                    <img
                      onClick={openImgEditor}
                      loading="lazy"
                      src={formData.image}
                      alt=""
                    />
                  </div>
                )}
                {camera && openCamera()}
                <ImageEditor
                  isImgEditorShown={isImgEditorShown}
                  closeImgEditor={closeImgEditor}
                  src={subChapsData?.[0]?.image || formData.image}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateForm;
