import * as React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Navigation() {

  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ m: 5 }}>
      <BottomNavigation 
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ backgroundColor: "transparent" }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} component={Link} to="/" />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} component={Link} to="/favorites" />
      </BottomNavigation>
    </Box>
  );
}

export default Navigation;