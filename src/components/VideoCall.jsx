import React, { useEffect, useRef } from 'react';

export default function VideoCall() {
  // Create a ref to track if the API has been initialized
  const apiRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script if it hasn't been loaded already
    if (!scriptLoadedRef.current && !window.JitsiMeetExternalAPI) {
      const loadJitsiScript = () => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://meet.jit.si/external_api.js';
          script.async = true;
          script.onload = () => {
            scriptLoadedRef.current = true;
            resolve();
          };
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      loadJitsiScript()
        .then(() => initializeJitsi())
        .catch((error) => {
          console.error('Error loading Jitsi API:', error);
        });
    } else if (window.JitsiMeetExternalAPI && !apiRef.current) {
      // If script is already loaded but API not initialized
      initializeJitsi();
    }

    // Initialize Jitsi Meet
    function initializeJitsi() {
      // Check if container exists and API is not already initialized
      const parentNode = document.getElementById('jitsi-container');
      if (parentNode && !apiRef.current && window.JitsiMeetExternalAPI) {
        const domain = 'meet.jit.si';
        const roomName = 'VirtualClassroomRoom';
        const width = '100%';
        const height = '100%';

        const options = {
          roomName: roomName,
          width: width,
          height: height,
          parentNode: parentNode,
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
          },
          interfaceConfigOverwrite: {
            filmStripOnly: false,
          },
        };

        // Store API reference to prevent multiple initializations
        apiRef.current = new window.JitsiMeetExternalAPI(domain, options);

        apiRef.current.addEventListener('videoConferenceJoined', () => {
          console.log('Jitsi video conference started');
        });
      }
    }

    // Cleanup function for component unmount
    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, []);

  return (
    <div id="jitsi-container" className="video-call-container">
      <h2>Loading Video Call...</h2>
    </div>
  );
}
