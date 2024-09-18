import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Box } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import EventIcon from '@mui/icons-material/Event';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CreateIcon from '@mui/icons-material/Create';
import UpdateIcon from '@mui/icons-material/Update';

// 仮のタスクデータ
const taskData = {
  "id": "1d5af5ed-a1ff-4e84-9cdf-913f59f98f28",
  "userId": "4fa44ee5-1274-4a5f-afc1-ad1d5253c792",
  "title": "マーケティングデータを分析する",
  "description": "月次レポート用のデータ分析",
  "completed": false,
  "dueDate": "2024-09-20 00:00:00+00",
  "priority": 2,
  "createdAt": "2024-09-16 02:48:29.610738+00",
  "updatedAt": "2024-09-16 02:48:29.610738+00"
};

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // 実際のアプリケーションでは、idを使用してタスクデータを取得します

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, color: '#1A3636' }}>
        <AssignmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        タスク詳細
      </Typography>
      <Paper elevation={3} sx={{ p: 3, bgcolor: '#D6BD98' }}>
        <Typography variant="h5" gutterBottom>
          {taskData.title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">
            <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            説明: {taskData.description}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            <EventIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            期限: {new Date(taskData.dueDate).toLocaleDateString()}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            <PriorityHighIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            優先度: {taskData.priority}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            <CheckCircleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            ステータス: {taskData.completed ? '完了' : '未完了'}
          </Typography>
        </Box>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">
            <CreateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            作成日: {new Date(taskData.createdAt).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body2">
          <UpdateIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          更新日: {new Date(taskData.updatedAt).toLocaleString()}
        </Typography>
      </Paper>
    </Container>
  );
};

export default TaskDetailPage;