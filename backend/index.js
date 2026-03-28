import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import userRoutes from './routes/UserRoutes.js';
import fs from 'fs';
import axios from 'axios';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aiavatar').then(() => {
  console.log('MongoDB connected successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/users', userRoutes);

// Storage for custom uploaded photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Professional endpoint for generating video using an external AI Video Generator API
app.post('/api/generate', upload.single('photo'), async (req, res) => {
  try {
    const { script, presetAvatarId } = req.body;
    const uploadedPhoto = req.file;

    if (!script) {
      return res.status(400).json({ success: false, error: 'Script is required' });
    }

    console.log('--- New Video Generation Request ---');
    console.log('- Script:', script);
    
    // Read the uploaded file to pass to the API
    let imageBase64 = null;
    let mimeType = null;

    if (presetAvatarId === 'upload' && uploadedPhoto) {
      console.log('- Uploaded Photo:', uploadedPhoto.filename);
      const photoPath = path.join(__dirname, 'uploads', uploadedPhoto.filename);
      const fileData = fs.readFileSync(photoPath);
      imageBase64 = fileData.toString('base64');
      mimeType = uploadedPhoto.mimetype;
    } else {
      console.log('- Preset Avatar ID:', presetAvatarId);
      // In a real app we would load preset image data here
    }

    // Use ANAM_API_KEY (or heygen/did api key) from .env
    const apiKey = process.env.ANAM_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ success: false, error: 'API key not configured' });
    }

    let sourceUrl = '';
    if (presetAvatarId !== 'upload' && presetAvatarId) {
       const presetAvatars = [
         { id: '1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200' },
         { id: '2', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200' },
         { id: '3', url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=200&h=200' },
         { id: '4', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200' },
       ];
       const preset = presetAvatars.find(p => p.id === presetAvatarId);
       sourceUrl = preset ? preset.url : '';
    } else if (imageBase64) {
       sourceUrl = `data:${mimeType};base64,${imageBase64}`;
    }

    try {
      console.log('Calling external AI Video API (Anam / D-ID)...');
      
      const authHeader = apiKey.includes(':') 
          ? `Basic ${Buffer.from(apiKey).toString('base64')}` 
          : `Bearer ${apiKey}`;

      const talkResponse = await axios.post('https://api.d-id.com/talks', {
        script: {
          type: "text",
          input: script,
          provider: { type: "microsoft", voice_id: "en-US-JennyNeural" }
        },
        source_url: sourceUrl
      }, {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        }
      });

      const talkId = talkResponse.data.id;
      console.log('Video generation started with ID:', talkId);

      // Polling for the video result
      let videoUrl = null;
      let status = 'created';
      let retries = 0;

      while ((status === 'created' || status === 'started') && retries < 20) {
        await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3 seconds
        
        const statusResponse = await axios.get(`https://api.d-id.com/talks/${talkId}`, {
          headers: { 'Authorization': authHeader }
        });
        
        status = statusResponse.data.status;
        console.log(`Polling status: ${status}`);
        
        if (status === 'done') {
          videoUrl = statusResponse.data.result_url;
          break;
        } else if (status === 'error' || status === 'rejected') {
          throw new Error('API returned error status: ' + status);
        }
        
        retries++;
      }

      if (videoUrl) {
         return res.status(200).json({
          success: true,
          message: 'Video generation complete',
          data: {
            videoUrl: videoUrl,
            id: talkId
          }
        });
      } else {
        throw new Error("Polling timeout, video took too long to generate");
      }

    } catch (apiError) {
      console.error('API Process/Error:', apiError.response?.data || apiError.message);
      // Return 200 so axios doesn't throw an error on the frontend, allowing for graceful alerts
      res.status(200).json({ success: false, error: 'API Error: The AI video service rejected the request (likely due to an invalid or missing API Key). Please verify your API key.' });
    }

  } catch (error) {
    console.error('Error generating video:', error);
    // General server error
    res.status(200).json({ success: false, error: 'Internal Server Error during video generation' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running precisely at http://localhost:${PORT}`);
});
