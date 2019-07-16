/*
This contains the 'Recording' class which will be used for capturing client audio and piping it to 
whatever ML/AI script or server we set up. If you want to get a better grasp of the audio API just
console.log() different objects/functions in the pathway to help see how it all fits together. 
*/
// const WaveFile = require('wavefile');

class Audio_Pipe {
    constructor (onLoadError) {
        // Initialises all global variables within the class
        this._audioInput = null;
        this._processor = null;
        this._onLoadError = onLoadError;
        this._started = false;
        this._handleSuccess = null;
        this._bufferSize = 1024;
        this._wavBuffer = [];
    
    }

    start() {
        console.log('Recording started')
        // AudioContext for creating audio nodes and processing.
        this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
        // This is the request for capturing microphone audio.
        navigator.mediaDevices.getUserMedia({ audio: true })
            // This binds the audio stream to the function _handleStream.
            .then(this._handleStream.bind(this));
    }

    _handleStream(stream) {
        // This is the audio stream object. 
        this._activeStream = stream;
        // Creates an audio node for the media stream (audio data requires a AudioContext).
        this._audioInput = this._audioContext.createMediaStreamSource(stream);
        // Deprecated but sill functional. Creates a ScriptProcessorNode used for direct audio processing. Alternatively can use AudioWorkletNode method. 
        this._processor = this._audioContext.createScriptProcessor(this._bufferSize, 1, 1);
        // Every time the buffer is sent run _processMicrophone(buffer)
        this._processor.onaudioprocess = this._processMicrophone.bind(this);
        
        // This is only neccessary to pipe live data somewhere. 
        this._audioInput.connect(this._processor);
        this._processor.connect(this._audioContext.destination);
    }

    _processMicrophone(event) {
        // originalBuffer is the raw data from the microphone's buffer. This is an Float32Array of sound intensities
        const originalBuffer = event.inputBuffer.getChannelData(0); 
        // chunkBuffer will be whatever data processing we need to do (shall explain)
        const chunkBuffer = this._getChunkBuffer(originalBuffer);

        console.log(chunkBuffer);

        this._wavBuffer.push(chunkBuffer);
    }

    _getChunkBuffer(buffer) {
        /* This might be neccessary for audio data processing - will figure out later once the ML is tested. 

        // buffer.length == 4096
        const chunk = new ArrayBuffer(buffer.length * 2);
        let offset = 0;
        const output = new DataView(chunk);
        // Converts data from floats to 16bitPCM and down to 16KHz
        for (let i = 0; i < buffer.length; i += 1, offset += 2) {
            // All this function does is check that -1<buffer[i]<1
            const s = Math.max(-1, Math.min(1, buffer[i]));
            // .setInt16(byteoffset (how many bytes of space this value will take), value to set to this offset, littleEndian==true or littleEndian==false) 
            // if s less than 0: s * 0x8000 (32768); else: s * 0x7fff (32767)
            // Converts from Float32 to Int16. 
            output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }
        // converts raw bytes to Uint8Array
        return new Uint8Array(chunk);
        */
       return buffer; 
    }

    stop() {
        console.log("Recording stopped");
        this._reset();

    }

    _reset() {
        // This just resets everything and stops the code 'listening' to the microphone. 
        this._chunkObject = [];
  
        this._audioInput = null;
        this._processor = null;
        if (this._audioContext) {
            this._audioContext.close();
            this._audioContext = null;
        }

        if (this._activeStream) {
            this._activeStream.getAudioTracks()[0].stop();
            this._activeStream = null;
        }
        this._started = false;
    }
}