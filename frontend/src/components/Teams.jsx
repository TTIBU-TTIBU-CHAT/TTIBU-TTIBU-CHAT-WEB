import React from 'react';
import { team } from '../data/team.js';
import '../styles/Teams.css';

const Teams = () => {
  return (
    <section id="teams" className="teams">
      <div className="teams-container">
        <div className="section-header">
          <h2>팀 소개</h2>
          <p>띠부띠부 챗을 만들어가는 팀원들을 소개합니다</p>
        </div>
        
        <div className="team-grid">
          {team.map((member, index) => (
            <div key={index} className="team-card">
              <div className="member-avatar">
                <span>{member.name.charAt(0)}</span>
              </div>
              <h3>{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-description">{member.description}</p>
              <div className="member-links">
                <a 
                  href={member.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teams;