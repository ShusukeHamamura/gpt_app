import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme/theme";
import { APIProvider } from "./providers/APIProvider";
import { Router } from "./router/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <APIProvider>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </APIProvider>
  );
}

export default App;
