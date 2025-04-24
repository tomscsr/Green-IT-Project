USE green_actions_db;

DROP TABLE IF EXISTS user_actions;
DROP TABLE IF EXISTS actions;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE actions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  points INT NOT NULL,
  carbon_saved FLOAT COMMENT 'in grams of CO2 saved'
);

CREATE TABLE user_actions (
  id INT AUTO_INCREMENT PRIMARY KEY, -- Identifiant unique pour chaque action
  user_id INT, -- Référence à l'utilisateur
  action_id INT, -- Référence à l'action
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date et heure de l'action
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (action_id) REFERENCES actions(id) ON DELETE CASCADE
);

INSERT INTO actions (name, description, points, carbon_saved) VALUES
('Used a bike instead of a car', 'Choosing a bike reduces CO₂ emissions from car usage.', 10, 150.0),
('Recycled waste', 'Properly separated and recycled household or office waste.', 5, 50.0),
('Took a short shower', 'Reducing water and heating usage by limiting shower time.', 7, 30.0),
('Turned off unnecessary lights', 'Saved electricity by switching off lights not in use.', 3, 20.0),
('Used public transportation', 'Reduced individual emissions by riding shared transport.', 8, 100.0),
('Composted organic waste', 'Diverted biodegradable waste from landfills.', 6, 40.0),
('Used reusable shopping bags', 'Reduced plastic waste from single-use bags.', 4, 10.0),
('Ate a vegetarian meal', 'Lower carbon footprint compared to meat-based meals.', 6, 80.0),
('Worked remotely', 'Avoided commuting emissions by staying home.', 7, 120.0),
('Unplugged electronics overnight', 'Cut phantom power usage while sleeping.', 3, 25.0);
	
INSERT INTO users (name, email, password, role) 
VALUES ('Admin', 'admin@admin.com', 'admin', 'admin');
