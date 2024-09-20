create schema if not exists MOREMORE;

create table IF NOT EXISTS MOREMORE.CLUB(
    club_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    dues BIGINT NOT NULL,
    club_code VARCHAR(100) NOT NULL unique,
    club_name VARCHAR(100) NOT NULL,
    club_intro TEXT NOT NULL,
    created_date DATE NULL default (CURRENT_DATE)
    );

create table IF NOT EXISTS MOREMORE.PARTICIPANT(
   participant_id BIGINT AUTO_INCREMENT PRIMARY KEY,
   club_code VARCHAR(100),
    user_id BIGINT,
    club_role ENUM('CREATOR','PARTICIPANT'),
    acceptance_status ENUM('ACCEPTED','REFUSED','WAITING'),
    created_date TIMESTAMP NOT NULL default CURRENT_TIMESTAMP
    REFERENCES MOREMORE.CLUB(club_code) on delete cascade
);
