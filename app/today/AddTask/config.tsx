import { Briefcase, Home, ShoppingCart, User } from "react-feather";

export const LABEL_OPTIONS = [
  {
    key: "work",
    label: "Work",
    symbol: <Briefcase size={14} color="#db4c3f" />,
  },
  {
    key: "home",
    label: "Home",
    symbol: <Home size={14} color="#2196f3" />,
  },
  {
    key: "personal",
    label: "Personal",
    symbol: <User size={14} color="#9c27b0" />,
  },
  {
    key: "shopping",
    label: "Shopping",
    symbol: <ShoppingCart size={14} color="#4caf50" />,
  },
];
