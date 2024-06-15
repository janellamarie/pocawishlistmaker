import './App.css';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { Button, Card, CardHeader, Heading, Image, Input, FormLabel, FormHelperText, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, ModalOverlay, useDisclosure, FormControl, SimpleGrid, Spinner, useToast, CardBody, Text, CardFooter } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'

function parseWebsite(url) {
  const split = url.split('.')
  if (split[1] === 'mercari') {
    if (split[0].includes('j')) {
      return 'mercari jp'
    } else {
      return 'mercari us'
    }
  }
  return split[1]
}

function createList(items) {
  var list = []
  for (let i = 0; i < items.length; i++) {
    console.log(items[i])
    list.push(
      <Card variant='outline'>
        <CardHeader align='center' pb={0}>
          <Image src={items[i].image_link} boxSize='150px' mb={2}/> 
          <Heading size='xs'>
            {items[i].name}
          </Heading>
        </CardHeader>  
        <CardBody align='left' pb={0}>
          <Text fontSize='l'>
            {items[i].website === "mercari us" ? "¥" : "$" }
            {items[i].price.toFixed(2)}
          </Text>
        </CardBody>
        <Button variant='link' as='a' href={items[i].link} target="_blank">
          <ExternalLinkIcon />
        </Button>
      </Card>
    )
  }
  return (
    <SimpleGrid spacing={3} templateColumns='repeat(auto-fill, minmax(240px, 1fr))'>
      {list}
    </SimpleGrid>
  )
}

function AddItem() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [url, setURL] = React.useState('')
  const [isScraping, setIsScraping] = React.useState(false)
  const toast = useToast()

  const handleSubmit = async event => {
    event.preventDefault()
    console.log('in handleSubmit')
    setIsScraping(true)
    axios.post('/api/items/', {
      link: url,
      website: parseWebsite(url)
    }).then(response => {
      console.log(response.status)
      if (response.status === 201) {
        console.log("successful request")
        toast({
          title: 'Success!',
          description: "Successfully added item into database.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      } else {
        console.log("error encountered")
        toast({
          title: 'Error!',
          description: "Unable to add item to database.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      setIsScraping(false)
    })
  };

  return (
    <>
      <Button onClick={onOpen}>Add Item</Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Item</ModalHeader>
          { isScraping ? <ModalCloseButton isDisabled={true} /> : <ModalCloseButton />}
          
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>URL</FormLabel>
              <Input placeholder='Enter URL' isDisabled={isScraping} onChange={event => setURL(event.currentTarget.value)}/>
              <FormHelperText>
                We'll scrape all the needed information from the URL you entered and add it onto our database.
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose} isDisabled={isScraping}>Close</Button>
            { isScraping ? 
              <>
                <Button colorScheme='blue' type="submit" onClick={handleSubmit} isDisabled={isScraping}>
                  <Spinner sx={{'m': 1}} />
                </Button> 
              </>: 
              <Button colorScheme='blue' type="submit" onClick={handleSubmit}>Submit</Button> 
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function ItemsBody({items}) {
  return(
    <>
      <AddItem />
      {createList(items)}
    </>
  )
}

function Items() {
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    const asyncCall = async () => {
      const result = await axios.get("/api/items/")
      setItems(result.data);
    }

    asyncCall();
  }, []);

  return(
    <>
      <ItemsBody items={items} />
    </>
  )
}

export default Items;