import React, { useRef } from "react";
import { useSelector } from "react-redux";

const Form = ({reference}) => {
  const { personalData, userPersonalData } = useSelector(
    (state) => state.personal
  );
  const { designData, userDesignData } = useSelector((state) => state.design);
  const { singleForm } = useSelector((state) => state.form);

  return (
    <div className="">
      <div
        ref={reference}
        className="flex items-center justify-center bg-gray-400"
      >
        <div className="bg-white w-[95%] p-8">
          <div className="text-center mb-4">
            <h1 className="text-3xl font-semibold">User Form</h1>
          </div>
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl">Information</h2>
              <p className="text-xl">
                Name: {`${singleForm?.firstName} ${singleForm?.lastName}`}
              </p>
              <p className="text-xl">Email: {singleForm?.email}</p>
              <p className="text-xl">Phone: {singleForm?.mobileNo}</p>
              <p className="text-xl">Type of form: {singleForm?.typeOfForm}</p>
            </div>
            <div className="w-60 h-60 rounded-md object-contain">
              <img src={singleForm?.image} className="rounded-md" alt="" />
            </div>
          </div>
          <div>
            <table id="customers" className="border-collapse w-full my-5">
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Type of test:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.typeOfTest}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Property type:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.propertyType}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Type of construction:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.typeOfConstruction}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Number of rooms:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.numberOfRooms}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Property description:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.propertyDescription}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Type of flooring:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.typeOfFlooring}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Exterior cladding:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.exteriorCladding}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Interior coverings
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.interiorCoverings}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Area:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.area}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Chapter name:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.chapterName}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Sub-Chapter name:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.subChapterName}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Reference:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.reference}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Recommendation:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.recommendation}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Price:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.price}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Unit:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.unit}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Amount:
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.amount}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    Total
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: 8 }}>
                    {singleForm?.total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="pt-10">
            <h1 className="text-center text-3xl font-semibold">
              {userDesignData?.topHeading || designData?.topHeading}
            </h1>
            {(userDesignData?.image?.length > 0 ||
              designData?.image?.length > 0) && (
                <div className="flex object-contain items-center text-center justify-center p-4 w-full">
                  <img
                    src={userDesignData?.image || designData?.image}
                    className="h-96 w-96 rounded-md"
                    alt=""
                  />
                </div>
              )}
            <p className="text-center">
              {userDesignData?.description || designData?.description}
            </p>
            <h1 className="text-center text-3xl font-semibold border-b-2 border-gray-400 p-2">
              {userDesignData?.bottomHeading || designData?.bottomHeading}
            </h1>
            <div className="my-4 flex flex-col gap-4">
              {(userPersonalData?.aboutMe ||
                personalData?.aboutMe) && (
                  <div>
                    <h3 className="text-center text-3xl font-semibold">
                      About me
                    </h3>
                    <p className="text-center">
                      {userPersonalData?.aboutMe || personalData?.aboutMe}
                    </p>
                  </div>
                )}
              {(userPersonalData?.equipment ||
                personalData?.equipment) && (
                  <div>
                    <h3 className="text-center text-3xl font-semibold">
                      The Equipment
                    </h3>
                    <p className="text-center">
                      {userPersonalData?.equipment || personalData?.equipment}
                    </p>
                  </div>
                )}
              {(userPersonalData?.declare ||
                personalData?.declare )&& (
                  <div>
                    <h3 className="text-center text-3xl font-semibold">
                      Declare
                    </h3>
                    <p className="text-center">
                      {userPersonalData?.declare || personalData?.declare}
                    </p>
                  </div>
                )}
              {(userPersonalData?.additionalInfo ||
                personalData?.additionalInfo) && (
                  <div>
                    <h3 className="text-center text-3xl font-semibold">
                      Additional Information
                    </h3>
                    <p className="text-center">
                      {userPersonalData?.additionalInfo ||
                        personalData?.additionalInfo}
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
