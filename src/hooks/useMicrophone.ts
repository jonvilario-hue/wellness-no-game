
'use client';

import { useState, useCallback, useEffect } from 'react';

export function useMicrophone() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isPermitted, setIsPermitted] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestPermission = useCallback(async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Browser does not support microphone access.');
      }

      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(micStream);
      setIsPermitted(true);
      setError(null);
      return micStream;
    } catch (err: any) {
      setIsPermitted(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Microphone access denied. Please enable it in your browser settings.');
      } else {
        setError(err.message || 'Could not access microphone.');
      }
      return null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return { stream, isPermitted, error, requestPermission };
}
