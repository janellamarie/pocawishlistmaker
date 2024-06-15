import './App.css';
import axios from 'axios';
import * as React from 'react';
import { useEffect } from 'react';
import { Button, Input, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalFooter, ModalOverlay, useDisclosure, FormControl, Spinner, useToast } from '@chakra-ui/react';

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
      <>
        <li><img src={items[i].image_link} width={150} /></li>
        <li>{items[i].name}</li>
        <li>{items[i].price}</li>
      </>     
    )
  }
  return (
    <ul>
      {list}
    </ul>
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose} isDisabled={isScraping}>Close</Button>
            { isScraping ? 
              <>
                <Button colorScheme='blue' type="submit" onClick={handleSubmit} isDisabled={true}>
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