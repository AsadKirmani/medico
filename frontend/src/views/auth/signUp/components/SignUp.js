import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import { connect } from "react-redux";
import { register } from "actions/auth";

// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  SimpleGrid,
  Text,
  useColorModeValue,
  Alert,
  AlertTitle,
  AlertIcon,
  AlertDescription
} from "@chakra-ui/react";

// Custom components
import CenteredAuth from "layouts/auth/types/Centered";

// Assets
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignUp(props) {
  const { isLoggedIn, message } = props;
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successfull, setSuccessfull] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeFirstName = (e) => {
    const firstName = e.target.value;
    setFirstName(firstName);
  };
  const onChangeLastName = (e) => {
    const lastName = e.target.value;
    setLastName(lastName);
  };

  const handleRegister = (e) => {
    e.preventDefault();

      props.dispatch(register(username, email, password, firstName, lastName)).then(() => {
        setSuccessfull(true)
      })
        .catch((err) => {
          console.error(err)
        })
  }
  if(isLoggedIn){
    return <Redirect to="/admin" />
  }

  return (
    <CenteredAuth
      image={"linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"}
      cardTop={{ base: "140px", md: "14vh" }}
      cardBottom={{ base: "50px", lg: "100px" }}>
      <Flex
        maxW='max-content'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        justifyContent='center'
        px={{ base: "20px", md: "0px" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading
            color={textColor}
            fontSize={{ base: "34px", lg: "36px" }}
            mb='10px'>
            Sign Up
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Enter your email and password to sign up!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <FormControl>
            <SimpleGrid
              columns={{ base: "1", md: "2" }}
              gap={{ sm: "10px", md: "26px" }}>
              <Flex direction='column'>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  First name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  ms={{ base: "0px", md: "4px" }}
                  placeholder='First name'
                  variant='auth'
                  mb='24px'
                  size='lg'
                  value={firstName}
                  onChange={onChangeFirstName}
                />
              </Flex>
              <Flex direction='column'>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Last name<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  placeholder='Last name'
                  mb='24px'
                  size='lg'
                  value={lastName}
                  onChange={onChangeLastName}
                />
              </Flex>
            </SimpleGrid>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              type='email'
              placeholder='mail@example.com'
              mb='24px'
              size='lg'
              value={email}
              onChange={onChangeEmail}
            />
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Username<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              placeholder='@username'
              mb='24px'
              size='lg'
              value={username}
              onChange={onChangeUsername}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              isRequired={true}
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "4px" }}
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                value={password}
                onChange={onChangePassword}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
                {message ? (
                    <Flex mt='24px'>
                        <Alert status={successfull ? 'success' : 'error'}>
                        <AlertIcon />
                        <AlertTitle>{successfull ? 'Success' : 'Error'}</AlertTitle>
                        <AlertDescription>{successfull ? 'User Registered successfully now go to signin page.' : message}</AlertDescription>
                      </Alert>
                    </Flex>
                ) : null}
            <Button
              variant='brand'
              fontSize='14px'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={handleRegister}>
              Create my account
            </Button>
          </FormControl>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='sm'>
              Already a member?
              <Link href='/auth/sign-in'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Sign in
                </Text>
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </CenteredAuth>
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(SignUp);
