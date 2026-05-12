// Chakra imports
import {
  Button,
  Flex,
  FormControl,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
import InputField from "components/fields/InputField";
import React, { useState } from "react";
import AuthService from "services/auth.service";
import api from '../../../../../services/api';
export default function Settings() {
  const currentUser = AuthService.getCurrentUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const updateUser = async (e) => {
    try {
      e.preventDefault();
      const response = await api.put(`/users/${currentUser.username}`,{
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName
      }).then(() => {
        alert("updated...")
        let user = JSON.parse(localStorage.getItem("user"));
        if(username)
        user.username = username;
        if(email)
        user.email = email;
        if(firstName)
        user.firstName = firstName;
        if(lastName)
        user.lastName = lastName;
        localStorage.setItem('user', JSON.stringify(user))
      })
    } catch (error) {
      console.error(error)
    }
  }
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";
  return (
    <FormControl>
      <Card>
        <Flex direction='column' mb='40px' ms='10px'>
          <Text fontSize='xl' color={textColorPrimary} fontWeight='bold'>
            Account Settings
          </Text>
          <Text fontSize='md' color={textColorSecondary}>
            Here you can change user account information
          </Text>
        </Flex>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: "20px", xl: "20px" }}>
          <InputField
            mb='25px'
            me='30px'
            id='username'
            label='Username'
            value={username}
            onChange={(e) => {setUsername(e.target.value)}}
            placeholder={currentUser.username}
          />
          <InputField
            mb='25px'
            id='email'
            label='Email Address'
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder={currentUser.email}
          />
          <InputField
            mb='25px'
            me='30px'
            id='first_name'
            label='First Name'
            value={firstName}
            onChange={(e) => {setFirstName(e.target.value)}}
            placeholder={currentUser.firstName}
          />
          <InputField
            mb='25px'
            id='last_name'
            label='Last Name'
            value={lastName}
            onChange={(e) => {setLastName(e.target.value)}}
            placeholder={currentUser.lastName}
          />
        </SimpleGrid>
        <Button
          variant='brand'
          minW='183px'
          fontSize='sm'
          fontWeight='500'
          ms='auto'
          onClick={(e) => updateUser(e)}>
          Save changes
        </Button>
      </Card>
    </FormControl>
  );
}
