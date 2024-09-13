create table IF NOT EXISTS CLUB(
    club_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    dues BIGINT NOT NULL,
    club_code VARCHAR(100) NOT NULL unique,
    club_name VARCHAR(100) NOT NULL,
    club_intro TEXT NOT NULL,
    created_date DATE NOT NULL default (CURRENT_DATE)
);

create table IF NOT EXISTS PARTICIPANT(
   participant_id BIGINT AUTO_INCREMENT PRIMARY KEY,
   club_code VARCHAR(100),
   user_id BIGINT,
   club_role ENUM('CREATOR','PARTICIPANT'),
   acceptance_status ENUM('ACCEPTED','REFUSED','WAITING'),
   created_date TIMESTAMP NOT NULL default CURRENT_TIMESTAMP,
   FOREIGN KEY (club_code)
   REFERENCES CLUB(club_code) on delete cascade
);