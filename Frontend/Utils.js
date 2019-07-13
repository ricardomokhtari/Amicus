// Doc containing functions for capturing client audio

class Recording {
    constructor (onLoadError) {

        this._audioInput = null;
        this._processor = null;
        this._onLoadError = onLoadError;
        this._started = false;
        this._handleSuccess = null;
        this._bufferSize = 1024;
        this._chunkObject = [];
    
    }

    start() {
        if (this._started) {
            throw new Error('Already started!');
        }

        this._audioContext = this._getAudioContext();
        this._started = true;

        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(this._handleStream.bind(this));
    }

    _handleStream(stream) {
        //Original Code
        this._activeStream = stream;
        // This is where the media strea source is initialised. Will need to replace mic stream with dongle stream
        this._audioInput = this._audioContext.createMediaStreamSource(stream);
        this._processor = this._audioContext.createScriptProcessor(
            this._bufferSize,
            1,
            1
        );
        this._processor.onaudioprocess = this._processMicrophone.bind(
            this
        );

        this._audioInput.connect(this._processor);
        this._processor.connect(this._audioContext.destination);
    }

    _processMicrophone(event) {
        
        const originalBuffer = event.inputBuffer.getChannelData(0); // (for use of internal microphone's audio)
        const chunkBuffer = this._getChunkBuffer(originalBuffer);

        this._chunkObject.push(chunkBuffer);

        console.log(this._chunkObject);
    }

    _getChunkBuffer(buffer) {
        /* This might be neccessary unsure. 
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

    _getAudioContext() {
        return new (window.AudioContext || window.webkitAudioContext)();
    }

    stop() {
        if (!this._started) {
            throw new Error('Already stopped!');
        }
        console.log("Recording Stopped");
        this._reset();
    }

    _reset() {
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