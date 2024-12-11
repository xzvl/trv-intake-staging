const WebSocket = require('ws');
const wav = require('wav');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  const fileWriter = new wav.FileWriter('output.wav', {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16,
  });

  ws.on('message', function incoming(message) {
    // Simulate transcription
    // Here we just write the audio data to a file
    const audioData = new Int16Array(message);
    const buffer = Buffer.from(audioData.buffer);
    fileWriter.write(buffer);

    // For the purpose of this demo, we'll just echo back a placeholder text
    ws.send('Transcribed text: ...');
  });

  ws.on('close', function close() {
    console.log('WebSocket closed.');
    fileWriter.end();
  });
});

console.log('WebSocket server started on ws://localhost:8080');