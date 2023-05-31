import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { AiTwotoneAppstore } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { AiOutlineForm } from "react-icons/ai";
import { SiMaterialdesignicons } from "react-icons/si";
import { MdPersonalVideo } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../toolkit/slices/authSlice";

const Sidebar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [isOpen, setIsOpen] = useState(isMobile ? false : true);
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile);

  const handleLogout = () => {
    try {
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

  const variants = isMobile
    ? {
        open: {
          x: 0,
          width: "200px",
          transition: {
            damping: 40,
          },
        },
        close: {
          x: -250,
          width: "0",
          transition: {
            damping: 40,
          },
        },
      }
    : {
        open: {
          width: "200px",
          transition: {
            damping: 40,
          },
        },
        close: {
          width: "0",
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isMobile]);

  return (
    <>
      {isMobile && (
        <>
          <div
            onClick={() => setIsOpen(false)}
            className={`h-screen bg-gray-500 opacity-40 ${
              isOpen ? "block" : "hidden"
            } z-[998] w-full fixed`}
          ></div>
          <div className="fixed p-3">
            <AiOutlineMenu onClick={() => setIsOpen(true)} size={25} />
          </div>
        </>
      )}
      <motion.div
        variants={variants}
        animate={isOpen ? "open" : "close"}
        initial={{ x: isMobile ? -250 : 0 }}
        className="bg-white w-[200px] shadow-md h-screen block z-[999] overflow-hidden fixed top-0 left-0"
      >
        <div className="h-full">
          <div className="p-3 border-b-2 border-b-gray-300 w-44 mx-auto">
            <Logo size={10} />
          </div>
          <ul className="flex flex-col max-h-max w-[11rem] gap-2 m-4">
            <li>
              <NavLink to="." end className="link">
                <AiTwotoneAppstore />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="profile" className="link">
                <CgProfile />
                Profile
              </NavLink>
            </li>
            {profileData.role === "admin" && (
              <li>
                <NavLink to="create_user" className="link">
                  <AiOutlineForm />
                  Create User
                </NavLink>
              </li>
            )}
            {profileData.role !== "admin" && (
              <>
                <li>
                  <NavLink to="form" className="link">
                    <AiOutlineForm />
                    Create Form
                  </NavLink>
                </li>
                <li>
                  <NavLink to="design" className="link">
                    <SiMaterialdesignicons />
                    Design
                  </NavLink>
                </li>
                <li>
                  <NavLink to="personal" className="link">
                    <MdPersonalVideo />
                    Personal
                  </NavLink>
                </li>
                <li>
                  <NavLink to="lekium" className="link">
                    <FaWpforms />
                    Lekium
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <button
            onClick={handleLogout}
            className=" m-3 link absolute bottom-10"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
