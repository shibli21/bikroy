import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import Nextlink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { TiThSmall } from "react-icons/ti";
import {
  MeDocument,
  useLogoutMutation,
  useMeQuery,
  useUserCartQuery,
} from "../generated/graphql";
import MenuItems from "./MenuItems";

const NavBar = ({ props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useMeQuery();
  const [logout] = useLogoutMutation();
  const { data: cart } = useUserCartQuery();
  const router = useRouter();
  let sum = 0;

  cart?.userCart?.forEach(async (u) => {
    sum = sum + u.quantity;
  });

  let NavLinks;
  if (data?.me) {
    NavLinks = (
      <>
        <MenuItems>
          <Link>COLLECTIONS</Link>
        </MenuItems>
        <MenuItems>
          <Nextlink href="/items">
            <Link>SHOP</Link>
          </Nextlink>
        </MenuItems>
        <MenuItems>
          <Link>BLOG</Link>
        </MenuItems>
        <MenuItems>
          <Nextlink href="/cart">
            <AiOutlineShoppingCart fontSize="30px" />
          </Nextlink>
        </MenuItems>
        <MenuItems>
          <BiSearchAlt fontSize="30px" />
        </MenuItems>

        <MenuItems>
          <Menu>
            <MenuButton as="div">
              <AiOutlineUser fontSize="30px" />
            </MenuButton>
            <MenuList borderRadius={0} py={0}>
              <MenuItem>{data.me.name}</MenuItem>
              <MenuItem
                onClick={() => {
                  logout({
                    refetchQueries: [
                      {
                        query: MeDocument,
                      },
                    ],
                  });
                  router.reload();
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </MenuItems>
      </>
    );
  } else {
    NavLinks = (
      <>
        <MenuItems>
          <Nextlink href="/login">
            <Link>Log in</Link>
          </Nextlink>
        </MenuItems>
        <MenuItems>
          <Nextlink href="/register">
            <Link>Sign up</Link>
          </Nextlink>
        </MenuItems>
      </>
    );
  }

  return (
    <Box top={0} position="sticky" zIndex={100}>
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1rem"
        {...props}
      >
        <Nextlink href="/">
          <TiThSmall cursor="pointer" fontSize="40px" />
        </Nextlink>
        <Flex
          display={["none", "none", "inherit", "inherit"]}
          align="center"
          justify="center"
        >
          {NavLinks}
        </Flex>
        <Box display={["block", "block", "none", "none"]}>
          <>
            <Box key="bar">
              <Box color="primary" onClick={onOpen}>
                <FaBars size="40px" />
              </Box>
            </Box>
            <Drawer
              size="xs"
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton m={4}>
                  <Box color="primary">
                    <RiCloseFill size="60px" />
                  </Box>
                </DrawerCloseButton>
                <DrawerBody pt="150px">
                  <Stack spacing="24px" align="center">
                    {NavLinks}
                  </Stack>
                </DrawerBody>
                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavBar;
