const express = require('express');
const googleTTS = require('google-tts-api');
const path = require('path');

const app = express();
const port = 3000;

// Serve the audio files as static content
app.use(express.static(path.join(__dirname, 'public')));

// Handle /generate-tts-[word] route
app.get('/generate-tts-:text', (req, res) => {
    const text = req.params.text;
    
    // Generate the URL for the TTS audio
    const url = googleTTS.getAudioUrl(text, {
        lang: 'en',
        slow: false,
        host: 'https://translate.google.com',
    });

    // Redirect the browser to the audio file
    res.redirect(url);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
