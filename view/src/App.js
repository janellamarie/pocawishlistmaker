import './App.css';
import { Button, Grid, GridItem, Heading} from '@chakra-ui/react'
import { Link, Routes, Route } from 'react-router-dom';
import Items from './Items';
import { Wishlists } from './Wishlist';

function Navigation() {
  return(
    <Grid 
      templateColumns='repeat(1, 2)' 
      data-testid='navigation-bar'
      backgroundColor='gray.100'
    >
      <GridItem w='100%' colSpan={1}>
        <Heading size='lg'>
          <Link to="/home">
            Poca Wishlist Maker
          </Link>
        </Heading>
      </GridItem>
      <GridItem colStart={3} colEnd={4}>
        <Button w='95%' variant='link' h='full'>
          <Link to="/items">
            Items
          </Link>
        </Button>
      </GridItem>
      <GridItem colStart={4} colEnd={5}>
        <Button w='95%' variant='link' h='full'>
          <Link to="/wishlists">
            Wishlists
          </Link>
        </Button>
      </GridItem>
    </Grid>
  )
}

export function Home({body}) {
  return(
    <Grid 
      templateAreas={`"header"
        "main"
        "footer"`}
      gridTemplateRows={'50px 90% 50px'}
      gridTemplateColumns={'1fr'}
      gap='1'
      p='1'
    >
      <GridItem area={'header'}>
        <Navigation />
      </GridItem>
      <GridItem area={'main'}>
        {body}
      </GridItem>
    </Grid>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/wishlists" element={<Wishlists />} />
      </Routes>
    </>
  );
}

export default App;
