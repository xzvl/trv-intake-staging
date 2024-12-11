class RawPCMWorkletProcessor extends AudioWorkletProcessor {
    constructor() {
      super();
      this.port.onmessage = (event) => {
        // Handle messages from the main thread if necessary
      };
    }
  
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      if (input.length > 0) {
        const channelData = input[0];
        // Convert Float32Array to Int16Array
        const int16Buffer = new Int16Array(channelData.length);
        for (let i = 0; i < channelData.length; i++) {
          let s = Math.max(-1, Math.min(1, channelData[i]));
          int16Buffer[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }
        // Send audio data to the main thread
        this.port.postMessage(int16Buffer.buffer, [int16Buffer.buffer]);
      }
      return true;
    }
  }
  
  registerProcessor('raw-pcm-worklet', RawPCMWorkletProcessor);