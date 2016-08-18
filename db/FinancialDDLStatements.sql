create table mergent_codes(mergent_codes_id number(32), code varchar2(32), description varchar2(1024), statement_name varchar2(100));

create sequence mergent_codes_seq start with 1 increment by 1;


--DDL statements for invperf application
create table financialuser(userId number(32), username varchar2(256), pwd varchar2(256), creation_date date, last_modified_date date);
create sequence financialuser_seq;
create table userportfolio(portfolioId number(32), userId number(32), portfolio_name varchar2(64), portfolio_desc varchar2(512), creation_date date, last_modified_date date);
create sequence userportfolio_seq;
create table transactiontypes(trntypeId number(32), trntypecode varchar2(64), trntypename varchar2(64), trntypedesc varchar2(512), creation_date date, last_modified_date date);
create sequence transactiontypes_seq;
create table currencycode(currcodeId number(32), currcode varchar2(10), currName varchar2(32), creation_date date, last_modified_date date);
create sequence currencycode_seq;
create table portfoliotrn(trnId number(32), portfolioId number(32), trntypeId number(32), amount number(10,2), currcodeId number(32), trndate date, notes varchar2(64), creation_date date, last_modified_date date);
create sequence portfoliotrn_seq;

alter table financialuser 
add constraint financialuser_unq1 UNIQUE (username);

alter table userportfolio
add constraint userportfolio_unq1 UNIQUE (userId, portfolio_name);

alter table transactiontypes
add constraint transactiontypes_unq1 UNIQUE (trntypecode);

alter table currencycode
add constraint currencycode_unq1 UNIQUE (currcode);
