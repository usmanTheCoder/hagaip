import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setToken, verifyEmail } from "../../toolkit/slices/authSlice";

const Activated = () => {
  const dispatch = useDispatch();
  const { activation_token } = useParams();
  
  useEffect(() => {
    if (activation_token) {
      dispatch(setToken(activation_token))
      dispatch(verifyEmail(activation_token));
    }
  }, []);

  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">
          Your email is verified!
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Sign in to your account now
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Activated;
