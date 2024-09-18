import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./components/page/LoginPage";
import RegisterPage from "./components/page/RegisterPage";
import TaskListPage from "./components/page/TaskListPage";
import TaskDetailPage from "./components/page/TaskDetailPage";
import ProfilePage from "./components/page/ProfilePage";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A3636',
    },
    secondary: {
      main: '#40534C',
    },
    background: {
      default: '#F4F4F4',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
