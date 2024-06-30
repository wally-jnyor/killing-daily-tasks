import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

// Define __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware para CORS
app.use(cors());

// Middleware para analisar JSON
app.use(express.json());

const dbFilePath = path.join(__dirname, 'db.json');
let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

// Função para salvar o banco de dados
const saveDatabase = () => {
  fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
};

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Middleware para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ path: `/uploads/${req.file.originalname}` });
});

// Rota para obter todos os usuários
app.get('/userData', (req, res) => {
  res.status(200).json(db.userData);
});

// Rota para obter dados de um usuário específico
app.get('/userData/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = db.userData.find(user => user.id === userId);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Criar item na checklist
app.post('/userData/:userId/checklist', (req, res) => {
  const userId = parseInt(req.params.userId);
  const newChecklistItem = req.body;
  const user = db.userData.find(user => user.id === userId);
  if (user) {
    newChecklistItem.id = user.checklist.length ? user.checklist[user.checklist.length - 1].id + 1 : 1;
    user.checklist.push(newChecklistItem);
    saveDatabase();
    res.status(201).json(newChecklistItem);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Atualizar item na checklist
app.put('/userData/:userId/checklist/:checklistId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const checklistId = parseInt(req.params.checklistId);
  const updatedChecklistItem = req.body;

  const user = db.userData.find(user => user.id === userId);
  if (user) {
    const index = user.checklist.findIndex(item => item.id === checklistId);
    if (index !== -1) {
      user.checklist[index] = { ...user.checklist[index], ...updatedChecklistItem };
      saveDatabase();
      res.status(200).json(user.checklist[index]);
    } else {
      res.status(404).json({ message: 'Item da checklist não encontrado' });
    }
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Deletar item na checklist
app.delete('/userData/:userId/checklist/:checklistId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const checklistId = parseInt(req.params.checklistId);

  const user = db.userData.find(user => user.id === userId);
  if (user) {
    const index = user.checklist.findIndex(item => item.id === checklistId);
    if (index !== -1) {
      user.checklist.splice(index, 1);
      saveDatabase();
      res.status(200).json({ message: 'Item da checklist deletado' });
    } else {
      res.status(404).json({ message: 'Item da checklist não encontrado' });
    }
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
