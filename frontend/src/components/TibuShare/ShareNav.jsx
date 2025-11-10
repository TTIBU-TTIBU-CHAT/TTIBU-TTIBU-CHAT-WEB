export function ShareNav({ onBack }) {
  return (
    <nav className="tibu-share-nav">
      <button className="back-button" onClick={onBack}>
        ← 뒤로가기
      </button>
      <h1>띠부 공유</h1>
    </nav>
  );
}
