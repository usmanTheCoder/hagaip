import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageEditor from "../components/ImageEditor";
import {
  createLekium,
  getChapsData,
  setLekiumImg,
  setLekiumMsg,
} from "../../toolkit/slices/lekiumSlice";
import { setProgress } from "../../toolkit/slices/authSlice";
import { alertNotification } from "../components/alertNotification";
import LoadingBar from "react-top-loading-bar";
import { FileBase64 } from "../helpers/base64";

const Lekium = () => {
  const dispatch = useDispatch();
  const { lekiumMsg, chaps, lekiumImg } = useSelector((state) => state.lekium);
  const { progress } = useSelector((state) => state.auth);
  const [openSubChapter, setOpenSubChapter] = useState(false);
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [chapters, setChapters] = useState({
    typeOfForm: "",
    chapterName: "",
    subChapters: [],
    image: "",
  });
  const [subChapters, setSubChapters] = useState({
    propertyDescription: "",
    reference: "",
    recommendation: "",
    subChapterName: "",
    price: "",
    unit: "",
    amount: "",
    total: "",
  });

  useEffect(() => {
    dispatch(getChapsData());
  }, [dispatch]);

  const handleChaptersChange = (e) => {
    setChapters({ ...chapters, [e.target.name]: e.target.value });
  };

  const handleSubChaptersChange = (e) => {
    setDisabled(false);
    setSubChapters({ ...subChapters, [e.target.name]: e.target.value });
  };

  useEffect(()=> {
    setChapters({...chapters, image: lekiumImg})
  },[lekiumImg])

  useEffect(() => {
    if (
      subChapters.propertyDescription === "" ||
      subChapters.reference === "" ||
      subChapters.recommendation === "" ||
      subChapters.subChapterName === "" ||
      subChapters.price == "" ||
      subChapters.unit === "" ||
      subChapters.amount == "" ||
      subChapters.total == ""
    ) {
      setDisabled(true);
    }
  }, [disabled, subChapters]);

  const handleSubChapterSubmit = () => {
    if (
      chapters.subChapters
        ?.map((item) => item?.subChapterName)
        .includes(subChapters.subChapterName)
    ) {
      dispatch(setLekiumMsg("Sub-Chapter already exists!"));
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch(setLekiumMsg(""));
      }, 4000);
      return;
    }
    dispatch(setProgress(40));
    chapters?.subChapters?.push(subChapters);
    dispatch(setLekiumMsg("Sub-Chapters added successfully!"));
    setTimeout(() => {
      dispatch(setLekiumMsg(""));
    }, 4000);
    dispatch(setProgress(100));
    setSubChapters({
      propertyDescription: "",
      reference: "",
      recommendation: "",
      subChapterName: "",
      price: "",
      unit: "",
      amount: "",
      total: "",
    });
    window.scrollTo(0, 0);
  };

  const handleChapterSubmit = (e) => {
    e.preventDefault();
    try {
      if (chapters.typeOfForm === "" || chapters.chapterName === "") {
        dispatch(setLekiumMsg("Fill in all the fields!"));
        window.scrollTo(0, 0);
        setTimeout(() => {
          dispatch(setLekiumMsg(""));
        }, 5000);
        return;
      }
      if (chaps.map((item) => item.typeOfForm).includes(chapters.typeOfForm)) {
        dispatch(setLekiumMsg("Type of form already exists!"));
        window.scrollTo(0, 0);
        setTimeout(() => {
          dispatch(setLekiumMsg(""));
        }, 5000);
        return;
      }
      if (
        chaps.map((item) => item.chapterName).includes(chapters.chapterName)
      ) {
        dispatch(setLekiumMsg("Chapter name already exists!"));
        window.scrollTo(0, 0);
        setTimeout(() => {
          dispatch(setLekiumMsg(""));
        }, 5000);
        return;
      }
      dispatch(setProgress(40));
      dispatch(createLekium(chapters));
      setTimeout(() => {
        dispatch(setLekiumMsg(""));
      }, 5000);
      window.scrollTo(0, 0);
      dispatch(setProgress(100));
      setIsImgEditorShown(false)
      dispatch(setLekiumImg(""))
      setChapters({
        typeOfForm: "",
        chapterName: "",
        subChapters: [],
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openImgEditor = (e) => {
    e.preventDefault();
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  const handleToggle = () => {
    setOpenSubChapter(true);
  };

  return (
    <>
      <LoadingBar
        color="#0061ff"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <div className="container">
        <h2 className="font-semibold text-3xl">Lekium</h2>
        <form
          className="pb-4 w-[90%] md:w-full md:flex flex-col items-center justify-center"
          onSubmit={handleChapterSubmit}
        >
          {lekiumMsg?.length > 0 && alertNotification(lekiumMsg, "green")}
          <div className="border-b flex flex-col border-gray-900/10 pb-12 items-center justify-center w-full">
            <div className="mt-10 w-full grid md:grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="typeOfForm"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Type of Form
                </label>
                <div className="mt-2">
                  <input
                    value={chapters.typeOfForm}
                    onChange={handleChaptersChange}
                    type="text"
                    name="typeOfForm"
                    id="typeOfForm"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="chapterName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Chapter Name
                </label>
                <div className="mt-2">
                  <input
                    value={chapters.chapterName}
                    onChange={handleChaptersChange}
                    type="text"
                    name="chapterName"
                    id="chapterName"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="mt-10 grid w-full md:grid-cols-2 gap-x-6 md:gap-y-8 grid-cols-8">
              <div className="flex w-full justify-start items-center col-span-full">
                <button
                  onClick={handleToggle}
                  disabled={openSubChapter ? true : false}
                  className="rounded-md disabled:bg-indigo-400 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Sub-Chapter
                </button>
              </div>
              {openSubChapter && (
                <>
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor="subChapterName"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Sub-Chapter Name
                    </label>
                    <div className="mt-2">
                      <input
                        value={subChapters.subChapterName}
                        onChange={handleSubChaptersChange}
                        type="text"
                        name="subChapterName"
                        id="subChapterName"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor="propertyDescription"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Property Description
                    </label>
                    <div className="mt-2">
                      <input
                        value={subChapters.propertyDescription}
                        onChange={handleSubChaptersChange}
                        type="text"
                        name="propertyDescription"
                        id="propertyDescription"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor="reference"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Reference
                    </label>
                    <div className="mt-2">
                      <input
                        value={subChapters.reference}
                        onChange={handleSubChaptersChange}
                        type="text"
                        name="reference"
                        id="reference"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor="recommendation"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Recommendation
                    </label>
                    <div className="mt-2">
                      <input
                        value={subChapters.recommendation}
                        onChange={handleSubChaptersChange}
                        type="text"
                        name="recommendation"
                        id="recommendation"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        value={subChapters.price}
                        onChange={handleSubChaptersChange}
                        type="number"
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor="unit"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Unit
                    </label>
                    <div className="mt-2">
                      <input
                        value={subChapters.unit}
                        onChange={handleSubChaptersChange}
                        type="text"
                        name="unit"
                        id="unit"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor="amount"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Amount
                    </label>
                    <div className="mt-2">
                      <input
                        value={subChapters.amount}
                        onChange={handleSubChaptersChange}
                        type="number"
                        name="amount"
                        id="amount"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full md:col-span-1">
                    <label
                      htmlFor="total"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Total
                    </label>
                    <div className="mt-2">
                      <input
                        value={subChapters.total}
                        onChange={handleSubChaptersChange}
                        type="number"
                        name="total"
                        id="total"
                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="mt-6 w-full flex items-center justify-end col-span-full">
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={handleSubChapterSubmit}
                      className="rounded-md disabled:bg-indigo-400 hover:disabled:bg-indigo-400 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Sub-Chapter
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-span-full w-full mt-4">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Upload Images
            </label>
            <div className="">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload</span>
                    <FileBase64
                      onDone={({ base64 }) =>
                        setChapters({ ...chapters, image: base64 })
                      }
                    />
                  </label>
                </div>
              </div>
              {
                chapters.image && 

                <div
                onClick={openImgEditor}
                className="h-20 cursor-pointer object-contain w-20 border-2 my-4 border-gray-400"
                >
                <img loading="lazy" src={lekiumImg? lekiumImg : chapters.image} alt="" />
              </div>

              }
              <div>
                <ImageEditor
                  isImgEditorShown={isImgEditorShown}
                  closeImgEditor={closeImgEditor}
                  src={chapters.image}
                />
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

export default Lekium;
