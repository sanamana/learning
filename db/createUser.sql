Create tablespace financialtbl
DATAFILE 'C:\suresh\code\db\oradata\FINANCIAL.DBF'
SIZE 200M;

CREATE USER financial
    IDENTIFIED BY financial 
    DEFAULT TABLESPACE financialtbl 
    QUOTA 200M ON financialtbl;

grant create session to financial;

grant create table to financial;

grant create synonym to financial;

grant create sequence to financial;

