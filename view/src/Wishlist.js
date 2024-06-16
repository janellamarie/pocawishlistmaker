import * as React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

import { AddIcon, SearchIcon } from "@chakra-ui/icons"
import { 
  Box, Divider, Grid, GridItem, Heading, IconButton, Input, InputGroup, InputRightElement, VStack, 
  Tooltip, useDisclosure, useToast,  Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, 
  ModalFooter, ModalOverlay, FormControl, FormLabel, Button, Textarea, Text,
  Card, CardHeader, CardBody
} from "@chakra-ui/react"

export function Wishlists() {
  const [wishlists, setWishlists] = React.useState([])

  useEffect(() => {
    const asyncCall = async () => {
      const result = await axios.get("/api/wishlists/")
      setWishlists(result.data);
    }
    asyncCall();
  }, []);

  
  function CreateWishlistButton() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [isLoading , setIsLoading] = React.useState(false)
    const toast = useToast()
  
    const handleSubmit = async event => {
      event.preventDefault()
      setIsLoading(true)
      try {
        axios.post('/api/wishlists/', {
          name: name,
          description: description
        }).then(response => {
          if (response.status >= 200) {
            console.log("[handleSubmit] successful request")
            // TODO: getAllWishlists
            toast({
              title: 'Success!',
              description: "Successfully created ", name,
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
          } else {
            console.error("[handleSubmit] error encountered")
            toast({
              title: 'Error!',
              description: "An error occured whie trying to create the wishlist.",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position: 'top'
            })
            setIsLoading(false)
          }
        }).done()
      } catch(error) {
        console.log(error)
        toast({
          title: 'Error!',
          description: "An error occured whie trying to create the wishlist.",
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top'
        })
        setIsLoading(false)
      }
    };
    
    return (
      <>
          <Tooltip label='Create a wishlist' hasArrow placement='top-start'>
            <IconButton
              onClick={onOpen} 
              isRound 
              size='lg' 
              icon={<AddIcon />} 
              colorScheme='blue'
              sx={{
                p:'0',
                position:'fixed',
                left:'1%',
                bottom:'2%',
                zIndex:'2'
              }} 
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
                  placeholder='Enter name' 
                  isDisabled={isLoading} 
                  onChange={event => setName(event.currentTarget.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea 
                  placeholder='Enter description' 
                  onChange={event => setDescription(event.currentTarget.value)}
                  isDisabled={isLoading} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='gray' mr={3} onClick={onClose} isDisabled={isLoading}>Close</Button>
              <Button 
                colorScheme='blue' 
                type='submit' 
                onClick={handleSubmit} 
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

  function createList(wishlists) {
    var list = []
    for (let i = 0; i < wishlists.length; i++) {
      console.log(wishlists[i])
      list.push(
        <Card w='full' mt={0} mb={0}>
          <CardHeader pb='0'>
            <Heading size='s'>{wishlists[i].name}</Heading>
          </CardHeader>
          <CardBody pt='1%'>
            <Text fontSize='xs'>Tags</Text>
            {/* TODO: add Tags here */ }
          </CardBody>
        </Card>
      )
    }

    return list
  }

  return (
    <Grid 
      templateAreas={`"list main"`}
      gridTemplateColumns={'32% 1fr'}
    >
      <CreateWishlistButton />
      <GridItem area={'list'} backgroundColor='blue.200' p={1}>
        <Box>
          <Heading>Wishlists</Heading>
          <InputGroup mt={1} mb={1}>
            <Input placeholder='Search' variant='filled' />
            <InputRightElement>
              <IconButton icon={<SearchIcon />} size='sm'/>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Divider/>
        <VStack>
          {createList(wishlists)}
        </VStack>
        
      </GridItem>
      <GridItem area={'main'}>

      </GridItem>
    </Grid>
  )
}