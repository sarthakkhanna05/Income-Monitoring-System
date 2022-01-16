

CREATE VIEW simple_tran_customer
as SELECT c.customer_id, c.cus_name, c.email, p.product_name, p.product_id, p.product_price, t.transaction_id, t.employee_id, t.tran_date, t.quantity, t.payment_due, t.price, t.discount, t.total
FROM tran as t, has as h, product as p, customer as c
WHERE t.customer_id=c.customer_id
and t.transaction_id=h.transaction_id 
and h.product_id=p.product_id
order by t.tran_date; 

