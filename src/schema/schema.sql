CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL, -- admin, manager, researcher, etc.
  institution_id INTEGER REFERENCES institutions(id),
  country VARCHAR(100),
  phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL, -- ongoing, planning, completed
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  budget DECIMAL(15,2) NOT NULL,
  spent DECIMAL(15,2) DEFAULT 0,
  progress INTEGER DEFAULT 0, -- percentage
  category VARCHAR(100) NOT NULL, -- Research, Training, Innovation, Policy
  priority VARCHAR(50) NOT NULL, -- High, Medium, Low
  institution_id INTEGER REFERENCES institutions(id),
  location VARCHAR(100),
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- Academic Institution, Research Center, NGO, etc.
  country VARCHAR(100) NOT NULL,
  website VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  address TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE beneficiaries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL, -- Student, Researcher, Farmer, Policy Maker
  institution_id INTEGER REFERENCES institutions(id),
  country VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL, -- Active, Inactive
  gender VARCHAR(50),
  age_group VARCHAR(50), -- 18-24, 25-34, etc.
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time_start TIME,
  time_end TIME,
  location VARCHAR(255),
  type VARCHAR(100) NOT NULL, -- Conference, Workshop, Training, Meeting, etc.
  status VARCHAR(50) NOT NULL, -- Upcoming, Planning, Completed
  participants_count INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  project_id INTEGER REFERENCES projects(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE institutions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- University, Research Center, Government Agency, etc.
  country VARCHAR(100) NOT NULL,
  address TEXT,
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE publications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- Research Paper, Policy Brief, Case Study, Report
  status VARCHAR(50) NOT NULL, -- Published, In Review, Draft
  publication_date DATE,
  citation_count INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  project_id INTEGER REFERENCES projects(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_tags (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  tag VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE project_team_members (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  user_id INTEGER REFERENCES users(id),
  role VARCHAR(100) NOT NULL, -- Project Lead, Researcher, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE project_partners (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  partner_id INTEGER REFERENCES partners(id),
  contribution_type VARCHAR(100), -- Funding, Technical, etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE project_beneficiaries (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  beneficiary_id INTEGER REFERENCES beneficiaries(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE activity_tags (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(id),
  tag VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE activity_participants (
  id SERIAL PRIMARY KEY,
  activity_id INTEGER REFERENCES activities(id),
  beneficiary_id INTEGER REFERENCES beneficiaries(id),
  attendance_status VARCHAR(50), -- Registered, Attended, No-show
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE budget_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE budget_allocations (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  category_id INTEGER REFERENCES budget_categories(id),
  amount DECIMAL(15,2) NOT NULL,
  fiscal_year VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  description TEXT NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  transaction_date DATE NOT NULL,
  category_id INTEGER REFERENCES budget_categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE performance_indicators (
  id SERIAL PRIMARY KEY,
  category VARCHAR(100) NOT NULL, -- Research Impact, Innovation, Capacity Building, etc.
  name VARCHAR(255) NOT NULL,
  description TEXT,
  unit VARCHAR(50), -- Percentage, Count, etc.
  target_value DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE performance_measurements (
  id SERIAL PRIMARY KEY,
  indicator_id INTEGER REFERENCES performance_indicators(id),
  project_id INTEGER REFERENCES projects(id),
  value DECIMAL(10,2) NOT NULL,
  measurement_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


