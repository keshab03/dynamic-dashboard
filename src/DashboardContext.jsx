// src/context/DashboardContext.js
import React, { createContext, useState } from 'react';
import { initialData } from './widgetsData';

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [categories, setCategories] = useState(initialData.categories);

  const addWidget = (categoryId, widget) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, widget] }
          : category
      )
    );
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: category.widgets.filter(w => w.id !== widgetId) }
          : category
      )
    );
  };

  return (
    <DashboardContext.Provider value={{ categories, addWidget, removeWidget }}>
      {children}
    </DashboardContext.Provider>
  );
};