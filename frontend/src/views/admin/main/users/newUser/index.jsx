// Chakra imports
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import InputField from "components/fields/InputField";
import TextField from "components/fields/TextField";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

const USERS_STORAGE_KEY = "medico_users";

const appendToStorage = (key, entry) => {
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  localStorage.setItem(key, JSON.stringify([...existing, entry]));
};

export default function NewUser() {
  const history = useHistory();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);

  const closeAlert = () => {
    history.push('/admin/main/users/');
    setSuccess(false);
  };
  const [activeBullets, setActiveBullets] = useState({
    user: true,
    address: false,
    profile: false,
  });

  const userTab = useRef();
  const addressTab = useRef();
  const profileTab = useRef();

  const addUser = (e) => {
    e.preventDefault();
    const generatedUsername = (firstName + lastName)
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");
    const newUser = {
      firstName,
      lastName,
      email,
      company,
      profileEmail,
      bio,
      username: username || generatedUsername,
    };
    try {
      appendToStorage(USERS_STORAGE_KEY, newUser);
      setSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex
      direction="column"
      minH="100vh"
      align="center"
      pt={{ sm: "125px", lg: "75px" }}
      position="relative"
    >
      <Box
        h="45vh"
        bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
        position="absolute"
        w="100%"
        borderRadius="20px"
      ></Box>

      <Tabs
        variant="unstyled"
        zIndex="0"
        mt={{ base: "60px", md: "165px" }}
        display="flex"
        flexDirection="column"
      >
        <TabList
          display="flex"
          align="center"
          alignSelf="center"
          justifySelf="center"
        >
          <Tab
            ref={userTab}
            _focus="none"
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                user: true,
                address: false,
                profile: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "120px", md: "250px", lg: "300px" },
                height: "3px",
                bg: activeBullets.address ? "white" : "#8476FF",
                left: { sm: "12px", md: "30px" },
                top: {
                  sm: activeBullets.user ? "6px" : "4px",
                  md: null,
                },
                position: "absolute",
                bottom: activeBullets.user ? "40px" : "38px",

                transition: "all .3s ease",
              }}
            >
              <Box
                zIndex="1"
                border="2px solid"
                borderColor={activeBullets.user ? "white" : "#8476FF"}
                bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                w="16px"
                h="16px"
                mb="8px"
                borderRadius="50%"
              />
              <Text
                color={activeBullets.user ? "white" : "gray.300"}
                fontWeight={activeBullets.user ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}
              >
                User Info
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={addressTab}
            _focus="none"
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                user: true,
                address: true,
                profile: false,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
              _before={{
                content: "''",
                width: { sm: "120px", md: "250px", lg: "300px" },
                height: "3px",
                bg: activeBullets.profile ? "white" : "#8476FF",
                left: { sm: "12px", md: "32px" },
                top: "6px",
                position: "absolute",
                bottom: activeBullets.address ? "40px" : "38px",

                transition: "all .3s ease",
              }}
            >
              <Box
                zIndex="1"
                border="2px solid"
                borderColor={activeBullets.address ? "white" : "#8476FF"}
                bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                w="16px"
                h="16px"
                mb="8px"
                borderRadius="50%"
              />
              <Text
                color={activeBullets.address ? "white" : "gray.300"}
                fontWeight={activeBullets.address ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}
              >
                Address
              </Text>
            </Flex>
          </Tab>
          <Tab
            ref={profileTab}
            _focus="none"
            w={{ sm: "120px", md: "250px", lg: "300px" }}
            onClick={() =>
              setActiveBullets({
                user: true,
                address: true,
                profile: true,
              })
            }
          >
            <Flex
              direction="column"
              justify="center"
              align="center"
              position="relative"
            >
              <Box
                zIndex="1"
                border="2px solid"
                borderColor={activeBullets.profile ? "white" : "#8476FF"}
                bg="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
                w="16px"
                h="16px"
                mb="8px"
                borderRadius="50%"
              />
              <Text
                color={activeBullets.profile ? "white" : "gray.300"}
                fontWeight={activeBullets.profile ? "bold" : "normal"}
                display={{ sm: "none", md: "block" }}
              >
                Profile
              </Text>
            </Flex>
          </Tab>
        </TabList>
        <TabPanels mt="24px" maxW={{ md: "90%", lg: "100%" }} mx="auto">
          <TabPanel
            w={{ sm: "330px", md: "700px", lg: "850px" }}
            p="0px"
            mx="auto"
          >
            <Card p="30px">
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
                User Info
              </Text>
              <Flex direction="column" w="100%">
                <Stack direction="column" spacing="20px">
                  <SimpleGrid columns={{ base: "1", md: "2" }} gap="20px">
                    <InputField
                      mb="0px"
                      id="first"
                      placeholder="eg. Esthera"
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputField
                      mb="0px"
                      id="last"
                      placeholder="eg. Peterson"
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => {
                        const nextLastName = e.target.value;
                        setLastName(nextLastName);
                        if (!username && firstName) {
                          setUsername(
                            (firstName + nextLastName)
                              .toLowerCase()
                              .replace(/\s+/g, ""),
                          );
                        }
                      }}
                    />
                    <InputField
                      mb="0px"
                      id="Company"
                      placeholder="eg. Simmmple"
                      label="Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                    <InputField
                      mb="0px"
                      id="Email"
                      placeholder="eg. hello@simmmple.com"
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                      mb="0px"
                      id="Password"
                      placeholder="4030120241"
                      label="Password"
                    />
                    <InputField
                      mb="0px"
                      id="Confirm"
                      placeholder="4030120241"
                      label="Confirm Password"
                    />
                  </SimpleGrid>
                </Stack>
                <Flex justify="space-between" mt="24px">
                  <Button
                    variant="darkBrand"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: "128px", md: "148px" }}
                    h="46px"
                    ms="auto"
                    onClick={() => addressTab.current.click()}
                  >
                    Next
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </TabPanel>
          <TabPanel
            w={{ sm: "330px", md: "700px", lg: "850px" }}
            p="0px"
            mx="auto"
          >
            <Card p="30px">
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
                Address
              </Text>
              <Flex direction="column" w="100%">
                <Stack direction="column" spacing="20px" mb="20px">
                  <InputField
                    mb="0px"
                    id="add1"
                    placeholder="eg. Main Street 203"
                    label="Address Line 1"
                  />
                  <InputField
                    mb="0px"
                    id="add2"
                    placeholder="eg. Apartment, Floor"
                    label="Address Line 2"
                  />
                  <SimpleGrid columns={{ base: "1", md: "2" }} gap="20px">
                    <InputField
                      mb="0px"
                      id="city"
                      placeholder="eg. Miami"
                      label="City"
                    />
                    <SimpleGrid columns={{ base: "1", md: "2" }} gap="20px">
                      <InputField
                        mb="0px"
                        id="add2"
                        placeholder="Florida"
                        label="State"
                      />
                      <InputField
                        mb="0px"
                        id="zip"
                        placeholder="eg. Apartment, Floor"
                        label="ZIP"
                      />
                    </SimpleGrid>
                  </SimpleGrid>
                </Stack>
                <Flex justify="space-between">
                  <Button
                    variant="light"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: "128px", md: "148px" }}
                    h="46px"
                    onClick={() => userTab.current.click()}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="darkBrand"
                    fontSize="sm"
                    borderRadius="16px"
                    w={{ base: "128px", md: "148px" }}
                    h="46px"
                    ms="auto"
                    onClick={() => profileTab.current.click()}
                  >
                    Next
                  </Button>
                </Flex>
              </Flex>
            </Card>
          </TabPanel>
          <TabPanel
            w={{ sm: "330px", md: "700px", lg: "850px" }}
            p="0px"
            mx="auto"
          >
            <Card p="30px">
              <Text color={textColor} fontSize="2xl" fontWeight="700" mb="20px">
                Profile
              </Text>
              <Flex direction="column" w="100%">
                <Stack direction="column" spacing="20px">
                  <InputField
                    id="profile email"
                    placeholder="Your primary email address"
                    label="Profile Email"
                    mb="0px"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                  />
                  <TextField
                    minH="150px"
                    id="bio"
                    placeholder="Enter a few words about you"
                    label="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Stack>
                <Flex justify="space-between" mt="24px">
                  {success ? (
                    <Flex mt="24px">
                      <Alert status="success">
                        <AlertIcon />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>
                          User added successfully!
                        </AlertDescription>
                        <CloseButton
                          position="absolute"
                          fontSize={{ sm: "8px", md: "12px" }}
                          right={{ sm: "-4px", md: "8px" }}
                          top={{ sm: "-4px", md: "8px" }}
                          onClick={closeAlert}
                        />
                      </Alert>
                    </Flex>
                  ) : (
                    <>
                      <Button
                        variant="light"
                        fontSize="sm"
                        borderRadius="16px"
                        w={{ base: "128px", md: "148px" }}
                        h="46px"
                        onClick={() => addressTab.current.click()}
                      >
                        Prev
                      </Button>
                      <Button
                        variant="darkBrand"
                        fontSize="sm"
                        borderRadius="16px"
                        w={{ base: "128px", md: "148px" }}
                        h="46px"
                        onClick={addUser}
                      >
                        Submit
                      </Button>
                    </>
                  )}
                </Flex>
              </Flex>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
