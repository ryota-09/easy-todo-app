import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Navigation from '../Navigation';
import { useGlobalState } from '../../provider';
import type { User } from '../../types';
import { updateUser } from '../../lib/fetch';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { state, dispatch } = useGlobalState();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!user) return
    const targetUser = {
      id: user.id,
      userName: user.userName,
      email: user.email,
    }
    await updateUser(targetUser);
    dispatch({ type: 'setUser', payload: targetUser });
    setUser(targetUser);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(user ? { ...user, [e.target.name]: e.target.value } : null);
  };

  useEffect(() => {
    setUser(state.user);
  }, []);

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ bgcolor: "white", height: "100vh" }}>
        <Navigation />
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, color: '#1A3636' }}>
          <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          プロフィール
        </Typography>
        <Typography variant="body1" gutterBottom>
          ログインしてください
        </Typography>
        <Button variant="contained" color="primary" href="/login">
          ログイン
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "white", height: "100vh" }}>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, color: '#1A3636' }}>
        <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        プロフィール
      </Typography>
      <Paper elevation={3} sx={{ p: 3, bgcolor: '#D6BD98' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ width: 100, height: 100, bgcolor: '#40534C', mb: 2 }}>
            <PersonIcon sx={{ fontSize: 60 }} />
          </Avatar>
          {isEditing ? (
            <Box component="form" sx={{ width: '100%', '& .MuiTextField-root': { mb: 2 } }}>
              <TextField
                fullWidth
                label="ユーザー名"
                name="userName"
                value={user.userName}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="メールアドレス"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
              />
            </Box>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {user.userName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user.email}
              </Typography>
            </>
          )}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? '保存' : '編集'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProfilePage;