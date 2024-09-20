
insert into CLUB (dues, club_code, club_name, club_intro) values(1000, 'test1', 'test1', 'test1');
insert into CLUB (dues, club_code, club_name, club_intro) values(1000, 'test2', 'test2', 'test2');
insert into CLUB (dues, club_code, club_name, club_intro) values(1000, 'test3', 'test3', 'test3');


insert into PARTICIPANT (club_code, user_id, club_role, acceptance_status)
values ('test1', 1, 'CREATOR', 'ACCEPTED')
,('test2', 1, 'PARTICIPANT', 'WAITING')
,('test3', 1, 'PARTICIPANT', 'ACCEPTED')
,('test2', 2, 'CREATOR', 'WAITING')
,('test3', 3, 'CREATOR', 'ACCEPTED')
,('test2', 4, 'PARTICIPANT', 'WAITING')
,('test3', 5, 'PARTICIPANT', 'ACCEPTED')
,('test1', 6, 'PARTICIPANT', 'WAITING')