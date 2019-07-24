
# https://docs.scipy.org/doc/scipy/reference/generated/scipy.io.wavfile.write.html#r8b5f41f7cc22-1
import scipy.io.wavfile as wavfile
import numpy as np
import serial as serial
import wave
import struct
import os
import datetime


inputs = []

def write_wav(data, method=1):
    
    data = np.asarray(data, dtype=np.float32)

    #   wavfile.write(save-to file, sample rate, data)
    wavfile.write("Audio/Output.wav", 44100, data)
    return data

file = ""
data = write_wav(file, method=0)
