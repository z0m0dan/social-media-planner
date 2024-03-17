import { ChakraProvider } from "@chakra-ui/react";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};
