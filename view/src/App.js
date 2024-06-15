import './App.css';
import { Button, Grid, GridItem} from '@chakra-ui/react'
import { Link, Routes, Route } from 'react-router-dom';
import Items from './Items';

function Navigation() {
  return(
    <Grid templateColumns='repeat(5, 1fr)' data-testid='navigation-bar'>
      <GridItem w='100%'>
        <h1>Poca Wishlist Maker</h1>
      </GridItem>
      <GridItem colStart={4}>
        <Button>
          <Link to="items">
            Items
          </Link>
        </Button>
      </GridItem>
      <GridItem>
        <Button>
          Wishlists
        </Button>
      </GridItem>
    </Grid>
  )
}

function Home() {
  return(
    <Grid templateAreas={`"header header"
                          "nav main"
                          "nav footer"`}
    >
      <GridItem area={'header'}>
        <Navigation />
      </GridItem>
      <GridItem area={'body'}>
        
      </GridItem>
    </Grid>
  )
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </>
    
  );
}

export default App;
