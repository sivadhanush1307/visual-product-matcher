import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import Results from './components/Results';

function App() {
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleResults(res, previewSrc) {
    setData(res);
    setPreview(previewSrc);
  }

  return (
    <div className="App">
      <header><h2>Visual Product Matcher</h2></header>
      <main>
        <UploadForm onResults={handleResults} />
        <Results data={data} preview={preview} />
      </main>
      <footer style={{ textAlign: 'center', padding: '12px' }}>Demo - Visual Product Matcher</footer>
    </div>
  );
}

export default App;
