import React, { useState, useRef } from 'react';

const ALLOWED_TYPES = ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

const VideoUploader = () => {
  const [dragActive, setDragActive] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [activeTab, setActiveTab] = useState('visualized');
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const [videoMetadata, setVideoMetadata] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        if (!ALLOWED_TYPES.includes(file.type)) {
          throw new Error('Please upload a valid video file (MP4, MOV, or AVI)');
        }
        const videoUrl = URL.createObjectURL(file);
        setVideoPreview(videoUrl);
        
        setVideoMetadata({
          name: file.name,
          type: file.type,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          lastModified: new Date(file.lastModified).toLocaleString(),
        });
        
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect({ target: { files: [file] } });
  };

  return (
    <div className="uploader-container">
      <h1>Process your videos in less time than it takes to read this.</h1>
      <p className="subtitle">See for yourself.</p>

      <div className="upload-card">
        <div className="upload-area">
          {!videoPreview ? (
            <div
              className={`dropzone ${dragActive ? 'active' : ''}`}
              onDragEnter={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="upload-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
              </div>
              <p>Drag or upload your video here</p>
              <p className="file-types">(MP4, MOV, or AVI)</p>
              <input
                type="file"
                accept={ALLOWED_TYPES.join(',')}
                onChange={handleFileSelect}
                id="video-input"
                hidden
              />
              <label htmlFor="video-input" className="upload-button">
                Choose File
              </label>
            </div>
          ) : (
            <div className="video-preview-panel">
              <video
                ref={videoRef}
                src={videoPreview}
                controls
                className="video-preview"
              />
            </div>
          )}
        </div>

        <div className="preview-area">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'visualized' ? 'active' : ''}`}
              onClick={() => setActiveTab('visualized')}
            >
              Visualized Data
            </button>
            <button 
              className={`tab ${activeTab === 'json' ? 'active' : ''}`}
              onClick={() => setActiveTab('json')}
            >
              JSON Data
            </button>
            <button className="download-button">
              Download 
            </button>
          </div>

          <div className="content-viewer">
            {videoPreview ? (
              <div className="processed-content">
                {activeTab === 'visualized' ? (
                  <div className="metadata-grid">
                    <div className="metadata-item">
                      <h3>File Name</h3>
                      <p>{videoMetadata?.name}</p>
                    </div>
                    <div className="metadata-item">
                      <h3>File Type</h3>
                      <p>{videoMetadata?.type}</p>
                    </div>
                    <div className="metadata-item">
                      <h3>File Size</h3>
                      <p>{videoMetadata?.size}</p>
                    </div>
                    <div className="metadata-item">
                      <h3>Last Modified</h3>
                      <p>{videoMetadata?.lastModified}</p>
                    </div>
                  </div>
                ) : (
                  <pre className="json-view">
                    {JSON.stringify(videoMetadata, null, 2)}
                  </pre>
                )}
              </div>
            ) : (
              <div className="empty-state">
                Upload a video to see the processed data
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .uploader-container {
          min-height: 100vh;
          background: #1a1d2b;
          padding: 2rem;
          color: white;
        }

        h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: white;
        }

        .subtitle {
          text-align: center;
          color: #4cd964;
          font-size: 1.25rem;
          margin-bottom: 3rem;
        }

        .upload-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          backdrop-filter: blur(10px);
        }

        .upload-area {
          border: 2px dashed rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dropzone {
          text-align: center;
          padding: 2rem;
          width: 100%;
        }

        .dropzone.active {
          background: rgba(76, 217, 100, 0.1);
          border-color: #4cd964;
        }

        .upload-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .file-types {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
          margin: 0.5rem 0;
        }

        .upload-button {
          display: inline-block;
          background: #4cd964;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 1rem;
        }

        .upload-button:hover {
          background: #3cb371;
        }

        .preview-area {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          overflow: hidden;
        }

        .tabs {
          display: flex;
          padding: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          gap: 1rem;
        }

        .tab {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          padding: 0.5rem 1rem;
          cursor: pointer;
          font-size: 0.9rem;
          border-bottom: 2px solid transparent;
        }

        .tab.active {
          color: #4cd964;
          border-bottom-color: #4cd964;
        }

        .download-button {
          margin-left: auto;
          background: #4cd964;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .content-viewer {
          padding: 1.5rem;
          min-height: 300px;
        }

        .video-preview-panel {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-preview {
          width: 100%;
          max-height: 400px;
          border-radius: 4px;
        }

        .empty-state {
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          padding: 2rem;
        }

        .placeholder-content {
          color: rgba(255, 255, 255, 0.6);
          text-align: center;
          padding: 2rem;
        }

        .metadata-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          padding: 1rem;
        }

        .metadata-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 8px;
        }

        .metadata-item h3 {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.5rem;
        }

        .metadata-item p {
          font-size: 1rem;
          color: white;
        }

        .json-view {
          background: rgba(0, 0, 0, 0.3);
          padding: 1rem;
          border-radius: 8px;
          color: #4cd964;
          font-family: monospace;
          white-space: pre-wrap;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};

export default VideoUploader; 