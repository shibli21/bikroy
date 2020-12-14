import { Box, Container } from "@chakra-ui/react";
import Collections from "../components/Collections";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const Index = () => (
  <>
    <Hero />
    <Container maxW="7xl">
      <Collections />
      <Footer />
    </Container>
  </>
);

export default Index;
