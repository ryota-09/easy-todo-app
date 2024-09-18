import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const RegisterPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでユーザー登録処理を実装
    console.log('Register:', userName, email, password);
    navigate('/login');
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PersonAddIcon sx={{ m: 1, bgcolor: '#40534C', color: 'white', fontSize: 40, p: 1, borderRadius: '50%' }} />
        <Typography component="h1" variant="h5">
          ユーザー登録
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="ユーザー名"
            name="userName"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            InputProps={{
              startAdornment: <AccountCircleIcon sx={{ color: '#677D6A', mr: 1 }} />,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon sx={{ color: '#677D6A', mr: 1 }} />,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <VpnKeyIcon sx={{ color: '#677D6A', mr: 1 }} />,
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#40534C' }}
          >
            登録
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;