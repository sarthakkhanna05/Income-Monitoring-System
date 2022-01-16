#procedure 1: To place order 
DROP PROCEDURE IF EXISTS IMS.calculate_price;

DELIMITER $$
CREATE PROCEDURE IMS.calculate_price(IN empId MEDIUMINT, IN cusId MEDIUMINT, IN currDate date, 
IN quan varchar(10), IN payment_due INT, IN discount MEDIUMINT, IN productId_array VARCHAR(1000)) #

BEGIN
	DECLARE productId_array_local VARCHAR(1000) ;
	DECLARE start_pos SMALLINT;
	DECLARE comma_pos SMALLINT;
	DECLARE current_id VARCHAR(1000);
	DECLARE end_loop TINYINT;
    DECLARE price double;
    DECLARE curTransactionId MEDIUMINT;
    DECLARE total double;
    DECLARE rCheck mediumint;
    DECLARE checkQuatity mediumint;
    DECLARE CUSTOM_EXCEPTION CONDITION FOR SQLSTATE '45000';
    DECLARE checkContactedBy mediumint;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

	START TRANSACTION;
		
        #checking if this user has contacted this employee before 
        set checkContactedBy = (select exists(select customer_id from IMS.contacted_by where customer_id=cusId and employee_id= empId));
        
        IF (checkContactedBy=0) THEN
			insert into IMS.contacted_by values (empId, cusId);
		END IF;
        
		SET productId_array_local = productId_array;
		SET start_pos = 1;
		SET comma_pos = locate(',', productId_array_local);
		SET price=0;
		REPEAT
			IF comma_pos > 0 THEN
				SET current_id = substring(productId_array_local, start_pos, comma_pos - start_pos);
				SET end_loop = 0;
			ELSE
				SET current_id = substring(productId_array_local, start_pos);
				SET end_loop = 1;
			END IF;
		 
			SET price=price+ (SELECT product_price from IMS.product where product_id= current_id);
            SET checkQuatity = (SELECT product_quantity from IMS.product where product_id= current_id);
            
            # if quantity of product become zero, we raise an exception
            IF (checkQuatity!=0) THEN
				SET checkQuatity= checkQuatity-1;
                UPDATE IMS.product set product_quantity=checkQuatity where product_id= current_id;
			ELSE
				SIGNAL CUSTOM_EXCEPTION
				SET MESSAGE_TEXT = 'Some products are not available anymore, please change products';
			END IF;
			IF end_loop = 0 THEN
				SET productId_array_local = substring(productId_array_local, comma_pos + 1);
				SET comma_pos = locate(',', productId_array_local);
			END IF;
		UNTIL end_loop = 1

		END REPEAT;
		
		IF price=0 THEN
			ROLLBACK;
		ELSE
        #calculating total price using discount 
			SET total= price - (discount/100)*price;     #setting total 
		END IF;
        
		#Creating new transaction
		INSERT into IMS.tran (employee_id, customer_id, tran_date, quantity,  payment_due, price, discount, total ) 
		values (empId, cusId, currDate, quan, payment_due, price, discount, total);
		
		#inserting into has table
		SET curTransactionId= (SELECT max(transaction_id) from IMS.tran);
        
		SET productId_array_local = productId_array;
		SET start_pos = 1;
		SET comma_pos = locate(',', productId_array_local);
		SET price=0;
		REPEAT
			IF comma_pos > 0 THEN
				SET current_id = substring(productId_array_local, start_pos, comma_pos - start_pos);
				SET end_loop = 0;
			ELSE
				SET current_id = substring(productId_array_local, start_pos);
				SET end_loop = 1;
			END IF;
		 
			INSERT INTO IMS.has values (curTransactionId, current_id);
            
			IF end_loop = 0 THEN
				SET productId_array_local = substring(productId_array_local, comma_pos + 1);
				SET comma_pos = locate(',', productId_array_local);
			END IF;
		UNTIL end_loop = 1

		END REPEAT;
		
		#check if same user has offered diccount to same customer
		set rCheck= (select employee_id from IMS.offer_discount where employee_id= empId and customer_id= cusId);
		
		IF (rcheck!=0) THEN
			update IMS.offer_discount set offer_discount.discount= discount,  discount_date=currDate
			where employee_id= empId and customer_id= cusId;
		ELSE
			INSERT into IMS.offer_discount values (empId, cusId, currDate, discount);
		END IF;
    
    COMMIT;
END$$
DELIMITER ;