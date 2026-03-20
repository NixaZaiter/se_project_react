import "./Loading.css";

export default function LoadingPage({ message = "Loading...", fullScreen = true }) {
  return (
    <div
      className={`loading ${fullScreen ? "loading_fullscreen" : ""}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="loading__spinner" aria-hidden="true" />
      <p className="loading__message">{message}</p>
    </div>
  );
}