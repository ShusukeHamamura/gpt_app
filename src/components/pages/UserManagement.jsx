import { memo } from "react";
import { HeaderLayout } from "../template/HeaderLayout";

export const UserManagement = memo(() => {
  return (
    <>
      <HeaderLayout />
      <h1>管理者ページ</h1>
    </>
  );
});
