import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

export const CompanyDrawerItems = [
  {
    text: "Manage Teams",
    icon: <GroupsRoundedIcon></GroupsRoundedIcon>,
    navigateTo: "/company/manageTeams",
  },
  {
    text: "Create Team",
    icon: <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon>,
    navigateTo: "/company/createTeam",
  },
  {
    text: "Create Team Member",
    icon: <PersonAddAlt1RoundedIcon></PersonAddAlt1RoundedIcon>,
    navigateTo: "/company/createTeamMember",
  },
  {
    text: "Subscription",
    icon: <AccountBalanceWalletRoundedIcon></AccountBalanceWalletRoundedIcon>,
    navigateTo: "/company/subscription",
  },
];
