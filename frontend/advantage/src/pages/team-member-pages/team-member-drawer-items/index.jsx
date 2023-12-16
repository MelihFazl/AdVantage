import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import RttRoundedIcon from "@mui/icons-material/RttRounded";
import PhotoLibraryRoundedIcon from "@mui/icons-material/PhotoLibraryRounded";

export const TeamMemberDrawerItems = [
  {
    text: "Home",
    icon: <HomeRoundedIcon></HomeRoundedIcon>,
    navigateTo: "/team-member",
  },
  {
    text: "Text Analysis",
    icon: <RttRoundedIcon></RttRoundedIcon>,
    navigateTo: "/team-member/text-analysis",
  },
  {
    text: "Image analysis",
    icon: <PhotoLibraryRoundedIcon></PhotoLibraryRoundedIcon>,
    navigateTo: "/team-member/image-analysis",
  },
];
