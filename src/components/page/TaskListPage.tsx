import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Box, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddTaskIcon from '@mui/icons-material/AddTask';
import AssignmentIcon from '@mui/icons-material/Assignment';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import Navigation from '../Navigation';
import { fetchTasks } from '../../lib/fetch';
import type { Task } from '../../types';

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'userId' | 'completed' | 'createdAt' | 'updatedAt'>>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 1,
  });
  const navigate = useNavigate();

  const handleAddTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      userId: '4fa44ee5-1274-4a5f-afc1-ad1d5253c792', // 仮のユーザーID
      ...newTask,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks([...tasks, task]);
    setOpenDialog(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 1,
    });
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

  useEffect(() => {
    const getTasks = async () => {
      try {
        const { data } = await fetchTasks();
        const filteredTasks = tabValue === 0 ? data.filter(task => !task.completed) : data.filter(task => task.completed);
        setTasks(filteredTasks);
      } catch (error) {
        console.error(error);
      }
    }
    getTasks();
  }, [tabValue]);


  return (
    <Container maxWidth="sm" sx={{ bgcolor: "white", height: "auto" }}>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, color: '#1A3636' }}>
        <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        タスク一覧
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddTaskIcon />}
        onClick={() => setOpenDialog(true)}
        sx={{ mb: 2, bgcolor: '#677D6A' }}
      >
        新しいタスク
      </Button>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="未完了" icon={<AssignmentIcon />} iconPosition="start" />
        <Tab label="完了" icon={<CheckCircleIcon />} iconPosition="start" />
      </Tabs>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} sx={{ bgcolor: '#D6BD98', mb: 1, borderRadius: 1 }}>
            <ListItemText 
              primary={task.title}
              secondary={`期限: ${new Date(task.dueDate).toLocaleDateString()} | 優先度: ${task.priority}`}
            />
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>新しいタスクを追加</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="タイトル"
            type="text"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="説明"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            margin="dense"
            id="dueDate"
            label="期限"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="priority-label">優先度</InputLabel>
            <Select
              labelId="priority-label"
              id="priority"
              value={newTask.priority}
              label="優先度"
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as number })}
            >
              <MenuItem value={1}>低</MenuItem>
              <MenuItem value={2}>中</MenuItem>
              <MenuItem value={3}>高</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>キャンセル</Button>
          <Button onClick={handleAddTask}>追加</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskListPage;