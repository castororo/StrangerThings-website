import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [isFading, setIsFading] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Mimic initialization/intro duration
    const timeout = setTimeout(() => {
      setIsFading(true);
      // Wait for fade out animation to complete before unmounting
      setTimeout(() => {
        setShouldRender(false);
      }, 800);
    }, 2800); // 2.8s intro duration

    return () => clearTimeout(timeout);
  }, []);

  if (!shouldRender) return null;

  return (
    <div id="loading-screen" className={isFading ? 'fade-out' : ''}>
      <div className="loading-fog"></div>
      <div className="loading-static"></div>
      <div className="loading-content">
        <h1 className="loading-title">CASTORORO</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
