import "./loader.css";

const Loader = () => {
  return (
    <div className="nexo-loader-root" role="status" aria-live="polite">
      {/* <div className="nexo-loader-card"> */}
        {/* <div className="nexo-spinner" aria-hidden /> */}

        <div className="nexo-loader-text" aria-hidden>
          <div className="nexo-word" role="img" aria-label="Loading N E X O">
            <span className="nexo-letter">N</span>
            <span className="nexo-letter">E</span>
            <span className="nexo-letter">X</span>
            <span className="nexo-letter">O</span>
          </div>
        </div>

        {/* Accessible text for screen readers */}
        <span className="sr-only">Loading NEXO</span>
      </div>
    // </div>
  );
};

export default Loader;
