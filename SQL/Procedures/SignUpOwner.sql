#procedure 5 Sign up owner
DROP PROCEDURE IF EXISTS IMS.sign_up_owner;

DELIMITER $$
CREATE PROCEDURE IMS.sign_up_owner( IN OwnerName varchar(100), IN owner_pwd varchar(255) , IN email varchar(255))
BEGIN
	declare ownerId mediumint;
	declare maxEmpId mediumint;
    declare RandomValue mediumint;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		RESIGNAL;
	END;
    
	start transaction;
		insert into IMS.company_owner (owner_name,owner_pwd,email) values(OwnerName, owner_pwd, email);
		set ownerId = (select max(owner_id) from IMS.company_owner);
        set maxEmpId = (select max(employee_id) from IMS.employee);
        set RandomValue= FLOOR(RAND()*(maxEmpId-1+1)+1);
		insert into IMS.owns values( ownerId, RandomValue);
	commit;
END$$
DELIMITER ;