#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jul 15 13:47:17 2019

@author: Ricardo
"""

import librosa
import numpy as np
import matplotlib.pyplot as plt 
import librosa.display
import os
import pandas as pd

""" Code below used for loading and visualising .wav files """

# data, sampling_rate = librosa.load('train/Train/2022.wav')

#plt.figure(figsize=(12, 4))
#librosa.display.waveplot(data, sr = sampling_rate)

#train is a dataframe containing item ID and Class
train = pd.read_csv('train/train.csv')

# the parser function converts .wav files to numpy arrays with associated label
def parser(row):
    
   # function to load files and extract features
   file_name = os.path.join(os.path.abspath('"""___DATA_DIR_PLUS_ONE___"""'), '"""___DATA_DIR___"""', str(row.ID) + '.wav')

   # handle exception to check if there isn't a file which is corrupted
   
   try:
       
      # here kaiser_fast is a technique used for faster extraction
      # librosa.load returns a numpy array (amplitudes) and the sample rate of the .wav's
      
      X, sample_rate = librosa.load(file_name, res_type='kaiser_fast')
      
      # we extract MFCC features from data
      
      # MFCC (Mel Frequency Cepstral Coefficient) is a method of representing an audio signal
      # in the frequency domain
      # the MFCCs together make up the Mel Frequency Ceptrum (the representation), which is
      # the power spectrum of the audio signal
      # The MFC is derived by taking the Fourier Transform of the audio signal, mapping the
      # resulting power signal onto the mel scale and then performing a cosine transform
      # the amplitudes of the cosine transform are the MFCCs
      # It is much more efficient to handle audio signals in this way
      
      mfccs = np.mean(librosa.feature.mfcc(y=X, sr=sample_rate, n_mfcc=40).T,axis=0) 
      
   except Exception:
      print("Error encountered while parsing file: ", file_name)
      return None, None
 
   feature = mfccs
   label = row.Class
 
   return [feature, label]

# train.apply(function, axis) applies a function to every row or column of a dataframe
# axis = 1 means we apply the parser function to every column
temp = train.apply(parser, axis=1) # executing this line takes a long time
temp.columns = ['feature','label']

# the code below is for preparing the data and training the model - incomplete

from sklearn.preprocessing import LabelEncoder
from keras.utils import np_utils

X = np.array(train.ID.tolist())
y = np.array(train.Class.tolist())

lb = LabelEncoder()

y = np_utils.to_categorical(lb.fit_transform(y))

from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Convolution2D, MaxPooling2D
from keras.optimizers import Adam
from sklearn import metrics 

num_labels = y.shape[1]
filter_size = 2

# build model
model = Sequential()

model.add(Dense(256, input_shape=(40,)))
model.add(Activation('relu'))
model.add(Dropout(0.5))

model.add(Dense(256))
model.add(Activation('relu'))
model.add(Dropout(0.5))

model.add(Dense(num_labels))
model.add(Activation('softmax'))

model.compile(loss='categorical_crossentropy', metrics=['accuracy'], optimizer='adam')

model.fit(X, y, batch_size=32, epochs=5, validation_data=(X, y))