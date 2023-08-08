import React, { useState } from 'react';
import { DefaultButton, Pivot, PivotItem } from '@fluentui/react';
import axios from 'axios';

const App = () => {
  const [recording, setRecording] = useState(null);
  const [recorder, setRecorder] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [summary, setSummary] = useState('');

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setRecorder(mediaRecorder);
    });
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      recorder.ondataavailable = (e) => {
        setRecording(e.data);
      };
    }
  };

  const downloadRecording = () => {
    const url = URL.createObjectURL(recording);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'recording.wav';
    link.click();
  };

  const transcribeRecording = () => {
    const formData = new FormData();
    formData.append('file', recording);
    axios.post('/upload', formData).then((response) => {
      const filePath = response.data;
      axios.get('/transcribe', { params: { file: filePath } }).then((response) => {
        setTranscription(response.data);
      });
    });
  };

  const summarizeFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('/upload', formData).then(() => {
      axios.get('/summarize').then((response) => {
        setSummary(response.data);
      });
    });
  };

  return (
    <div>
      <h1>Web Portal</h1>
      <Pivot>
        <PivotItem headerText="Recording">
          <DefaultButton text="Record" onClick={startRecording} />
          <DefaultButton text="Stop" onClick={stopRecording} />
          <DefaultButton text="Download" onClick={downloadRecording} />
          <DefaultButton text="Transcribe" onClick={transcribeRecording} />
        </PivotItem>
        <PivotItem headerText="Transcribe">
          <input type="file" onChange={(e) => transcribeRecording(e.target.files[0])} />
          <p>{transcription}</p>
        </PivotItem>
        <PivotItem headerText="Summarize">
          <input type="file" onChange={(e) => summarizeFile(e.target.files[0])} />
          <p>{summary}</p>
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default App;
