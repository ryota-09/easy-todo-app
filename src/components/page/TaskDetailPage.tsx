import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateIcon from '@mui/icons-material/Create';
import UpdateIcon from '@mui/icons-material/Update';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Navigation from '../Navigation';
import { fetchTaskDetail, updateTask } from '../../lib/fetch';
import type { Task } from '../../types';
import { useGlobalState } from '../../provider';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<Task | null>(null);
  const { state } = useGlobalState();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!task) return
    const targetTask = {
      id: task.id,
      userId: state.user?.id ?? '',
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      completed: task.completed,
    }
    await updateTask(targetTask);
    setTask({ ...targetTask, createdAt: task.createdAt, updatedAt: new Date().toISOString() });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask(task ? { ...task, [e.target.name]: e.target.value } : null);
  };

  useEffect(() => {
    const getTaskDetail = async () => {
      try {
        const { data } = await fetchTaskDetail(id ?? "");
        setTask(data);
      } catch (error) {
        console.error(error);
      }
    }
    getTaskDetail();
  }, []);

  if (!task) {
    return (
      <Container maxWidth="sm" sx={{ bgcolor: "white", height: "100vh" }}>
        <Navigation />
        <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, color: '#1A3636' }}>
          <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          タスク詳細
        </Typography>
        <Typography variant="body1" gutterBottom>
          ローディング中...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ bgcolor: "white", height: "100vh" }}>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, color: '#1A3636' }}>
        <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        タスク詳細
      </Typography>
      <Paper elevation={3} sx={{ p: 3, bgcolor: '#D6BD98' }}>
        {isEditing ? (
          <Box component="form" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
            <TextField
              fullWidth
              label="タイトル"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="説明"
              name="description"
              multiline
              rows={4}
              value={task.description}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="期限"
              name="dueDate"
              type="date"
              value={task.dueDate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="priority-label">優先度</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                name="priority"
                value={task.priority}
                label="優先度"
                onChange={(e) => setTask({ ...task, priority: e.target.value as number })}
              >
                <MenuItem value={1}>低</MenuItem>
                <MenuItem value={2}>中</MenuItem>
                <MenuItem value={3}>高</MenuItem>
              </Select>
            </FormControl>
          </Box>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              {task.title}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                説明: {task.description}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">
                <EventIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                期限: {new Date(task.dueDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">
                <PriorityHighIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                優先度: {task.priority}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">
                <CheckCircleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                ステータス: {task.completed ? '完了' : '未完了'}
              </Typography>
            </Box>
            <Box sx={{ mb: 1 }}>
              <Typography variant="body2">
                <CreateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                作成日: {new Date(task.createdAt).toLocaleString()}
              </Typography>
            </Box>
            <Typography variant="body2">
              <UpdateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              更新日: {new Date(task.updatedAt).toLocaleString()}
            </Typography>
          </>
        )}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? '保存' : '編集'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/tasks')}
          >
            戻る
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TaskDetailPage;