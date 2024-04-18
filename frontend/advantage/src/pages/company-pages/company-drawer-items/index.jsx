import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

export const CompanyDrawerItems = [
  {
    text: "Manage Teams",
    icon: <GroupsRoundedIcon></GroupsRoundedIcon>,
    navigateTo: "/company/manageTeams",
  },
  {
    text: "Subscription",
    icon: <AccountBalanceWalletRoundedIcon></AccountBalanceWalletRoundedIcon>,
    navigateTo: "/company/subscription",
  },
];
