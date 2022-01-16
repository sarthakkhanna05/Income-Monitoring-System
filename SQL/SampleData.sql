##SJSU CMPE 226 Fall 2021 TEAM3

insert into company_owner (owner_name,owner_pwd,email) values ('Srinivasan', md5('Srini@234'),'srinipallock@abc.com');
insert into company_owner (owner_name,owner_pwd,email) values ('Wu', md5('Wangle@2943'),'wangler29@gmail.com');
insert into company_owner (owner_name,owner_pwd,email) values ('Mozart', md5('Mozo@980'),'mozilla20@xyz.com');
insert into company_owner (owner_name,owner_pwd,email) values ('Einstein', md5('Stein$209'),'teinpol@dec.com');
insert into company_owner (owner_name,owner_pwd,email) values ('Gold', md5('Goldiee%20'),'kdnnkjn@nxjn.com');


insert into employee (emp_name, contact_no, gender, email, address, emp_password) values ('Watson', '6692307156','male','snhjabdjsh32@dsx.com','123 sundnaksnas street,CA',md5('Watty#210'));
insert into employee (emp_name, contact_no, gender, email, address, emp_password) values ('Zhang', '9823467123','male','zhanplai12@gmail.com','988 sindy drive,Denwar',md5('zhanghds@598') );
insert into employee (emp_name, contact_no, gender, email, address, emp_password) values ('Shankari', '1234567892','female','karishan@xjn.com','1204 blonde evenue,texas',md5('bdjashzbc%012'));
insert into employee (emp_name, contact_no, gender, email, address, emp_password)  values ('Brandt', '4389213405','female','bradtxokll23@abc.com','100 park vista ,PA',md5('kjfksjfk$123'));
insert into employee (emp_name, contact_no, gender, email, address, emp_password) values ('Chavez', '2091784529','female','hjdsajkhdk@cde.com','532 bakinf street, CA',md5('sfkskjkad_99'));
insert into employee (emp_name, contact_no, gender, email, address, emp_password) values ('Packard', '5462983763','male','packardlot3@yah.com','1200 saandi whale, NY',md5('iuieyew20@8'));
insert into employee (emp_name, contact_no, gender, email, address, emp_password) values ('Williams', '9882337604','male','willidhje45@yhn.com','912 yellowring port, Seattle',md5('hlloii%80'));

insert into customer (cus_name, contact_no, gender, email, address, cus_password,membership) values ('Kim', '1182608256','male','kinsbdhsb@edr.com','200 sunride plaza,PA',md5('kimkol#10'),1);
insert into customer (cus_name, contact_no, gender, email, address, cus_password,membership) values ('Crick', '2823364021','male','kjdsnjb12@gmail.com','1200 rott evenue,texas',md5('crickto@210'),0 );
insert into customer (cus_name, contact_no, gender, email, address, cus_password,membership) values ('Katz', '3454560892','female','kattypaul@xjn.com','1204 lombard stree,CA',md5('katzorale#11'),1);
insert into customer (cus_name, contact_no, gender, email, address, cus_password,membership) values ('Singh', '4109013001','male','harrysinggh@abc.com','988 lawrence road ,denwar',md5('rocketsingh@143'),1);
insert into customer (cus_name, contact_no, gender, email, address, cus_password,membership) values ('Califieri', '5190284189','female','calfribld@abc.com','100 gape valley, Ny',md5('eriorick_87'),0);
insert into customer (cus_name, contact_no, gender, email, address, cus_password,membership) values ('Rohit', '5299988863','male','rohitshetty@rfv.com','1453 shjdjh dde, Seattle',md5('goodmrng@56'),1);
insert into customer (cus_name, contact_no, gender, email, address, cus_password,membership) values ('Shivani', '6002908601','female','shivsmile@qaz.com','888 purico port, CA',md5('holishop!01'),0);

insert into product (product_name,product_price,product_quantity)values ('LogiTech HD Web Cam',100,2);
insert into product (product_name,product_price,product_quantity)values ('Fire HD 8 Tablet', 119,5 );
insert into product (product_name,product_price,product_quantity)values ('Hyper X Cloud II Laptop', 1300,6);
insert into product (product_name,product_price,product_quantity)values ('Hyvit Mechanical keyboard', 400,7);
insert into product (product_name,product_price,product_quantity)values ('Razer Blackshark Gaming Headset',80,3);
insert into product (product_name,product_price,product_quantity)values ('TP-Link WiFi Router',399,2);
insert into product (product_name,product_price,product_quantity)values ('Roku Fire Stick',25,1);
insert into product (product_name,product_price,product_quantity)values ('Port Axo Speakers',250,7);

insert into tran (employee_id,customer_id,tran_date,quantity,payment_due,price,discount,total) values (1, 2,'2021-04-02',2,0,180,10,162);
insert into tran (employee_id,customer_id,tran_date,quantity,payment_due,price,discount,total) values (2, 1,'2021-04-02',1,1,1300,10,1170);
insert into tran (employee_id,customer_id,tran_date,quantity,payment_due,price,discount,total) values (4, 5 ,'2021-04-05', 2, 0, 350, 15, 297.5);

insert into owns values (1,7);
insert into owns values (2,6);
insert into owns values (3,5);
insert into owns values (4,4);
insert into owns values (5,3);
insert into owns values (1,2);
insert into owns values (2,1);

insert into offer_discount values (1,2,'2021-04-02',10);
insert into offer_discount values (2,1,'2021-04-02',10);
insert into offer_discount values (4,5,'2021-04-05',15);

insert into has values (1,1);
insert into has values (1,5);
insert into has values (2,3);
insert into has values (3,1);
insert into has values (3,8);

insert into contacted_by values (1,2);
insert into contacted_by values (2,1);
insert into contacted_by values (4,5);

insert into changes values (1, 1, '2020-04-02');
insert into changes values (2, 2,'2020-04-02');
insert into changes values (4, 3, '2020-04-05');