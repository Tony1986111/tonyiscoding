-- TodoApp Database Schema

-- Create tables if they don't exist
CREATE TABLE IF NOT EXISTS todoapp_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todoapp_activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  week_id VARCHAR(10) NOT NULL UNIQUE,
  activities JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todoapp_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  role VARCHAR(20),
  action VARCHAR(50) NOT NULL,
  details TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (username),
  INDEX (action),
  INDEX (timestamp)
);

-- Insert default users if they don't exist
INSERT INTO todoapp_users (username, password, role)
VALUES 
  ('dad', 'dad123', 'dad'),
  ('mom', 'mom123', 'mom')
ON DUPLICATE KEY UPDATE
  username = VALUES(username);
