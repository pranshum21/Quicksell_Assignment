import React, { useState, useEffect } from 'react';
import DisplayOptions from './DisplayOptions';
import Column from './Column';
import '../src/styles/KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
  const [ordering, setOrdering] = useState(localStorage.getItem('ordering') || 'priority');

  const statusLabels = {
    todo: { label: 'Todo', icon: '/To-do.svg' },
    'in progress': { label: 'In Progress', icon: '/in-progress.svg' },
    backlog: { label: 'Backlog', icon: '/Backlog.svg' },
    done: { label: 'Done', icon: '/Done.svg' },
    canceled: { label: 'Canceled', icon: '/Cancelled.svg' }
  };

  const priorityLabels = {
    4: { label: 'Urgent', icon: '/urgent.svg' },
    3: { label: 'High', icon: '/high.svg' },
    2: { label: 'Medium', icon: '/medium.svg' },
    1: { label: 'Low', icon: '/low.svg' },
    0: { label: 'No Priority', icon: '/No-priority.svg' }
  };

  const statusOrder = ['Todo', 'In Progress', 'Backlog', 'Done', 'Canceled'];
  const priorityOrder = ['No Priority', 'Urgent', 'High', 'Medium', 'Low'];

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem('ordering', ordering);
  }, [ordering]);

  const userMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  const enrichedTickets = tickets.map(ticket => ({
    ...ticket,
    user: userMap[ticket.userId] || 'Unassigned',
  }));

  const groupTickets = () => {
    const grouped = {};
    switch (grouping) {
      case 'user':
        enrichedTickets.forEach(ticket => {
          const key = ticket.user || 'Unassigned';
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(ticket);
        });
        break;
      case 'priority':
        enrichedTickets.forEach(ticket => {
          const key = priorityLabels[ticket.priority]?.label || 'No Priority';
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(ticket);
        });
        break;
      default:
        statusOrder.forEach(status => {
          grouped[statusLabels[status.toLowerCase()].label] = [];
        });
        enrichedTickets.forEach(ticket => {
          const key = statusLabels[ticket.status.toLowerCase()]?.label || 'Todo';
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(ticket);
        });
    }
    return grouped;
  };

  const sortTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (ordering === 'priority') {
        return b.priority - a.priority;
      }
      if (ordering === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  };

  const groupedTickets = groupTickets();

  const groupOrder = grouping === 'status' 
    ? statusOrder.map(status => statusLabels[status.toLowerCase()].label)
    : grouping === 'priority' 
    ? priorityOrder
    : Object.keys(groupedTickets);

  return (
    <> 
      <DisplayOptions grouping={grouping} ordering={ordering} setGrouping={setGrouping} setOrdering={setOrdering} />
      <div className="kanban-container">
        <div className="kanban-board">
          {groupOrder
            .filter(group => groupedTickets[group])
            .map(group => {
              let icon = '';
              if (grouping === 'status') {
                icon = statusLabels[group.toLowerCase()]?.icon;
              } else if (grouping === 'priority') {
                icon = Object.values(priorityLabels).find(labelObj => labelObj.label === group)?.icon;
              }
              return (
                <Column
                  key={group}
                  group={group}
                  icon={icon}
                  tickets={sortTickets(groupedTickets[group])}
                  grouping={grouping}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};

export default KanbanBoard;
