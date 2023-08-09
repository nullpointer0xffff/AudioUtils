import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import Record from './Record';
import Transcribe from './Transcribe';
import Summarize from './Summarize';

const Home = () => {
  return (
    <div>
      <h1>Web Portal</h1>
      <Pivot>
        <PivotItem headerText="Recording">
          <Record />
        </PivotItem>
        <PivotItem headerText="Transcribe">
          <Transcribe />
        </PivotItem>
        <PivotItem headerText="Summarize">
          <Summarize />
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default Home;
