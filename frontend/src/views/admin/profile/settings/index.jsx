// Chakra imports
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
// Assets
import banner from "assets/img/auth/banner.png";
import avatar4 from 'assets/img/avatars/avatar4.png'
import React from "react";
// Custom components
import Info from "views/admin/profile/settings/components/Info";
import Password from "views/admin/profile/settings/components/Password";
import Profile from "views/admin/profile/settings/components/Profile";
import Socials from "views/admin/profile/settings/components/Socials";

export default function Settings() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, lg: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        {/* Column Left */}
        <Flex direction='column'>
          <Profile name='Asad Kirmani' avatar={avatar4} banner={banner} />
          <Info />
        </Flex>
      </SimpleGrid>
    </Box>
  );
}
