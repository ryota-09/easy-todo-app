import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: '#1A3636' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TodoApp
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/tasks" startIcon={<AssignmentIcon />}>
            タスク
          </Button>
          <Button color="inherit" component={RouterLink} to="/profile" startIcon={<PersonIcon />}>
            プロフィール
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;