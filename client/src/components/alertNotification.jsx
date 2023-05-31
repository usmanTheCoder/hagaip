export const alertNotification = (message, color) => {
  return (
    <>
      <div
        className={`border-l-4 mb-4 ${color === "orange" && "border-orange-500 text-orange-700 bg-orange-100 "} ${color === "green" && "border-green-500 text-green-700 bg-green-100 "} p-4 transition-all duration-75`}
        // role="alert"
      >
        <p className="font-bold">Alert!</p>
        <p>{message}</p>
      </div>
    </>
  );
};
