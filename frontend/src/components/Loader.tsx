
const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="loader"></div>

      <style>{`
        .loader {
          border: 6px solid #e5e7eb;
          border-top: 6px solid #4f46e5;
          border-radius: 50%;
          width: 55px;
          height: 55px;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
