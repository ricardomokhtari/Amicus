#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Aug 11 10:39:22 2019

@author: Ricardo
"""

"""

Test text:
    
    Today I went to the shops to pick up the newspaper but I didn't have enough
    money. I asked the cashier to point me to the nearest bank.
    
    Keywords: Newspaper, Money/Cash, Bank
    
"""

# Importing libraries
import speech_recognition as sr
import librosa
import wavio

# prepare data for recognition API
Data, SR = librosa.load('word_association_test.wav')               # raw .wav file imported
wavio.write('word_association_test.wav', Data, SR, sampwidth = 2)  # raw .wav has float values, wavio.write converts to ints

# create object of Recognizer class
r = sr.Recognizer()

# read in the modified .wav file
data = sr.AudioFile('word_association_test.wav')

# extract audio information
with data as source:
    audio = r.record(source)

# use google API to convert sound to text
text = r.recognize_google(audio)

text = text.lower()

user_input = text.split()

score = 0

for i in range(len(user_input)):
    if user_input[i] == 'newspaper':
        score += 1
    elif user_input[i] == 'money' or user_input[i] == 'cash':
        score += 1
    elif user_input[i] == 'bank':
        score += 1
        
score = str(score)

print("Score is: " + score + "/3")