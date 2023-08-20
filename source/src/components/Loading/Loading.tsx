import './style.css'

export default function Loading() {
  return (
    <div className="progress-cover">
      <progress className="progress is-small is-primary" max={100}>Loading</progress>
    </div>
  );
}
