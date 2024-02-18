import { selectUser } from "app/store/userSlice";
import { useFuseSelector } from "../utils/hooks/useStore";

const { useState } = require("react");

const useIsAuth = () => {
  const { role } = useFuseSelector(selectUser);
  const isAuth = (roles: any) => roles.some((i: any) => i === role);
  return isAuth;
};

export default useIsAuth;
