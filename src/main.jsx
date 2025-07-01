import { createRoot } from 'react-dom/client';

const App = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>GVEC Link Capacity System</h1>
      <p>Frontend rebuilding in progress...</p>
      <p>Backend API running on port 5000</p>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);
