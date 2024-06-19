import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import { 
  Box, 
  Button, 
  Flex, 
  Heading, 
  IconButton, 
  VStack, 
  Grid, 
  GridItem, 
  InputGroup, 
  Input, 
  InputRightElement, 
  Text,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Tooltip,
  Modal, 
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useToast,
  useDisclosure,
  Icon, 
  HStack} from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";
import { FaHashtag, FaTag } from "react-icons/fa6";
import { AddIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons"

function Tags() {
  const [tags, setTags] = React.useState([]) 

  useEffect(() => {
    const asyncCall = async () => {
      const result = await axios.get("/api/tags/")
      setTags(result.data)
      console.log('result.data', result.data)
    }
    asyncCall();
  }, []);

  function getAllTags() {
    console.log("[getAllTags] fetching tags...")
    axios.get("/api/tags/").then(response => {
      if (response.status >= 200 ) {
        console.log("[getAllTags] successful request")
        setTags(response.data)
      } else {
        console.error("[getAllTags] error encountered while making request, response code:", response.status)
        return Error
      }
    })
  }

  function Tag() {
    var tagsButtons = []

    for (var i = 0; i < tags.length; i++) {
      tagsButtons.push(
        <Button 
          onClick={event => {alert('Tag Button')}} 
          w='full' 
          display='flex' 
          justifyContent='space-between'
          variant='outline'>    
          <HStack>
            <Icon as={FaHashtag} />
            <Text >
              {tags[i].name} 
            </Text>
          </HStack>
          <IconButton as={MdMoreVert} size='xs' onClick={event => {
            event.stopPropagation()
            alert('MdMoreVert')
          }}/>
        </Button>
      )
    }

    return (
      <>
        {tagsButtons}
      </>
    )
  }

  function CreateTagButton() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [tagName, setTagName] = React.useState('')
    const [isLoading , setIsLoading] = React.useState(false)
    const toast = useToast()
  
    const handleSubmitCreateTags = async event => {
      event.preventDefault()
      setIsLoading(true)
      try {
        axios.post('/api/tags/', {
          name: tagName
        }).then(response => {
          if (response.status >= 200) {
            console.log("[handleSubmitCreateTags] successful request")
            getAllTags()
            setIsLoading(false)
            toast({
              title: 'Success!',
              description: "Successfully created ", tagName,
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
          } else {
            console.error("[handleSubmitCreateTags] error encountered")
            setIsLoading(false)
            toast({
              title: 'Error!',
              description: "An error occured whie trying to create tag.",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
          }
        })
      } catch(error) {
        console.error("[handleSubmitCreateTags] error encountered")
        setIsLoading(false)
        toast({
          title: 'Error!',
          description: "An error occured whie trying to create tag.",
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top'
        })
      }
    };

    return (
      <>
          <Tooltip label='Create tag' hasArrow placement='top-start'>
            <IconButton
              onClick={onOpen}  
              size='sm' 
              icon={<AddIcon />} 
              colorScheme='blue'
            />
          </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Wishlist</ModalHeader>
            { isLoading ? <ModalCloseButton isDisabled={true} /> : <ModalCloseButton />}
            <ModalBody>
              <FormControl isRequired pb={1}>
                <FormLabel>Name</FormLabel>
                <Input 
                  placeholder='Enter tag name' 
                  isDisabled={isLoading} 
                  onChange={event => setTagName(event.currentTarget.value)} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='gray' mr={3} onClick={onClose} isDisabled={isLoading}>Close</Button>
              <Button 
                colorScheme='blue' 
                type='submit' 
                onClick={handleSubmitCreateTags} 
                isLoading={isLoading}
                loadingText='Submitting'>
                  Submit
                </Button> 
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  function SideBar() {
    console.log("sidebar")
    return (
      <Grid templateAreas={`"list content"`}
          gridTemplateColumns={'23%'}>
      <GridItem area={'list'}  p={4} minHeight='90vh' borderRight='1px' borderRightColor='gray.300'>
        <Box>
          <Flex justifyContent='space-between' alignItems='center'>
            <Heading size='lg'>Tags</Heading>
            <CreateTagButton />
          </Flex>
          <InputGroup mt={1} mb={2}>
            <Input placeholder='Search' variant='filled' />
            <InputRightElement>
              <IconButton icon={<SearchIcon />} size='sm'/>
            </InputRightElement>
          </InputGroup>
        </Box>
        <VStack>
          <Tag />
        </VStack>
      </GridItem>
      <GridItem area={'content'}>
        <Tabs>
          <TabList>
            <Tab>Wishlist</Tab>
            <Tab>Items</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text>Wishlists</Text>
            </TabPanel>
            <TabPanel>
              <Text>Items</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
    </Grid>
    )
  }

  return(
    <>
      <SideBar />
    </>
  )
}

export default Tags;