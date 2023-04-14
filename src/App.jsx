import { ChakraProvider } from "@chakra-ui/react";
import { useState } from "react";
import { Home } from "./components/pages/Home";
import { HeaderLayout } from "./components/templates/HeaderLayout";
import theme from "./theme/theme";
import { APIProvider } from "./providers/APIProvider";

function App() {
  return (
    <APIProvider>
      <ChakraProvider theme={theme}>
        <HeaderLayout>
          <Home />;
        </HeaderLayout>
      </ChakraProvider>
    </APIProvider>
  );
}

export default App;
