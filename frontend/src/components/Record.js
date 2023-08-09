import React, { useState } from 'react';
import { PivotItem, DefaultButton } from '@fluentui/react';
import './Record.css';

const Record = () => {
  const [recording, setRecording] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const handleRecordClick = () => {
    if (isRecording && recorder) {
      recorder.stop();
      setIsRecording(false);
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];
        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/wav' });
          setRecording(blob);
        };
        mediaRecorder.start();
        setRecorder(mediaRecorder);
        setIsRecording(true);
      });
    }
  };

  const downloadRecording = () => {
    const url = URL.createObjectURL(recording);
    const timestamp = new Date().getTime();
    const filename = `recording_${Math.random().toString(36).substr(2, 9)}_${timestamp}.wav`;
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  return (
    <PivotItem headerText="Recording" className="tab-content">
      <div className="record-buttons">
        <DefaultButton
          text={isRecording ? 'Stop' : 'Record'}
          onClick={handleRecordClick}
          className="record-button"
          style={{ backgroundColor: isRecording ? 'gray' : 'red', color: 'white' }}
        />
        {!isRecording && recording && (
          <>
            <DefaultButton text="Download Audio" onClick={downloadRecording} className="record-button" />
            <DefaultButton text="Transcribe Audio" onClick={() => alert('Transcribe logic goes here!')} className="record-button" />
          </>
        )}
      </div>
    </PivotItem>
  );
};

export default Record;
