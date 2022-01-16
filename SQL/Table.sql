#NOTE: For the script purpose, in the sample data we have used AES_ENCRPYT however we are using a different scripting technique as it is more secure. 
#SJSU CMPE 226 Fall 2021 TEAM3

drop database if exists IMS;
create database IMS;
use IMS;

create table company_owner
	(owner_id		MEDIUMINT NOT NULL AUTO_INCREMENT,
	 owner_name		varchar(100) not null,
	 owner_pwd		varchar(255) Not NULL,
     email          varchar(256) Not NULL, 
	 primary key (owner_id)
	);
    



    
create table employee
	(employee_id	MEDIUMINT NOT NULL AUTO_INCREMENT,
	 emp_name		varchar(100) not null,
	 contact_no		CHAR(10) not null,
     CONSTRAINT chkemp__contact_no CHECK (contact_no not like '%[^0-9]%'),
     CONSTRAINT chkEMP_contact_no_len CHECK (LENGTH(contact_no)=10),
	 gender	        varchar(7),
     email	        varchar(255) not null,
     address	    varchar(100),
     emp_password	varchar(255) not null,
     OwnerMessage 	varchar(500),
	 primary key (employee_id)
	);
    


create table customer
	(customer_id	MEDIUMINT NOT NULL AUTO_INCREMENT,
	 cus_name		varchar(100) not null,
	 contact_no		CHAR(10) not null,
     CONSTRAINT chkcus_contact_no CHECK (contact_no not like '%[^0-9]%'),
     CONSTRAINT chkcus_contact_no_len CHECK (LENGTH(contact_no)=10),
	 gender	        varchar(7),
     email	        varchar(255),
     address	    varchar(100),
     cus_password	varchar(255),
     membership		INT,
	 primary key (customer_id)
	);
        


create table product
	(product_id			MEDIUMINT NOT NULL AUTO_INCREMENT,
	 product_name		varchar(100) not null,
	 product_price		MEDIUMINT not null,
     product_quantity   MEDIUMINT,
	 primary key (product_id)
	);
    

 
create table tran
	(transaction_id		MEDIUMINT NOT NULL AUTO_INCREMENT,
     employee_id	    MEDIUMINT,
     customer_id        MEDIUMINT,
	 tran_date			date,
	 quantity			varchar(10),
     payment_due	    INT,
     price	    		double,
     discount	        double,
     CONSTRAINT tran_discount CHECK (discount<=100),
     total				double,
     
	 primary key (transaction_id),
     foreign key (employee_id) references employee(employee_id)
		on delete set null on update cascade,
	 foreign key (customer_id) references customer(customer_id)
		on delete set null on update cascade
	);
    

    
create table owns
	(owner_id			MEDIUMINT,
	 employee_id		MEDIUMINT,
	 primary key (employee_id, owner_id),
     foreign key (employee_id) references employee(employee_id)
		on delete cascade on update cascade,
	 foreign key (owner_id) references company_owner(owner_id)
		on delete cascade on update cascade
	);
    

    
create table offer_discount
	(employee_id		MEDIUMINT,
	 customer_id		MEDIUMINT,
     discount_date		date,
     discount			double,
	 primary key (employee_id, customer_id),
     foreign key (employee_id) references employee(employee_id)
		on delete cascade on update cascade,
	 foreign key (customer_id) references customer(customer_id)
		on delete cascade on update cascade
	);
    



create table has
	(transaction_id		MEDIUMINT,
	 product_id			MEDIUMINT,
	 primary key (transaction_id, product_id),
     foreign key (transaction_id) references tran(transaction_id)
		on delete cascade on update cascade ,
	 foreign key (product_id) references product(product_id)
		on delete cascade on update cascade 
	);
    

    
create table contacted_by
	(employee_id		MEDIUMINT,
	 customer_id		MEDIUMINT,
	 primary key (employee_id, customer_id),
     foreign key (employee_id) references employee(employee_id)
		on delete cascade on update cascade,
	 foreign key (customer_id) references customer(customer_id)
		on delete cascade on update cascade
	);
    

    
create table changes
	(employee_id		MEDIUMINT,
	 transaction_id		MEDIUMINT,
     change_date        date,
	 primary key (employee_id, transaction_id),
     foreign key (employee_id) references employee(employee_id)
		on delete cascade on update cascade,
	 foreign key (transaction_id) references tran(transaction_id)
		on delete cascade on update cascade
	);
    
