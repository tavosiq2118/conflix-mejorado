/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import IconButton from "../components/UI/IconButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// motion variant
const pageVariants = {
  hidden: { scale: 1.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const BrowseHome = ({
  setAccountClick,
  setEditClick,
  setAddProfile,
  setAccountLoader,
}) => {
  const { data } = useSelector((state) => state.account);

  // ✅ perfil demo si no hay datos reales
  const userData = data?.subProfile
    ? data
    : {
        _id: "demo123",
        subProfile: [
          {
            id: "1",
            name: "Demo User",
            img: "https://i.imgur.com/e1hLQ2F.png", // avatar cualquiera
          },
        ],
      };

  let count = userData.subProfile.length;

  return (
    <div className="absolute z-[90] flex justify-center item-center w-full h-[100vh] bg-[rgb(10,10,10)] text-white overflow-hidden">
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="flex m-auto flex-col justify-center"
      >
        <p className="text-[2.2em] xl:text-[3em] text-center">Who&apos;s watching?</p>

        <div className="flex gap-2 md:gap-4 xl:gap-8 p-4 px-6 flex-wrap justify-center items-center text-[rgb(120,120,120)]">
          {userData.subProfile.map((item) => {
            if (userData.subProfile.length >= 6 && item.name === "Add Profile") return;
            count--;
            return (
              <IconButton
                key={userData.subProfile[count].id}
                name={userData.subProfile[count].name}
                src={userData.subProfile[count].img}
                edit={false}
                profile={{ ...userData.subProfile[count], userID: userData._id }}
                setAccountClick={setAccountClick}
                setEditClick={setEditClick}
                setAddProfile={setAddProfile}
                setAccountLoader={setAccountLoader}
              />
            );
          })}
        </div>

        <Link
          to="/ManageProfiles"
          className="border border-[rgb(120,120,120)] p-2 w-fit m-auto px-6 mt-6 text-sm text-[rgb(120,120,120)]"
        >
          Manage Profiles
        </Link>
      </motion.div>
    </div>
  );
};

export default BrowseHome;
