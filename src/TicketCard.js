import React from 'react';
import '../src/styles/TicketCard.css';

const TicketCard = ({ ticket, grouping }) => {
  
  const statusIcons = {
    todo: '/To-do.svg',
    'in progress': '/in-progress.svg',
    backlog: '/Backlog.svg',
    done: '/Done.svg',
    canceled: '/Cancelled.svg',
  };

  const statusIcon = statusIcons[ticket.status.toLowerCase()] || '/default-icon.svg';

  return (
    <div className="ticket-card">
      <div className="ticket-header">
     
        
        <span className="ticket-id">{ticket.id}</span>
      </div>
      <h3 className="ticket-title">
      {grouping !== 'status' && (
          <img src={statusIcon} alt={`${ticket.status} icon`} className="status-icon" />
        )}
        {ticket.title}
      </h3>
      <div className="ticket-tag">
        
        <span className="tag-text">{ticket.tag[0]}</span>
      </div>
      
      {ticket.user && (
        <img
          src={`/avatars/${ticket.user.toLowerCase()}.svg`} 
          alt={ticket.user}
          className="ticket-avatar"
        />
      )}
    </div>
  );
};

export default TicketCard;
