// Check if the browser supports required APIs
if (!navigator.mediaDevices || !window.AudioContext) {
    alert('Your browser does not support required APIs.');
  }
  
  const recordButton = document.getElementById('recordButton');
  const statusDiv = document.getElementById('status');
  const transcriptDiv = document.getElementById('transcript');
  
  let audioContext;
  let mediaStream;
  let sourceNode;
  let processorNode;
  let websocket;
  let isRecording = false;
  
  recordButton.addEventListener('click', async () => {
    if (!isRecording) {
      await startRecording();
    } else {
      stopRecording();
    }
  });
  
  async function startRecording() {
    try {
      // Request microphone access
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
      // Load the AudioWorklet module
      await audioContext.audioWorklet.addModule('raw-pcm-worker.js');
  
      // Create nodes
      sourceNode = audioContext.createMediaStreamSource(mediaStream);
      processorNode = new AudioWorkletNode(audioContext, 'raw-pcm-worklet');
  
      // Handle audio data from the processor
      processorNode.port.onmessage = (event) => {
        const audioData = event.data;
        if (websocket && websocket.readyState === WebSocket.OPEN) {
          websocket.send(audioData);
        }
      };
  
      // Connect nodes
      sourceNode.connect(processorNode);
      processorNode.connect(audioContext.destination); // Optional, for monitoring
  
      // Open WebSocket connection to the server
      websocket = new WebSocket('ws://localhost:8080');
      websocket.binaryType = 'arraybuffer';
  
      websocket.onopen = () => {
        statusDiv.textContent = 'Recording...';
      };
  
      websocket.onmessage = (event) => {
        const transcriptText = event.data;
        transcriptDiv.textContent += transcriptText + '\n';
      };
  
      websocket.onclose = () => {
        statusDiv.textContent = 'WebSocket closed.';
      };
  
      websocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      // Monitor AudioContext state
      audioContext.onstatechange = () => {
        if (audioContext.state === 'suspended') {
          resumeAudioContext();
        }
      };
  
      // Attempt to keep the AudioContext active
      monitorAudioContext();
  
      isRecording = true;
      recordButton.textContent = 'Stop Recording';
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please check permissions.');
    }
  }
  
  function stopRecording() {
    // Stop the audio processing
    if (processorNode) {
      processorNode.disconnect();
      processorNode = null;
    }
    if (sourceNode) {
      sourceNode.disconnect();
      sourceNode = null;
    }
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      mediaStream = null;
    }
    if (websocket) {
      websocket.close();
      websocket = null;
    }
    isRecording = false;
    recordButton.textContent = 'Start Recording';
    statusDiv.textContent = 'Recording stopped.';
  }
  
  async function resumeAudioContext() {
    try {
      await audioContext.resume();
      console.log('AudioContext resumed.');
    } catch (error) {
      console.error('Failed to resume AudioContext:', error);
    }
  }
  
  function monitorAudioContext() {
    if (audioContext && audioContext.state !== 'closed') {
      // Attempt to resume AudioContext if suspended
      if (audioContext.state === 'suspended') {
        resumeAudioContext();
      }
  
      // Keep processor node active
      if (processorNode) {
        processorNode.port.postMessage('keepAlive');
      }
  
      // Call this function periodically
      setTimeout(monitorAudioContext, 1000);
    }
  }