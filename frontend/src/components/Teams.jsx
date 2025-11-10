import { team } from '../data/team';
import '../styles/Teams.css';

function Teams() {
  return (
    <section id="teams" className="teams">
      <div className="teams-container">
        <h2 className="section-title">팀 소개</h2>
        <p className="teams-description">
          띠부띠부챗을 만들어가는 멋진 팀원들을 소개합니다.
        </p>
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="team-avatar">👤</div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="team-link"
              >
                GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Teams;
