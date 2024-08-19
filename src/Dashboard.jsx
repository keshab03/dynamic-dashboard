// src/components/Dashboard.js
import React, { useContext, useState } from 'react';
import { DashboardContext } from './DashboardContext';

import './dashboard.css'; // Import the CSS file for styling

function Dashboard() {
  const { categories, addWidget, removeWidget } = useContext(DashboardContext);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddWidget = () => {
    const newWidget = {
      id: Date.now(),
      name: newWidgetName,
      text: newWidgetText,
    };
    addWidget(selectedCategoryId, newWidget);
    setNewWidgetName('');
    setNewWidgetText('');
  };

  const filteredCategories = categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h2>Dashboard</h2>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <input
            type="text"
            placeholder="Search Widgets"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <div className="category-list">
            {categories.map((category) => (
              <div key={category.id} className="category-item">
                <h2>{category.name}</h2>
              </div>
            ))}
          </div>
        </aside>
        <main className="dashboard-main">
          {filteredCategories.map((category) => (
            <div key={category.id} className="category">
              <h2>{category.name}</h2>
              <div className="widgets">
                {category.widgets.length > 0 ? (
                  category.widgets.map((widget) => (
                    <div key={widget.id} className="widget">
                      <h3>{widget.name}</h3>
                      <p>{widget.text}</p>
                      <button
                        className="remove-button"
                        onClick={() => removeWidget(category.id, widget.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No widgets found</p>
                )}
              </div>
            </div>
          ))}
        </main>
      </div>
      <div className="add-widget">
        <h3>Add Widget</h3>
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Widget Name"
          value={newWidgetName}
          onChange={(e) => setNewWidgetName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={newWidgetText}
          onChange={(e) => setNewWidgetText(e.target.value)}
        />
        <button onClick={handleAddWidget}>Add Widget</button>
      </div>
    </div>
  );
}

export default Dashboard;
