#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug  7 18:14:27 2019

@author: Ricardo
"""

# Importing libraries
import speech_recognition as sr
import librosa
import wavio

# prepare data for recognition API
Data, SR = librosa.load('x0.wav')               # raw .wav file imported
wavio.write('x0.wav', Data, SR, sampwidth = 2)  # raw .wav has float values, wavio.write converts to ints

# create object of Recognizer class
r = sr.Recognizer()

# read in the modified .wav file
data = sr.AudioFile('x0.wav')

# extract audio information
with data as source:
    audio = r.record(source)

# use google API to convert sound to text
text = r.recognize_google(audio)
print(text)