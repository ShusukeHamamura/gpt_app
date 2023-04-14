import { memo } from "react";
import { Footer } from "../organisms/layout/Footer";

export const FooterLayout = memo((props) => {
  const { children } = props;
  return (
    <>
      <Footer />
      {children}
    </>
  );
});
