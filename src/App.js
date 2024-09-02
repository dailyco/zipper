import * as zip from "@zip.js/zip.js";
import React from "react";

function App() {
  const [zipInfo, setZipInfo] = React.useState({ name: '', url: '' });
  const writer = new zip.ZipWriter(new zip.Data64URIWriter("application/zip"));

  return (
    <div className="App">
      <input
        type="file"
        webkitdirectory=""
        multiple
        onChange={async (e) => {
          const { files } = e.target;

          for (let i = 0; i < files.length; i++) {
            const buffer = await files[i].arrayBuffer();
            const blob = new Blob([buffer], { type: files[i].type });
            await writer.add(files[i].webkitRelativePath, new zip.BlobReader(blob));
            console.log(files[i].webkitRelativePath);
          }

          const name = files[0].webkitRelativePath.split('/')[0];
          const url = await writer.close();
          setZipInfo({ name, url });
        }}
      />

      <button
        disabled={!zipInfo.url}
        onClick={() => {
          const a = document.createElement('a');

          a.href = zipInfo.url;
          a.download = zipInfo.name;
          a.click();
        }}
      >
        Download .zip
      </button>
    </div>
  );
}

export default App;
