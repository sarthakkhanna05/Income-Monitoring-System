#procedure 4 sign up employee
DROP PROCEDURE IF EXISTS IMS.sign_up_employee;

DELIMITER $$
CREATE PROCEDURE IMS.sign_up_employee( IN empName varchar(100), contact_no CHAR(10), IN gender varchar(7) , 
IN email varchar(255), in address varchar(100), in emp_password	varchar(255))
BEGIN
	declare RandomValue mediumint;
    declare empId mediumint;
    declare maxOwnerId mediumint;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
	start transaction;
		insert into IMS.employee (emp_name, contact_no, gender, email, address, emp_password) values 
        (empName, contact_no, gender, email, address, emp_password);
        
		set empId = (select max(employee_id) from IMS.employee);
        set maxOwnerId = (select max(owner_id) from IMS.company_owner);
        set RandomValue= FLOOR(RAND()*(maxOwnerId -1+1)+1);
		insert into IMS.owns values( RandomValue , empId );
	commit;
END$$
DELIMITER ;