
 
[Downloads Sakila](https://downloads.mysql.com/docs/sakila-en.a4.pdf)
[Example Databases](https://dev.mysql.com/doc/index-other.html)

Connect to the MySQl
``` shell
$> mysql -u root -p
```


Execute the sakila-schema.sql script to create the database structure, and execute the
sakila-data.sql script to populate the database structure
``` shell
mysql> SOURCE C:/temp/sakila-db/sakila-schema.sql;
mysql> SOURCE C:/temp/sakila-db/sakila-data.sql;
```

Confirm that the sample database is installed correctly. Execute the following statements. You should see output similar to that shown here
``` shell 
mysql> USE sakila;
Database changed



mysql> SHOW FULL TABLES;
.....
23 rows in set (0.01 sec)




mysql> SELECT COUNT(*) FROM film;

+----------+
| COUNT(*) |
+----------+
|     1000 |
+----------+
1 row in set (0.00 sec)




mysql> SELECT COUNT(*) FROM film_text;
+----------+
| COUNT(*) |
+----------+
| 1000 |
+----------+
1 row in set (0.00 sec)


```






![[IMG_3054.jpg]]