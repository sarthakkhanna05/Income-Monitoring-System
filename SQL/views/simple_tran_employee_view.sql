CREATE VIEW simple_tran_employee
as SELECT e.employee_id, e.emp_name, e.email, p.product_name, p.product_id, p.product_price, t.transaction_id, t.tran_date, t.quantity, t.payment_due, t.price, t.discount, t.total
FROM tran as t, has as h, product as p, employee as e
WHERE t.employee_id=e.employee_id
and t.transaction_id=h.transaction_id 
and h.product_id=p.product_id
order by t.tran_date; 