#Procedure 3: Getting top 5 results 
DROP PROCEDURE IF EXISTS IMS.top_5;

DELIMITER $$
CREATE PROCEDURE IMS.top_5(IN actor VARCHAR(20))
BEGIN
	DECLARE curYear INT;
    DECLARE curMonth INT;
    DECLARE startDate date;
    DECLARE endDate date;
    
    SET curYear = EXTRACT(year from curdate());
    SET curMonth = EXTRACT(month from curdate());
    IF (curMonth=01) THEN
		SET curYear= curYear-1;
        SET curMonth = 12;
	ELSE 
		SET curMonth = curMonth-1;
    END IF;
	
    SET startDate = date_add(makedate(curYear,1), interval(curMonth)-1 month); 
    SET endDate = LAST_DAY(startDate); 
    IF (actor= 'employee') THEN
		(SELECT e.emp_name, sum(t.total) as Total
        FROM employee e, tran t
        where e.employee_id=t.employee_id and t.payment_due=1 and t.tran_date between startDate and endDate
        group by e.emp_name
        order by sum(t.total) DESC
        LIMIT 5
        );
	ELSEIF (actor='customer') THEN
		(SELECT c.cus_name, sum(t.total) as Total
        from customer as c, tran as t
        where c.customer_id=t.customer_id and t.payment_due=1 and t.tran_date between startDate and endDate
        group by c.cus_name
        order by sum(t.total) DESC
        LIMIT 5);
	ELSEIF (actor='product') THEN
		(SELECT p.product_name, count(*) as Count
        from product as p, has as h, tran as t
        where p.product_id=h.product_id and t.payment_due=1 and t.transaction_id=h.transaction_id and t.tran_date between startDate and endDate
        group by p.product_name
        order by count(*) DESC
        LIMIT 5);
	ELSEIF (actor='income') THEN
		(Select sum(total) as Total
		From tran
        where payment_due=1 and tran_date between startDate and endDate);
    END IF;
END$$
DELIMITER ;