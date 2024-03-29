import React, { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { AiOutlineMenu } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Avater from "./Avater";
import HostModal from "../../Modal/HostModal";
import { becomeHost } from "../../../api/auth";
import toast from "react-hot-toast";

const MenuDropDown = () => {
  const { user, logOut, loading, role, setRole } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const signOut = () => {
    logOut().then().catch();
  };
  // for modal
  const modalHandler = (email) => {
    becomeHost(email).then((data) => {
      console.log(data);

      alert("You are host now, You can Post Rooms");
      setRole("host");
      closeModal();
    });
  };
  const closeModal = () => {
    setModal(false);
  };
  if (loading) {
    return null; // You can render a loading spinner or placeholder here
  }
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div className="hidden md:block text-sm font-semibold py-3 px-8 rounded-full  transition ">
          {!role && (
            <button
              className="cursor-pointer hover:bg-neutral-100"
              onClick={() => setModal(true)}
              disabled={!user}
            >
              {" "}
              AirCnc your home
            </button>
          )}
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu></AiOutlineMenu>
          <div className="hidden md:block">
            <Avater></Avater>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <Link
              to="/"
              className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            >
              Home
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  DashBoard
                </Link>

                <div
                  onClick={() => {
                    setRole(null);
                    signOut();
                  }}
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                >
                  LogOut
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      {user && (
        <HostModal
          closeModal={closeModal}
          email={user.email}
          modalHandler={modalHandler}
          isOpen={modal}
        />
      )}
      {/* <HostModal
        closeModal={closeModal}
        email={user.email}
        modalHandler={modalHandler}
        isOpen={modal}
      ></HostModal> */}
    </div>
  );
};

export default MenuDropDown;
