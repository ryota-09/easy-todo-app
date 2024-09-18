import React, { useState } from 'react';
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

interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState<Task>({
    id: "1d5af5ed-a1ff-4e84-9cdf-913f59f98f28",
    userId: "4fa44ee5-1274-4a5f-afc1-ad1d5253c792",
    title: "マーケティングデータを分析する",
    description: "月次レポート用のデータ分析",
    completed: false,
    dueDate: "2024-09-20",
    priority: 2,
    createdAt: "2024-09-16 02:48:29.610738+00",
    updatedAt: "2024-09-16 02:48:29.610738+00"
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // ここでタスクの更新処理を実装
    console.log('Updated task:', task);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

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