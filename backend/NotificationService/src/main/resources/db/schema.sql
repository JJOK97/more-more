-- 회원 테이블
CREATE TABLE IF NOT EXISTS local_db.MEMBERS (
member_id BIGINT AUTO_INCREMENT PRIMARY KEY,
account_number VARCHAR(50) NOT NULL,
address VARCHAR(255),
email VARCHAR(100),
phone_number VARCHAR(20) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
birth_date DATE,
name VARCHAR(100) NOT NULL,
profile_image_url VARCHAR(255),
fcm_token VARCHAR(255)  -- FCM 토큰 필드 추가
);

-- 클럽 테이블
CREATE TABLE IF NOT EXISTS local_db.CLUB (
 club_id BIGINT AUTO_INCREMENT PRIMARY KEY,
 dues BIGINT NOT NULL,
 club_code VARCHAR(100) NOT NULL UNIQUE,
 club_name VARCHAR(100) NOT NULL,
 club_intro TEXT NOT NULL,
 created_date DATE NOT NULL DEFAULT (CURRENT_DATE)
);

-- 참가자 테이블
CREATE TABLE IF NOT EXISTS local_db.PARTICIPANT (
participant_id BIGINT AUTO_INCREMENT PRIMARY KEY,
club_code VARCHAR(100),
user_id BIGINT,
club_role ENUM('CREATOR', 'PARTICIPANT'),
acceptance_status ENUM('ACCEPTED', 'REFUSED', 'WAITING'),
created_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (club_code) REFERENCES local_db.CLUB(club_code) ON DELETE CASCADE
);

-- 계좌 테이블
CREATE TABLE IF NOT EXISTS local_db.ACCOUNT (
account_id BIGINT AUTO_INCREMENT PRIMARY KEY,
ssafy_account_number VARCHAR(100) NOT NULL,
club_code VARCHAR(100) NOT NULL,
club_password VARCHAR(100) NOT NULL,
ssafy_user_key VARCHAR(100) NOT NULL
);

-- 계좌 내역 테이블
CREATE TABLE IF NOT EXISTS local_db.ACCOUNT_HISTORY (
account_history_id BIGINT AUTO_INCREMENT PRIMARY KEY,
tag_name VARCHAR(50) NOT NULL,
account_id BIGINT NOT NULL,
ssafy_transaction_number VARCHAR(100),
account_history_verification_content VARCHAR(255),
FOREIGN KEY (account_id) REFERENCES local_db.ACCOUNT(account_id)
);

-- 계좌 내역 증빙 테이블
CREATE TABLE IF NOT EXISTS local_db.ACCOUNT_HISTORY_VERIFICATION (
account_history_image_id BIGINT AUTO_INCREMENT PRIMARY KEY,
account_history_image VARCHAR(100),
account_history_id BIGINT NOT NULL,
FOREIGN KEY (account_history_id) REFERENCES local_db.ACCOUNT_HISTORY(account_history_id)
);

-- 알림 테이블
CREATE TABLE IF NOT EXISTS local_db.NOTIFICATION (
id BIGINT AUTO_INCREMENT PRIMARY KEY,
receiver_id BIGINT NOT NULL,
notification_type ENUM('DEPOSIT', 'WITHDRAWAL', 'COMMENT', 'PARTICIPATION_REQUEST') NOT NULL,
reference_id BIGINT,
actor_id BIGINT,
status ENUM('UNREAD', 'READ') DEFAULT 'UNREAD',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (receiver_id) REFERENCES local_db.MEMBERS(member_id),
FOREIGN KEY (actor_id) REFERENCES local_db.MEMBERS(member_id)
);
