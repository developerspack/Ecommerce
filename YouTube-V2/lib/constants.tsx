import {
  AiFillLike,
  AiFillPlaySquare,
  AiOutlineLike,
  AiOutlinePlaySquare,
} from "react-icons/ai";
import {
  MdLocalFireDepartment,
  MdHomeFilled,
  MdOutlineSubscriptions,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdVideoLibrary,
  MdOutlineWatchLater,
  MdWatchLater,
  MdOutlinePlaylistPlay,
  MdOutlineOutlinedFlag,
  MdFeedback,
} from "react-icons/md";
import { VscHistory } from "react-icons/vsc";
import { CgPlayList } from "react-icons/cg";
import { RiFeedbackLine, RiFlagFill } from "react-icons/ri";
import { FiSettings, FiHelpCircle, FiHome } from "react-icons/fi";
import { FaHistory, FaTrophy } from "react-icons/fa";
import {
  IoMusicalNoteOutline,
  IoMusicalNoteSharp,
  IoSettingsSharp,
} from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import { BsFire } from "react-icons/bs";
import { BiTrophy } from "react-icons/bi";
import {
  SiMediafire,
  SiShortcut,
  SiYoutubegaming,
  SiYoutubeshorts,
} from "react-icons/si";

// Speed constants
export const speedOptions = [
  { label: "0.25x", value: 0.25 },
  { label: "0.5x", value: 0.5 },
  { label: "0.75x", value: 0.75 },
  { label: "Normal", value: 1 },
  { label: "1.25x", value: 1.25 },
  { label: "1.5x", value: 1.5 },
  { label: "1.75x", value: 1.75 },
  { label: "2x", value: 2 },
];

export const categories = [
  {
    name: "Home",
    icon: <FiHome className="h-5 w-5" />,
    active: <MdHomeFilled className="h-5 w-5" />,
    route: "/",
  },
  {
    name: "Shorts",
    icon: <SiYoutubeshorts className="h-5 w-5" />,
    // icon: <SiShortcut className="h-5 w-5" />,
    active: <SiYoutubeshorts className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Subscriptions",
    icon: <MdOutlineSubscriptions className="h-5 w-5" />,
    active: <MdSubscriptions className="h-5 w-5" />,
    route: "",
    divider: true,
  },
  {
    name: "Library",
    icon: <MdOutlineVideoLibrary className="h-5 w-5" />,
    active: <MdVideoLibrary className="h-5 w-5" />,
    route: "",
  },
  {
    name: "History",
    icon: <VscHistory className="h-5 w-5" />,
    active: <FaHistory className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Your Videos",
    icon: <AiOutlinePlaySquare className="h-5 w-5" />,
    active: <AiFillPlaySquare className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Watch Later",
    icon: <MdOutlineWatchLater className="h-5 w-5" />,
    active: <MdWatchLater className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Liked Video",
    icon: <AiOutlineLike className="h-5 w-5" />,
    active: <AiFillLike className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Mix",
    icon: <MdOutlinePlaylistPlay className="h-5 w-5" />,
    active: <CgPlayList className="h-5 w-5" />,
    route: "",
    divider: true,
  },
];

export const categoriesB = [
  {
    name: "Settings",
    icon: <FiSettings className="h-5 w-5" />,
    active: <IoSettingsSharp className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Report History",
    icon: <MdOutlineOutlinedFlag className="h-5 w-5" />,
    active: <RiFlagFill className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Help",
    icon: <FiHelpCircle className="h-5 w-5" />,
    active: <IoMdHelpCircle className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Send feedback",
    icon: <RiFeedbackLine />,
    active: <MdFeedback className="h-5 w-5" />,
    route: "",
    divider: true,
  },
];
export const categoriesC = [
  {
    name: "Trending",
    icon: <BsFire className="h-5 w-5" />,
    active: <SiMediafire className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Music",
    icon: <IoMusicalNoteOutline className="h-5 w-5" />,
    active: <IoMusicalNoteSharp className="h-5 w-6" />,
    route: "",
  },
  {
    name: "Gaming",
    icon: <SiYoutubegaming className="h-5 w-5" />,
    active: <SiYoutubegaming className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Sports",
    icon: <BiTrophy />,
    active: <FaTrophy className="h-5 w-5" />,
    route: "",
    divider: true,
  },
];
export const SelectCategories = [
  {
    name: "Trending",
    icon: <BsFire className="h-5 w-5" />,
    active: <SiMediafire className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Music",
    icon: <IoMusicalNoteOutline className="h-5 w-5" />,
    active: <IoMusicalNoteSharp className="h-5 w-6" />,
    route: "",
  },
  {
    name: "Gaming",
    icon: <SiYoutubegaming className="h-5 w-5" />,
    active: <SiYoutubegaming className="h-5 w-5" />,
    route: "",
  },
  {
    name: "Sports",
    icon: <BiTrophy />,
    active: <FaTrophy className="h-5 w-5" />,
    route: "",
    divider: true,
  },
  {
    name: "Movie",
  },
  {
    name: "Programming",
  },
  {
    name: "Comedy",
  },
  {
    name: "Education",
  },
];
