// chakra imports
import {
  Box,
  Flex,
  Avatar,
  Text,
  useColorModeValue,
  Stack,
  Badge,
} from "@chakra-ui/react";
//   Custom components
import SidebarCard from "components/sidebar/components/SidebarCard";
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import React from "react";
import avatar4 from "assets/img/avatars/avatar4.png";
import AuthService from "services/auth.service";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const currentUser = AuthService.getCurrentUser();
  // SIDEBAR
  return (
    <Flex
      direction='column'
      minH='100%'
      height='max-content'
      pt='25px'
      borderRadius='20px'>
      <Brand />
      <Flex mt='25px' mb='25px' justifyContent='center' alignItems='center'>
        <Avatar h='48px' w='48px' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60' me='20px' />
        <Box>
          
          <Text color={textColor} fontSize='md' fontWeight='700'>
            {currentUser?.firstName + ' ' + currentUser?.lastName}
          </Text>
          
          <Badge colorScheme="green" mt='3px'>
          <Text fontSize='sm' fontWeight='500' >
            ADMIN
          </Text>
          </Badge>
        </Box>
      </Flex>
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      <Box
        ps='20px'
        pe={{ md: "16px", "2xl": "0px" }}
        mt='60px'
        borderRadius='20px'>
        <SidebarCard />
      </Box>
      
    </Flex>
  );
}

export default SidebarContent;
