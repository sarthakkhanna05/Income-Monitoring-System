#procedure 6 update transaction
DROP PROCEDURE IF EXISTS IMS.update_transaction;

DELIMITER $$
CREATE PROCEDURE IMS.update_transaction(IN empId MEDIUMINT, IN cusId MEDIUMINT,IN transactionId MEDIUMINT, IN curDate date, IN productId mediumint)
BEGIN
    DECLARE tPrice double;
    DECLARE checkContactedBy mediumint;
    DECLARE total double;
    DECLARE tQuan VARCHAR(10);
    DECLARE pQuan MEDIUMINT;
    DECLARE eCheck INT;
    DECLARE dis MEDIUMINT;
    DECLARE tTotal double;
    DECLARE hasCheck INT;
    
    DECLARE rCheck mediumint;
    DECLARE checkQuatity mediumint;
    DECLARE CUSTOM_EXCEPTION_1 CONDITION FOR SQLSTATE '45000';
    
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

	START TRANSACTION;
		
        #has table
        set hasCheck = (select exists(select product_id from IMS.has where transaction_id=TransactionId and product_id=ProductId));
        
        if hasCheck=0 then
				SIGNAL CUSTOM_EXCEPTION_1
				SET MESSAGE_TEXT = 'This transaction and product does not exist, please refresh the page';
		else 
			#delete from has
            delete from IMS.has where transaction_id=TransactionId and product_id=ProductId;
			
			set checkContactedBy = (select exists(select customer_id from IMS.contacted_by where customer_id=cusId and employee_id= empId));
			
			IF (checkContactedBy=0) THEN
				insert into IMS.contacted_by values (empId, cusId);
			END IF;
			
			#set price to current transaction price
			set tPrice = (select price from IMS.tran where transaction_id= transactionId); 
			set tPrice= tPrice - (select product_price from IMS.product where product_id=productId);
			
			#Transaction quantity
			set tQuan = (select quantity from IMS.tran where transaction_id= transactionId);
			set tQuan = tQuan-1;
			
			#product quantity
			set pQuan = (select product_quantity from IMS.product where product_id=ProductId);
			set pQuan = pQuan+1;
			update IMS.product set product_quantity=pQuan where product_id=ProductId;
			
			#change table 
			set eCheck = (select exists(select employee_id from IMS.changes where employee_id=empId and employee_id=empId));
			if echeck=1 then
				update IMS.changes set change_date=curDate where employee_id=empId and employee_id=empId;
			else
				insert into IMS.changes values (empId, transactionId, curDate);
			end if;
			
			#update transaction
			if (tPrice=0) or (tQuan=0) then
				delete from IMS.tran where transaction_id=transactionId;
			else
				set dis= (select discount from IMS.tran where transaction_id=TransactionId);
				set tTotal= tPrice - (dis/100)* tPrice;
				update IMS.tran set quantity=tQuan, price= tPrice, total=tTotal where transaction_id=transactionId;
			end if;
		end if;
	COMMIT;
END$$
DELIMITER ;