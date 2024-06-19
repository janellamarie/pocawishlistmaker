import './App.css';
import { Button, Grid, GridItem, Heading, SimpleGrid} from '@chakra-ui/react'
import { Link, Routes, Route } from 'react-router-dom';
import Items from './Items';
import Tags from './Tags';
import { Wishlists } from './Wishlist';

export function getRandomColor() {
  var colors = ["red", "orange", "green", "teal", "blue", "cyan", "purple", "pink"]
  return colors[Math.floor(Math.random() * 8)] ;
}

function Navigation() {
  return(
    <Grid 
      templateColumns='repeat(1, 2)' 
      data-testid='navigation-bar'
      backgroundColor='gray.100'
      gap={6}
      p={4}
      boxShadow='0 2px 3px -2px gray'
      zIndex='2'
    >
      <GridItem w='100%' colSpan={1}>
        <Heading size='lg'>
          <Link to="/home">
            Poca Wishlist Maker
          </Link>
        </Heading>
      </GridItem>
      <GridItem colStart={2} colEnd={3}>
        <Button w='95%' variant='link' h='full'>
          <Link to="/items">
            Items
          </Link>
        </Button>
      </GridItem>
      <GridItem colStart={3} colEnd={4}>
        <Button w='95%' variant='link' h='full'>
          <Link to="/wishlists">
            Wishlists
          </Link>
        </Button>
      </GridItem>
      <GridItem colStart={4} colEnd={5}>
        <Button w='95%' variant='link' h='full'>
          <Link to="/tags">
            Tags
          </Link>
        </Button>
      </GridItem>
    </Grid>
  )
}

export function Home({body}) {
  return(
    <SimpleGrid columns={1}>
      <Navigation />
      {body}
      <>
      </>
    </SimpleGrid>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/items" element={<Home body={<Items />}/>} />
        <Route path="/wishlists" element={<Home body={<Wishlists />}/>} />
        <Route path="/tags" element={<Home body={<Tags />}/>} />
      </Routes>
    </>
  );
}

export default App;
