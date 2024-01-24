import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { PioneerProvider } from "./lib/context/Pioneer";
import Layout from "./lib/layout";
import Routings from "./lib/router/Routings";
import { theme } from "./lib/styles/theme";

// @ts-ignore
const ForceDarkMode = ({ children }) => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode("dark");
  }, [setColorMode]);

  return <>{children}</>;
};

const App = () => (
  <PioneerProvider>
    <ChakraProvider theme={theme}>
      <ForceDarkMode>
        <Router>
          <Layout>
            <Routings />
          </Layout>
        </Router>
      </ForceDarkMode>
    </ChakraProvider>
  </PioneerProvider>
);

export default App;
