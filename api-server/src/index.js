import app from './app.js'
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));