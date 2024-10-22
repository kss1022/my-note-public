---
created: "SQL Basic"
draft: false
tags:
---

# setup


[[Sakila samples]]

[MYSQL Ref 8.4](https://dev.mysql.com/doc/refman/8.4/en/)



---

# data


## charter data



``` mysql
char(30)    /* fixed-length */
varchar(30) /* variable-length */
```


`character set`
```
mysql > SHOW CHARCTER SET:
```



| 자료형        | 최대 바이트 크기     |
| ---------- | ------------- |
| varchar    | 65,535        |
| mediumtext | 16,777,215    |
| longtext   | 4,294,967,295 |

## numeric data

| 자료형       | 부호 있는 정수 저장값의 범위               | 부호없는 저장값의 범위      |
| --------- | ------------------------------ | ----------------- |
| tinyint   | -128 ~ 127                     | 0 ~ 255           |
| smallint  | -32,768 ~ 32,767               | 0 ~ 65,535        |
| mediumint | -8,388,608 ~ 8,388,607         | 0 ~ 16,777,215    |
| int       | -2,147,483,648 ~ 2,147,483,647 | 0 ~ 4,294,967,295 |
| bigint    | -2^63  ~ 2^63 -1               | 0 ~ 2^64 - 1      |

| 자료형         | 숫자범위 |
| ----------- | ---- |
| flaot(p,s)  |      |
| double(p,s) |      |

## temporal data 


| 자료형       | 기본 형식              | 허용 값 |
| --------- | ------------------ | ---- |
| date      | YYYY-MM-DD         |      |
| datetime  | YYYY_MM_DD HH:MISI |      |
| timestamp | YYYY_MM_DD HH:MISI |      |
| year      | YYYY               |      |
| time      | HHH:MI:SS          |      |
|           |                    |      |


---

# query


## select

	DISTINCT 
	결과를 생성하려면 데이터를 정렬 하므로 주의! -> 
	작업중인 데이터를 이해하고 중복 여부를 파악

## from

subquery
join

## where

and , or , not 

## Filtering

``` sql
BETWEEN '2005-06-14' AND '2005-06-16'
```

``` sql
rating IN ('P', 'G')
```

| 와일드카드 문자 | 일치             |
| -------- | -------------- |
| _        | 정확히 한 문자       |
| %        | 개수에 상관없이 문자 포함 |

``` sql
/* 2번쨰 위치에 A포함하고 4번쨰 위치에 T를 포함하고 마지막 위치는 S로 끝나는 문자열 */
WHERE last_name LIKE '_A_T%S'
```



### NULL

	 `NULL 일 수는 있지만 null과 같을 수는 없다.`
	 `두개의 null은 서로 같지 않다.`
	 
	 -> IS NULL 또는 IS NOT NULL을 사용해야함!


2005-05 ~ 2005-08  사이에 반납되지 않은 대여정보 찾기!

``` sql 
SELECT rental_id, customer_id, return_date
FROM rental
WHERE return_date NOT BETWEEN '2005-05-01' AND '2005-09-01';


+-----------+-------------+---------------------+
| rental_id | customer_id | return_date         |
+-----------+-------------+---------------------+
|     15365 |         327 | 2005-09-01 03:14:17 |
|     15388 |          50 | 2005-09-01 03:50:23 |
|     15392 |         410 | 2005-09-01 01:14:15 |
|     15401 |         103 | 2005-09-01 03:44:10 |
 ...
|     16020 |         311 | 2005-09-01 18:17:33 |
|     16033 |         226 | 2005-09-01 02:36:15 |
|     16037 |          45 | 2005-09-01 02:48:04 |
|     16040 |         195 | 2005-09-02 02:19:33 |
+-----------+-------------+---------------------+
```



``` sql
SELECT rental_id, customer_id, return_date
FROM rental
WHERE return_date IS NULL
OR return_date NOT BETWEEN '2005-05-01' AND '2005-09-01';


+-----------+-------------+---------------------+
| rental_id | customer_id | return_date         |
+-----------+-------------+---------------------+
|     11496 |         155 | NULL                |
|     11541 |         335 | NULL                |
|     11563 |          83 | NULL                |
|     11577 |         219 | NULL                |
|     11593 |          99 | NULL                |
|     11611 |         192 | NULL                |
 ...
|     16020 |         311 | 2005-09-01 18:17:33 |
|     16033 |         226 | 2005-09-01 02:36:15 |
|     16037 |          45 | 2005-09-01 02:48:04 |
|     16040 |         195 | 2005-09-02 02:19:33 |
+-----------+-------------+---------------------+
```

---

# join


``` sql
/* 서브 쿼리 사용 조인 예시 */
SELECT c.first_name, c.last_name, addr.address, addr.city
FROM customer c
INNER JOIN (
    SELECT a.address_id, a.address, c.city
    FROM  address a     
    INNER JOIN city c ON c.city_id = a.city_id
    WHERE a.district = "California"
) addr
ON c.address_id = addr.address_id;
```


---

# set operation


UNION
INTERSECT
EXCEPT

	ALL 이 없으면 중복 행 제거
	 하지만 EXCEPT ALL 은  집합 B에서 집합 A에 대한 중복 데이터가 발생할 때만 해당 데이터를 제거한다. (A EXPECT B) 


---

# data deepening


## charter data


``` sql
SELECT CONCAT('hello', ' ', 'world');
SELECT LENGTH('hello world');
SELECT POSITION('world' IN 'hello world');
SELECT LOCATE('world', 'world world world world', 8);

/* 정렬 순서 비교*/
SELECT STRCMP('abcd', 'abcd');  /* same = 0 */
SELECT STRCMP('abcd', 'xyz'); /* abcd is front: -1 */
SELECT STRCMP('xyz', 'abcd'); /* xyz is back: 1 */


SELECT 'abcd' LIKE '%d';  
SELECT INSERT('hello world', 1, 5, 'goodbye');
SELECT REPLACE('hello world', 'hello', 'goodbye');
SELECT CREATE VIEW customer_view
(customer_id, first_name, last_name, email)
AS
SELECT customer_id, first_name, last_id,
CONCAT(SUBSTRING(email, 1, 2), '*****', SUBSTRING(email, -4)) email
FROM customer;



SUBSTRING('Please find the substring in this string', 17, 9);
```


## numeric data

``` sql
SELECT CEIL(72.455), FLOOR(72.455);
SELECT ROUND(72.0909, 1), ROUND(72.0909, 2), ROUND(72.0909, 3);
SELECT TRUNCATE(72.0909, 1), TRUNCATE(72.0909, 2), TRUNCATE(72.0909, 3);

SELECT ABS(-25.76823), SIGN(-25.76823), ROUND(-25.76823, 2);

```

## temporal data


타임존

``` sql 
SELECT @@global.time_zone, @@session.time_zone, @@system_time_zone;

SET time_zone = 'Asia/Seoul'
```


`ERROR 1298 (HY000): Unknown or incorrect time zone: 'Asia/Seoul'` ->  MySQL 시간대 테이블 로드

``` shell
mysql_tzinfo_to_sql /usr/share/zoneinfo | mysql -u root -p mysql
mysql_tzinfo_to_sql  /usr/share/zoneinfo/Asia/Seoul KST
```

check
``` sql
SELECT * FROM mysql.time_zone_name; /* check time_zone */
```



``` sql
SELECT CAST('2019-09-17 15:30:00' AS DATETIME);
SELECT STR_TO_DATE('September 17, 2019', '%M %d, %Y');

SELECT DATE_ADD(CURRENT_DATE(), INTERVAL 5 DAY);
SELECT DATE_ADD(CURRENT_DATE(), INTERVAL '3:27:11' HOUR_SECOND);
SELECT DATE_ADD(CURRENT_DATE(), INTERVAL '9-11' YEAR_MONTH);

SELECT LAST_DAY('2019-09-17');

SELECT DAYNAME('2019-09-17');
SELECT MONTHNAME('2019-09-17');


SELECT EXTRACT(YEAR FROM CURRENT_DATE())
FROM payment
WHERE YEAR(payment_date) = 2005;


SELECT DATEDIFF('2019-09-03 23:59:59', '2019-06-21 00:00:00');
```


### Casting


``` sql
SELECT CAST(1456328 AS SIGNED INTEGER);


SELECT CAST('999ABC111' AS UNSIGNED INTEGER); /* result: 999, 1 row in set, 1 warning */

```


---

# group

그룹화
```sql
SELECT customer_id, COUNT(*)
FROM rental
GROUP BY customer_id
ORDER BY 2 DESC;
```

## 집계 함수

암시적 그룹
``` sql
SELECT MAX(amount) max_amt,
MIN(amount) min_amt,
AVG(amount) avg_amt,
SUM(amount) sum_amt,
COUNT(*) num_payments
FROM payment
```

명시적 그룹
``` sql
SELECT customer_id,
MAX(amount) max_amt,
MIN(amount) min_amt,
AVG(amount) avg_amt,
SUM(amount) sum_amt,
COUNT(*) num_payments
FROM payment
GROUP BY customer_id
```

고유한 값 계산
``` sql
SELECT COUNT(*) num_rows,
COUNT(DISTINCT customer_id) num_customer
FROM payment
```

표현식 사용
```
SELECT MAX(datediff(return_date, rental_date))
FROM rental;
```


NULL 처리 예시
```
CREATE TABLE num_tbl
(val SMALLINT);

INSERT INTO num_tbl VALUES(1);
INSERT INTO num_tbl VALUES(3);
INSERT INTO num_tbl VALUES(5);
INSERT INTO num_tbl VALUES(NULL);

SELECT COUNT(*) num_rows,
COUNT(val) num_vals,
SUM(val) total,
MAX(val) max_val,
MIN(val) min_val,
AVG(val) avg_val
FROM num_tbl;
```

## 그룹 생성

``` sql
SELECT fa.actor_id, f.rating, count(*)
FROM film_actor fa
INNER JOIN film f ON fa.film_id = f.film_id
GROUP BY fa.actor_id, f.rating
```

ROLLUP
``` sql
SELECT fa.actor_id, f.rating, count(*)
FROM film_actor fa
INNER JOIN film f ON fa.film_id = f.film_id
GROUP BY fa.actor_id, f.rating WITH ROLLUP
ORDER BY 1, 2;
```

그룹 필터
``` sql
SELECT fa.actor_id, f.rating, count(*)
FROM film_actor fa
INNER JOIN film f ON fa.film_id = f.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY fa.actor_id, f.rating
HAVING count(*) > 9;
```

``` sql
SELECT customer_id
FROM customer
WHERE customer_id = (SELECT MAX(customer_id) FROM customer);
```


## noncorrelated subqueries
비상관 서브 쿼리

IN, NOT IN , ALL, ANY


	NOT IN, ALL 사용시 집합에 null이 있을시 unkown 에러 발생 후 Empty 반환

``` sql
SELECT actor_id, film_id
FROM film_actor
WHERE actor_id IN 
(SELECT actor_id FROM actor WHERE last_name = "MONROE")
AND film_id IN
(SELECT film_id FROM film WHERE rating = 'PG');


SELECT actor_id, film_id
FROM film_actor
WHERE (actor_id, film_id) IN 
(SELECT actor_id, film_id
FROM actor a
CROSS JOIN film f 
WHERE a.last_name = "MONROE"
AND f.rating = 'PG');
```

## correlated subqueries
상관 서브쿼리


``` sql
SELECT fa.actor_id, fa.film_id
FROM film_actor fa
WHERE (actor_id, film_id) IN 
(SELECT actor_id, film_id
FROM actor a
CROSS JOIN film f 
WHERE a.last_name = "MONROE"
AND f.rating = 'PG');
```

EXISTS 사용
``` sql
SELECT f.title
FROM film f
WHERE EXISTS (SELECT 1
FROM film_category fc
INNER JOIN category c ON fc.category_id = c.category_id
WHERE  fc.film_id = f.film_id AND  c.name = 'Action');
```


데이터조작


각 고객의 최신 대여 날자를 찾아서 모든 last_update 수정
```sql
UPDATE FROM customer c
SET c.last_update = 
(SELECT max(r.rental_date) 
 FROM rental r 
 WHERE r.customer_id = c.cusomer_id)
WHERE EXISTS 
(SELECT 1 
 FROM rental r
 WHERE r.customer_id = c.customer_id)
```

지난 1년동안 영화를 대여하지 않은 고객 제거
```sql
DELETE FROM customer c
WHERE 365 < ALL
(SELECT datediff(now(), r.rental_date) day since_last_rental
FROM rental r
WHERE r.customer_id = c.cutomer_id)
```



## 사용 예시


데이터 소스로 사용

``` sql
/* 사용자 이름과 총 대여 횟수, 결제 금액 */
SELECT c.first_name, c.last_name, pymnt.num_rentals, pymnt.tot_payments
FROM customer c
INNER JOIN(
	SELECT customer_id, COUNT(*) num_rentals, SUM(amount) tot_payments
	FROM payment p
	GROUP BY p.customer_id
)  pymnt
ON c.customer_id = pymnt.customer_id;
```

데이터 구성

``` sql
SELECT paymnt_grps.name, COUNT(*) num_customer
FROM (
	SELECT customer_id,  SUM(amount) tot_payments
	FROM payment p
	GROUP BY p.customer_id
)  pymnt 

INNER JOIN

(SELECT 'Samll fly' name, 0 low_limit, 74.99 high_limit
UNION ALL
SELECT 'Average Joes' name, 75 low_limit, 149.99 high_limit
UNION ALL
SELECT 'Heavy Hitters' name, 150 low_limit, 9999999.99 high_limit
) paymnt_grps
ON pymnt.tot_payments BETWEEN paymnt_grps.low_limit AND paymnt_grps.high_limit

GROUP BY paymnt_grps.name;
```

데이터 지향 서브쿼리

``` sql
/* 각 고객의 이름, 도시, 총 대여횟수 총 지불액 */
SELECT c.first_name, c.last_name, ct.city, SUM(p.amount), COUNT(*)
FROM payment p
INNER JOIN customer c ON p.customer_id = c.customer_id
INNER JOIN address addr ON c.address_id = addr.address_id
INNER JOIN city ct ON addr.city_id = ct.city_id
GROUP BY c.customer_id, ct.city_id;
```

서브쿼리를 통해 개선
``` sql
SELECT c.first_name, c.last_name, ct.city, pymnt.tot_payments, pymnt.tot_rentals
FROM (SELECT customer_id, SUM(amount) tot_payments, COUNT(*) tot_rentals
FROM payment 
GROUP BY customer_id) pymnt
INNER JOIN customer c ON pymnt.customer_id = c.customer_id
INNER JOIN address addr ON c.address_id = addr.address_id
INNER JOIN city ct ON addr.city_id = ct.city_id
GROUP BY c.customer_id, ct.city_id;
```


공통 테이블 표현식
``` sql
WITH actors_s AS
(SELECT actor_id, first_name, last_name
FROM actor
WHERE last_name LIKE 'S%'),

actors_s_pg AS
(SELECT s.actor_id, s.first_name, s.last_name, f.film_id, f.title
FROM actors_s s  -- 여기서 'actor_s' 대신 'actors_s'로 수정
INNER JOIN film_actor fa ON s.actor_id =  fa.actor_id
INNER JOIN film f ON fa.film_id = f.film_id
WHERE f.rating = 'PG'),

actors_s_pg_revenue AS
(SELECT spg.first_name, spg.last_name, p.amount
FROM actors_s_pg spg
INNER JOIN inventory i ON i.film_id = spg.film_id
INNER JOIN rental r ON i.inventory_id = r.inventory_id
INNER JOIN payment p ON r.rental_id = p.rental_id) -- end of With clause

SELECT spg_rev.first_name, spg_rev.last_name, SUM(spg_rev.amount) AS tot_revenue -- 'sun'을 'SUM'으로 수정
FROM actors_s_pg_revenue spg_rev
GROUP BY spg_rev.first_name, spg_rev.last_name
ORDER BY 3 DESC;
```


표현식 생성기로서의 서브 쿼리
``` sql
SELECT 

(SELECT c.first_name FROM customer c WHERE c.customer_id = p.customer_id) first_name,

(SELECT c.last_name FROM customer c WHERE c.customer_id = p.customer_id) last_name,

(SELECT ct.city
FROM customer c
INNER JOIN address addr ON c.address_id = addr.address_id
INNER JOIN city ct ON addr.city_id = ct.city_id
WHERE c.customer_id = p.customer_id
) city,



sum(p.amount) tot_payments, count(*) tot_rentals
FROM payment p
GROUP BY customer_id;
```

``` sql
SELECT a.actor_id, a.first_name, a.last_name
FROM actor a
ORDER BY(
SELECT count(*) 
FROM film_actor fa
WHERE fa.actor_id = a.actor_id
) DESC
```


``` sql
INSERT INTO film_actor (actor_id, film_id, last_update)
VALUES((SELECT actor_id FROM actor WHERE first_name = 'JENNIFER' AND last_name = 'DAVIS'),
(SELECT film_id FROM film WHERE title = 'ACE GOLDFINGER'),now());
```


---

# join deepening


LEFT JOIN

``` sql
SELECT  f.film_id, f.title, i.inventory_id
FROM film f
LEFT JOIN inventory i ON i.film_id = f.film_id
WHERE f.film_id BETWEEN 13 AND 15;
```


RIGHT JOIN
``` sql
SELECT  f.film_id, f.title, i.inventory_id
FROM inventory i
RIGHT JOIN film f ON i.film_id = f.film_id
WHERE f.film_id BETWEEN 13 AND 15;
```


CROSS JOIN

``` sql

SELECT days.dt, COUNT(r.rental_id) num_rental
FROM rental r
RIGHT JOIN (SELECT DATE_ADD('2005-01-01', INTERVAL(ones.num + tens.num +  hundreads.num) DAY) dt

FROM (SELECT 0 num UNION ALL
SELECT 1 num UNION ALL
SELECT 2 num UNION ALL
SELECT 3 num UNION ALL
SELECT 4 num UNION ALL
SELECT 5 num UNION ALL
SELECT 6 num UNION ALL
SELECT 7 num UNION ALL
SELECT 8 num UNION ALL
SELECT 9 num) ones

CROSS JOIN 

(SELECT 0 num UNION ALL
SELECT 10 num UNION ALL
SELECT 20 num UNION ALL
SELECT 30 num UNION ALL
SELECT 40 num UNION ALL
SELECT 50 num UNION ALL
SELECT 60 num UNION ALL
SELECT 70 num UNION ALL
SELECT 80 num UNION ALL
SELECT 90 num) tens

CROSS JOIN 
(SELECT 0 num UNION ALL
SELECT 100 num UNION ALL
SELECT 200 num UNION ALL
SELECT 300 num) hundreads


WHERE DATE_ADD('2005-01-01', INTERVAL(ones.num + tens.num +  hundreads.num) DAY) < '2006-01-01') days ON days.dt = DATE(r.rental_date)
GROUP BY days.dt
ORDER BY 1;
```


natural join

``` sql
SELECT cust.first_name, cust.last_name, date(r.rental_date)
FROM (SELECT customer_id, first_name, last_name FROM customer c) cust
NATURAL JOIN rental r;
```

---

# conditional expression


searched case expression
``` sql
SELECT  c.first_name, c.last_name, 
   CASE 
      WHEN active = 0 THEN 0
      ELSE (SELECT count(*) FROM rental r WHERE r.customer_id = c.customer_id)
   END num_rentals
FROM customer c;
```

simple case expression
``` sql
SELECT  first_name, last_name, 
   CASE active
      WHEN  1 THEN 'ACTIVE'
      ELSE 'INACTIVE'
   END activity_type
FROM customer;
```


결과셋 변환
```sql
SELECT MONTHNAME(rental_date), count(*)
FROM rental
WHERE rental_date BETWEEN '2005-05-01' AND '2005-08-01'
GROUP BY MONTHNAME(rental_date);


SELECT 
SUM(CASE WHEN MONTHNAME(rental_date) = 'May' THEN 1 ELSE 0 END) May_rentals,
SUM(CASE WHEN MONTHNAME(rental_date) = 'June' THEN 1 ELSE 0 END) May_rentals,
SUM(CASE WHEN MONTHNAME(rental_date) = 'July' THEN 1 ELSE 0 END) May_rentals
FROM rental
WHERE rental_date BETWEEN '2005-05-01' AND '2005-08-01';

```


존재 여부 확인
``` sql
SELECT a.first_name, a.last_name, 
CASE
   WHEN EXISTS(SELECT 1 
   FROM film_actor fa
   INNER JOIN film f ON fa.film_id = f.film_id
   WHERE fa.actor_id = a.actor_id AND f.rating = 'G') THEN 'YES'
   ELSE 'NO'
END g_actor,

CASE
   WHEN EXISTS(SELECT 1 
   FROM film_actor fa
   INNER JOIN film f ON fa.film_id = f.film_id
   WHERE fa.actor_id = a.actor_id AND f.rating = 'PG') THEN 'YES'
   ELSE 'NO'
END pg_actor,

CASE
   WHEN EXISTS(SELECT 1 
   FROM film_actor fa
   INNER JOIN film f ON fa.film_id = f.film_id
   WHERE fa.actor_id = a.actor_id AND f.rating = 'NC-17') THEN 'YES'
   ELSE 'NO'
END nc17_actor

FROM actor a
WHERE a.last_name LIKE 'S%' OR a.first_name LIKE 'S%';
```


0으로 나누기 개선
``` sql
SELECT c.first_name, c.last_name, COUNT(p.payment_id) num_payments, 
SUM(p.amount) /
   CASE 
      WHEN count(p.amount) = 0 then 1
      ELSE count(p.amount)
   END avg_payments
FROM customer c
LEFT JOIN payment p ON p.customer_id = c.customer_id
GROUP BY c.customer_id;

```

조건부 업데이트
``` sql
UPDATE customer c SET active = 
   CASE 
      WHEN 90 <= (SELECT DATEDIFF(NOW(), MAX(rental_date)) FROM rental r WHERE r.customer_id = c.customer_id) THEN 0
      ELSE 1
   END
WHERE active = 1;
```


---

# transaction


## lock

### 두가지 잠금 방식

1. 데이터베이스 writer는  데이터를 수정하기 위해 `쓰기 잠금`을 서버에 요청하고 수신해야 하며 데이터베이스 reader는 데이터를 조회하기 위해 서버에 `읽기 잠금`을 요청하고 수신해야 한다. 여러 사용자가 동시에 데이터를 읽을 수는 있지만 각 테이블(또는 그 일부) 에 대해 한 번에 하나의 쓰기 잠금만 제공하고 쓰기 잠금이 해제 될 떄까지는 읽기 요청이 차단된다.

2. 데이터 베이스 writer는 데이터를 수정하기 위해 쓰기 잠금을 서버에 요청하고 수신해야 하지만 reader가 데이터를 조회할 때는 어떠한 유형의 잠금도 필요하지 않는다. 대신 서버는 쿼리가 시작될 때부터 쿼리가 완료될 때 까지 reader에게 데이터에 대한 일관된 보기를 제공한다.(다른 사용자가 수정을 하더라도 데이터는 동일하게 보인다.) 이 잠금을 `버전관리` 라고 한다.


첫번쨰 방식: 동시 요청이 많으면 대기 시간이 길어질 수 있다.
두번째 방식: 데이터를 수정하는 동안 오래 실행되는 쿼리가 있으면 문제가 될 수 있다.

SQL Server:  첫번째 접근 방식
Oracle Database: 데이터베이스: 두번째 접근 방식
MySQL: 두가지 접근 방식 모두 사용 (스토리지 엔진 선택에 따라 다름)



### 잠금 단위

* Table locks
* Pages locks
* Row locks

SQL Server: Page, Row, Table
Oracle Database: Row
MySQL: Table, Page OR Row


 
## transaction

*원자성*

### 트랜잭션 생성 방법

1. 활성 트랜잭션은 항상 데이터베이스 세션과 연결되어 있으므로 명시적으로 트랜잭션을 시작할 필요가 없다. 현재 트랜잭션이 종료되면 서버는 자동으로 세션에 대한 새 트랜잭션을 시작한다.

2. 명시적으로 트랜잭션을 시작하지 않는 한 개별 SQL문은 서로 독립적으로 자동 커밋된다. 트랜잭션을 시작하려면 먼저 시작 명령어를 실행해야 한다.

Oracle Database: 첫번째 접근 방식
SQL Server, MySQL: 두번쨰 접근 방식

	SQL Server, MySQL 모두 개별 세션에 대해 자동 커밋 모두를 해제할 수 있다.
	SQL Server : SET IMPLICIT_TRANSACTION ON
	MySQL : SET AUTOCOMMIT = 0

*로그인 할때마다 자동 커밋 모두를 종료하고 트랜잭션으로 모든 SQL문을 실행하는 습관을 들이라. 그렇게 한다면 실수로 삭제한 데이터를 재구성하기 위해 DBA에게 요청해야 하는 상황을 피할수 있다*


### 트랜잭션 종료

제어할 수 없는 어떤 이율오 트랜잭션이 종료될 수 있는 몇가지 시나리오

* 서버가 종료되고 서버가 재시작되면서 트랜잭션이 자동으로 롤백된다
* alter table 과 같은 SQL 스키마 문을 실행하면 현재 트랜잭션이 커밋되고 새로운 트랜잭션이 시작된다
* 다른 start transaction 명령어를 실행하면 이전 트랜잭션이 커밋된다.
* 서버가 `교착 상태`를 감지 했을 때 해당 트랜잭션이 원인이라고 판단되면 트랜잭션을 조기 종료한다. 이 경우 트랜잭션이 롤백되고 오류 메세지가 표시괸다.

두 번쨰 시나리오 - 데이터 베이스 변경을 롤백할 수 없으므로, 스키마를 변경하는 명령어는 트랜잭션 외부에서 수행해야 한다. 따라서 트랜잭션이 현재 진행 중일 때 서버는 현재 트랜잭션을 커밋하고 SQL 스키마 문 명령을 실행한 다음 자동으로 세션에 대한 새 트랜잭션을 시작한다. 서버는 어떤 일이 발생했는지 알려주지 않으므로, 서버에 으해 실수로 트랜잭션이 여러개로 분할되지 않도록 작업 단위를 구성하는 명령문을 작성할 떄 주의해양한다.

네 번쨰 시나리오 - 재시도하는 것이 합리적. 하지만 교착 상태가 자주 발생한다면 교착 상태의 가능성을 줄이기 위해 데이터 베이스에 액세스하는 애플리케이션을 수정해야 할 수 도 있다. 일반적인 전략 중 하나는 거래 데이터 베이스를 삽입하기 전에 계좌 데이터 베이스를 수정하는 것과 같이 데이터 리소스가 항상 동일한 순서로 접근하도록 하는 것




### 세이브 포인트

세이브 포인트 생성
```sql
SAVEPOINT my_savepoint;
```

세이브 포인트 사용
```sql
ROLLBACK TO SAVEPOINT my_savepoint;
```

예시
``` sql
START TRANSACTION;

UPDATE product
SET date_retired = CURRENT_TIMESTAMP()
WHERE product_id = 'XYZ';

SAVEPOINT before_close_accounts;

UPDATE account
SET status = 'CLOSED', close_date = CURRENT_TIMESTAMP(),
   last_activity_date = CURRENT_TIMESTAMP()
WHERE product_id = 'XYZ'

ROLLBACK TO SAVEPOINT before_close_accounts;
COMMIT;
```

### 스토리지 엔진 선택

	MySQL은 테이블 별로 스토리지 엔진을 선택할 수 있다.  트랜잭션을 사용해야하는 테이블인 경우 행 수준 잠근과 버전 관리를 제공하며 여러 스토리지 엔진에서 중에서도 최고 수준의 동시성을 제공하는 innoDB 선택

* MylSAM
* MEMORY
* CSV
* InnoDB
* Merge
* Archive


테이블에 지정된 스토리지 엔진 확인
``` sql
show table status like 'customer' \G;
```




### 계좌 업데이트
``` sql
START TRANSCATION;

INSERT INTO transaction(txn_id, txn_date, account_id, txn_type_cd, amoun)
VALUES(1003, now(), 123, 'D', 50)


INSERT INTO transaction(txn_id, txn_date, account_id, txn_type_cd, amoun)
VALUES(1003, now(), 789, 'C', 50)

UPDATE account
SET avail_balance = avail_balance - 50, last_activity_date = CURRENT_TIMESTAMP()
WHERE account_id = 123


UPDATE account
SET avail_balance = avail_balance + 50, last_activity_date = CURRENT_TIMESTAMP()
WHERE account_id = 789

COMMIT;
```

---

# index & constraint


## index 

인덱스 확인
``` sql
SHOW INDEX FROM customer \g;
```


인덱스 생성 
``` sql
ALTER TABLE customer ADD INDEX idx_email (email);
```

``` sql
CREATE INDEX idx_email ON customer (email);
```

인덱스 삭제
``` sql
ALTER TABLE customer DROP INDEX idx_email;
```

``` sql
DROP INDEX idx_email ON customer;
```


고유 인덱스
``` sql
ALTER TABLE customer ADD UNIQUE idx_email (email);
```

다중 열 인덱스
```sql
ALTER TABLE customer ADD INDEX idx_full_name (first_name, last_name);
```



### index type

####  B-tree index (balanced-tree index)   

지금까지 표시된 모든 인덱스
디폴트로 사용되는 인덱스
하나의 leaf node, branch node로 구성

#### bitmap index

소수의 값만 허용되는 열에 사용 

``` sql
/* Oracle Database*/
CREATE BITMAP INDEX idx_active ON customer (active);
```

#### text index

SQL Server, MySQL 은 full-text index 를 포함
Oracle Database 는 Oracle Text로 알려진 도구를 포함


### explain 

쿼리 실행 계획 확인
``` sql
EXPLAIN
SELECT customer_id, first_name, last_name
FROM customer
WHERE first_name LIKE 'S%' AND last_name LIKE 'P%';
```


	 인덱스의 단점
	 테이블에 행이 추가, 삭제 될 때마다 인덱스를 수정해야함.
	 
	일반 적으로 인덱스가 너무 많아지거나 적어지지 않도록 해아함.  
	초기 인덱스 집함을 만든 후 테이블에 대한 실제 쿼리를 확인하고 서버의 실행 계획을 살펴보고 가장 일반 적인 접근 경로에 맞기 인덱스 전략 수정
	
	* 모든 기본 키에 인덱스를 만든다.(기본설정). 다중 열 기본 키의 경우 기본키의 서브셋 또는 모든 기본키 열에 대해 기본키 제약 조건 정의와 다른 순서로 추가 인덱스 생성를 고려
	* 외래 키 제약 조건에서 참조되는 모든 열에 대해 인덱스 작성. 서버는 부모 행이 삭제될 때 자식 행이 없는지 확인. 열에 인덱스가 없다면 전체 테이블 스캔해야함.
	* 데이터 검색에 자주 사용되는 열을 인덱싱한다. 대부분의 날자 열은 2~50자의 짧은 문자열 열과 함께 인덱스로 사용하기 좋은 후보이다.



## constraint

* 기본 키 제약조건
* 외래 키 제약조건
* 고유 제약조건
* 체크 제약 조건

제약조건 생성
``` sql
CREATE TABLE customer(

...

PRIMARY KEY (customer_id),
KEY idx_fk_store_id (store_id),
KEY idx_fk_address_id (address_id),
KEY idx_last_name (last_name),
CONSTRAINT fk_customer_address FOREIGN KEY (address_id) REFERENCES address (address_id) ON DELETE RESTRICT ON UPDATE CASECADE,
CONSTRAINT fk_customer_store FOREIGN KEY (store_id) REFERENCES address (store_id) ON DELETE RESTRICT ON UPDATE CASECADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

제약 조건 추가
``` sql
ALTER TABLE customer
ADD CONSTRAINT fk_customer_address FOREIGN KEY (address_id)
REFERENCES address (address_id) ON DELETE RESTRICT ON UPDATE CASECADE,

ALTER TABLE customer
ADD CONSTRAINT fk_customer_store FOREIGN KEY (store_id)
REFERENCES address (store_id) ON DELETE RESTRICT ON UPDATE CASECADE,
```

*on delete restrict: 자식 테이블(customer)에서 참조되는 부모 테이블에(address or store)서 행을 삭제하면 서버에서 오류가 발생*  

*on update cascasde: 서버가 부모 테이블(address or store)의 기본 키 값에 대한 변경 사항을 자식 테이블(customer)로 전파한다.*


외래 키 제약 조건을 정의 할때 선택할 수 있는 6가지 옵션

* on delete restricct
* on delete cascade
* on delete set null
* on update restrict
* on update cascade
* on update set null

---

# view



View 정의
```sql
CREATE VIEW customer_view
(customer_id, first_name, last_name, email)
AS
SELECT customer_id, first_name, last_name,
CONCAT(SUBSTRING(email, 1, 2), '*****', SUBSTRING(email, -4)) email
FROM customer;
```

쿼리
``` sql
SELECT first_name, last_name, email
FROM customer_view;
```


*뷰를 사용하는 이유*
* 데이터 보완
* 데이터 집계
* 복잡성 숨기기
* 분할 데이터의 조인

각 영화에 대한 카테고리와 배우
``` sql
CREATE VIEW film_ctgry_actor
(title, category_name, first_name, last_name)
AS
SELECT f.title title, c.name category_name, a.first_name first_name, a.last_name last_name
FROM film f
INNER JOIN film_category fc ON fc.film_id = f.film_id
INNER JOIN category c ON c.category_id = fc.category_id
INNER JOIN film_actor fa ON fa.film_id = f.film_id
INNER JOIN actor a ON a.actor_id = fa.actor_id;
SELECT title, category_name, first_name, last_name
FROM film_ctgry_actor
WHERE last_name = 'FAWCETT';
```

각 국가에 거주하는 모든 고객에 대한 총 지불액과 모든 국가명이 포함된 보고서
``` sql
CREATE VIEW tot_payments
(country, tot_payments)
AS 
SELECT c.country, 
(SELECT sum(p.amount) 
FROM city ct
INNER JOIN address addr ON addr.city_id = ct.city_id
INNER JOIN customer cst ON cst.address_id = addr.address_id
INNER JOIN payment p ON cst.customer_id = p.customer_id
WHERE ct.country_id = c.country_id
) tot_payments
FROM country c
```


---

# metadata


`data dictionary` or `system catalog`

MySQL, SQL Server - information_schema

tables
``` sql
SELECT table_name, table_type
FROM information_schema.tables
WHERE table_schema = 'sakila'
ORDER BY 1;
```

only views
``` sql
SELECT table_name, is_updatable
FROM information_schema.views
WHERE table_schema = 'sakila'
ORDER BY 1;
```

column
``` sql
SELECT column_name, data_type, character_maximum_length char_max_len,
numeric_precision, numeric_scale
FROM information_schema.columns
WHERE table_schema = 'sakila' AND table_name = 'film'
ORDER BY ordinal_position;
```

index
``` sql
SELECT index_name, non_unique, seq_in_index, column_name
FROM information_schema.statistics
WHERE table_schema = 'sakila' AND table_name = 'rental'
ORDER BY 1, 3;
```

constraints
``` sql
SELECT constraint_name, table_name, constraint_type
FROM information_schema.table_constraints
WHERE table_schema = 'sakila'
ORDER BY 3, 1;
```

정보 스키마 뷰

| 뷰 이름                                  | 제공 정보                    |
| ------------------------------------- | ------------------------ |
| schemata                              | 데이터베이스                   |
| tables                                | 테이블과 뷰                   |
| columns                               | 테이블과 뷰의 열                |
| statistics                            | 인덱스                      |
| user_privileges                       | 스키마 객체에 권한이 있는 사용자       |
| schema_privileges                     | 데이터베이스에 권한이 있는 사용자       |
| table_privileges                      | 테이블에 권한이 있는 사용자          |
| column_privileges                     | 어떤 테이블의 어떤 열에 권한이 있는 사용자 |
| character_sets                        | 사용 가능한 캐릭터셋              |
| collations                            | 어떤 캐릭터셋에 사용할 수 있는 데이터 정렬 |
| collation_character_set_applicability | 어떤 데이터 정렬에 사용할 수 있는 캐릭터셋 |
| table_constraints                     | 고유한 외래 키 및 기본 키 제약조건     |
| key_column_usage                      | 각 키의 열과 관련된 제약조건         |
| routines                              | 저장된 루틴(프로시저 및 기능)        |
| views                                 | 뷰                        |
| triggers                              | 테이블 트리거                  |
| plugins                               | 서버 플러그인                  |
| engines                               | 사용할 수 있는 스토리지 엔진         |
| partitions                            | 테이블 파티션                  |
| events                                | 예정된 이벤트                  |
| processlist                           | 실행되고 있는 프로세스             |
| referential_constraints               | 외래 키                     |
| parameters                            | 저장 프로시저 및 함수 매개변수        |
| profiling                             | 사용자 프로파일링 정보             |


*메타 데이터를 사용할 수 있는 몇가지 방법*

* 스키마 생성 스크립트
* 배포 확인
* 동적 SQL 생성

동적 SQL 예시
``` sql
SET @qry = 'SELECT customer_id, first_name, last_name FROM customer';

PREPARE dynsql1 FROM @qry;

EXECUTE dynsql1;

DEALLOCATE PREPARE dynsql1;
```

---

# analytic function


partition by 하위 절과 결합된 over 절
```sql
SELECT QUARTER(payment_date) quarter, MONTHNAME(payment_date) month_nm,
SUM(amount) monthly_sales,
MAX(sum(amount)) OVER() max_overal_sales,
MAX(sum(amount)) OVER(partition by quarter(payment_date)) max_qrtr_sales
FROM payment
WHERE YEAR(payment_date) = 2005
GROUP BY QUARTER(payment_date), MONTHNAME(payment_date), MONTH(payment_date)
ORDER BY QUARTER(payment_date), MONTH(payment_date);
```

로컬 정렬
``` sql
SELECT QUARTER(payment_date) quarter, MONTHNAME(payment_date) month_nm,
SUM(amount) monthly_sales,
MAX(sum(amount)) OVER() max_overal_sales,
RANK() OVER(order by sum(amount) desc) sales_rank
FROM payment
WHERE YEAR(payment_date) = 2005
GROUP BY QUARTER(payment_date), MONTHNAME(payment_date), MONTH(payment_date)
ORDER BY QUARTER(payment_date), MONTH(payment_date);
```

순위

* ROW_NUMBER: 동점인 경우 임의로 지정된 각 행의 고유 번호
* RANK: 동점인 경우 순위에 차이가 있는 동일한 순위
* DENSE_RANK: 동점일 경우 순위에 차이가 없는 동일산 순위

``` sql
SELECT customer_id, COUNT(*) total, 
ROW_NUMBER() OVER(order by count(*) desc) row_number_rnk,
RANK() OVER(order by count(*) desc) rank_rnk,
dense_rank() over (order by count(*) desc) dense_rank_rnk
FROM rental
GROUP BY customer_id
ORDER BY 2 DESC;
```


리포팅 함수

``` sql
SELECT MONTHNAME(payment_date) payment_month,
SUM(amount) month_total,
ROUND(sum(amount) / sum(sum(amount)) over() * 100 , 2) pct_of_total
FROM payment
GROUP BY MONTHNAME(payment_date), MONTH(payment_date)
ORDER BY MONTH(payment_date);
```

```sql
SELECT MONTHNAME(payment_date) payment_month,
SUM(amount) month_total,
CASE SUM(amount)
	WHEN MAX(sum(amount)) OVER() THEN 'Highest'
	WHEN MIN(sum(amount)) OVER() THEN 'Lowest'
	ELSE 'Middle'
END descriptor
FROM payment
GROUP BY MONTHNAME(payment_date), MONTH(payment_date)
ORDER BY MONTH(payment_date);
```

rolling_sum
``` sql
SELECT YEARWEEK(payment_date) payment_week,
SUM(amount) week_total,
SUM(sum(amount)) OVER (order by yearweek(payment_date) rows unbounded preceding) rolling_sum
FROM payment
GROUP BY YEARWEEK(payment_date)
ORDER BY 1;
```

```sql
SELECT YEARWEEK(payment_date) payment_week,
SUM(amount) week_total,
AVG(sum(amount)) OVER (order by yearweek(payment_date) rows between 1 preceding and 1 following) rolling_3wk_avg
FROM payment
GROUP BY YEARWEEK(payment_date)
ORDER BY 1;
```

범위 지정
```sql
SELECT DATE(payment_date), SUM(amount),
AVG(sum(amount)) over (order by date(payment_date) range between interval 3 day preceding and interval 3 day following) 7_day_avg
FROM payment
WHERE payment_date BETWEEN '2005-07-01' AND '2005-09-01'
GROUP BY date(payment_date)
ORDER BY 1;
```

lag(), lead()

```sql
SELECT YEARWEEK(payment_date) payment_week,
SUM(amount) week_total,
LAG(sum(amount),1) OVER (order by yearweek(payment_date)) prev_wk_tot,
LEAD(sum(amount),1) OVER (order by yearweek(payment_date)) next_wk_tot
FROM payment
GROUP BY YEARWEEK(payment_date)
ORDER BY 1;
```

```sql
SELECT YEARWEEK(payment_date) payment_week,
SUM(amount) week_total,
ROUND((sum(amount) - lag(sum(amount), 1)
   over (order by yearweek(payment_date))) / lag(sum(amount) -1)
   over (order by yearweek(payment_date)) * 100 , 1) pct_diff
FROM payment
GROUP BY YEARWEEK(payment_date)
ORDER BY 1;
```

group_concat()
``` sql
SELECT f.title,
GROUP_CONCAT(a.last_name order by a.last_name separator ',') actors
FROM actor a
INNER JOIN film_actor fa ON fa.actor_id = a.actor_id
INNER JOIN film f ON f.film_id = fa.film_id
GROUP BY f.title
HAVING COUNT(*) = 3;
```

---

# working with large databases


## partition

### 분할 개념

테이블 분할
인덱스 분할


### 분할 방식

범위 분할
목록 분할
해시 분할
복합 분할


## clustering


## sharding

## bigdata

빅데이터의 경계를 정의하는 한 가지 방법 - 3V
 volume
 velocity
 variety

### Hadoop

HDFS
MapReduce
YARN

### NoSQL & Document database

XML, JSON

MongoDB....

### Cloud computing

---

# SQL & Bigdata


## Apache Drill