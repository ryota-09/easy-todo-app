import React, { useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Tabs, Tab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredTasks = tabValue === 0 ? tasks.filter(task => !task.completed) : tasks.filter(task => task.completed);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, color: '#1A3636' }}>
        <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        タスク一覧
      </Typography>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="新しいタスクを入力"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          InputProps={{
            startAdornment: <AddTaskIcon sx={{ color: '#677D6A', mr: 1 }} />,
          }}
        />
        <Button variant="contained" onClick={handleAddTask} sx={{ ml: 1, bgcolor: '#677D6A' }}>
          追加
        </Button>
      </Box>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="未完了" icon={<AssignmentIcon />} iconPosition="start" />
        <Tab label="完了" icon={<CheckCircleIcon />} iconPosition="start" />
      </Tabs>
      <List>
        {filteredTasks.map((task) => (
          <ListItem key={task.id} sx={{ bgcolor: '#D6BD98', mb: 1, borderRadius: 1 }}>
            <ListItemText primary={task.title} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="complete" onClick={() => handleToggleComplete(task.id)}>
                <CheckCircleIcon color={task.completed ? 'primary' : 'action'} />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
              <IconButton edge="end" aria-label="details" onClick={() => navigate(`/tasks/${task.id}`)}>
                <InfoIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskListPage;