export function ShareHero({ isAuthenticated }) {
  return (
    <section className="share-hero">
      <div className="share-hero-content">
        <h1>띠부 공유</h1>
        <p className="share-hero-subtitle">
          다른 사용자들과 유용한 대화를 JSON으로 공유하세요.
        </p>
        {!isAuthenticated && (
          <p className="share-hero-note" aria-live="polite">
            업로드는 로그인 후 이용할 수 있습니다.
          </p>
        )}
      </div>
    </section>
  );
}
