import React, { useState } from 'react';
import { PivotItem, DefaultButton, ProgressIndicator } from '@fluentui/react';
import { useAudio } from './AudioContext';

const Transcribe = () => {
  const { audioURL } = useAudio();
  const [audioSource, setAudioSource] = useState(null);
  const [file, setFile] = useState(null);
  const [transcribing, setTranscribing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [transcript, setTranscript] = useState(null);

  const handleAudioSourceChange = (e) => {
    setAudioSource(e.target.value);
    if (e.target.value === 'upload') {
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const startTranscribing = () => {
    // Transcribing logic will go here
  };

  return (
    <PivotItem headerText="Transcribe">
      <div>
        <div>
          <label>
            <input
              type="radio"
              name="audioSource"
              value="recorded"
              checked={audioSource === 'recorded'}
              onChange={handleAudioSourceChange}
            />
            Use Recorded Audio
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="audioSource"
              value="upload"
              checked={audioSource === 'upload'}
              onChange={handleAudioSourceChange}
            />
            Upload New Audio File
          </label>
          {audioSource === 'upload' && <input type="file" accept="audio/*" onChange={handleFileChange} />}
        </div>

        {file && (
          <DefaultButton text="Transcribe" onClick={startTranscribing} />
        )}

        {transcribing && (
          <ProgressIndicator percentComplete={progress} />
        )}

        {transcript && (
          <DefaultButton text="Download Transcript" onClick={() => alert('Download logic goes here!')} />
        )}
      </div>
    </PivotItem>
  );
};

export default Transcribe;
