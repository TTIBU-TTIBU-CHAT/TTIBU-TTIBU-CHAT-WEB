import '../styles/Features.css';

function Features() {
  const features = [
    {
      title: "붙이기",
      description: [
        "대화를 선으로 이어붙여 흐름을 시각화하세요.",
        "메시지 간의 관계를 직접 연결하며, '이 말이 왜 나왔는가'를",
        "한눈에 이해할 수 있습니다."
      ]
    },
    {
      title: "떼기",
      description: [
        "불필요한 연결은 손쉽게 분리하세요.",
        "맥락이 달라진 대화, 새로운 흐름을 만들고 싶을 때",
        "클릭 한 번으로 관계를 끊고 다시 시작할 수 있습니다."
      ]
    },
    {
      title: "그룹화",
      description: [
        "비슷한 대화나 아이디어를 하나로 묶어보세요.",
        "주제별, 맥락별로 정리된 대화 덩어리를 만들면",
        "복잡한 대화도 단번에 구조화됩니다."
      ]
    },
    {
      title: "분기",
      description: [
        "대화의 특정 지점에서 새로운 방향으로 분기하여",
        "다양한 시나리오를 탐색하세요."
      ]
    }
  ];

  return (
    <section id="features" className="features">
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className={`feature-row ${index % 2 === 0 ? 'row-left' : 'row-right'}`}>
            {index % 2 === 0 ? (
              <>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <div className="feature-description">
                    {feature.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="feature-image">
                  <div className="image-placeholder"></div>
                </div>
              </>
            ) : (
              <>
                <div className="feature-image">
                  <div className="image-placeholder"></div>
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <div className="feature-description">
                    {feature.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
