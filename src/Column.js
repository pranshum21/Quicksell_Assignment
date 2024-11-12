import React from 'react';
import TicketCard from './TicketCard';
import '../src/styles/Column.css';

const Column = ({ group, icon, tickets, grouping }) => (
  <div className="column">
    <div className="column-header">
      <img src={icon} alt={`${group} icon`} className="column-icon" />
      <span className="column-title">{group}</span>
      <span className="ticket-count">{tickets.length}</span>
      <div className="action-icons">
        <img src="/add.svg" alt="Add icon" className="plus-icon" />
        <img src="/3_dot.svg" alt="More options icon" className="dots-icon" />
      </div>
    </div>
    {tickets.map(ticket => (
      <TicketCard key={ticket.id} ticket={ticket} grouping={grouping} />
    ))}
  </div>
);

export default Column;
