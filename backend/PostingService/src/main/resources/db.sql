use moremore;

create table IF NOT EXISTS MOREMORE.CLUB(
    club_id INT AUTO_INCREMENT PRIMARY KEY,
    club_image VARCHAR(100) NULL,
    dues BIGINT NULL,
    club_code VARCHAR(100),
    club_name VARCHAR(100)
);
