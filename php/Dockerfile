FROM php:7.0.28-apache

WORKDIR /var/www/laravel_docker
RUN apt-get update && apt-get install -y\
 libicu-dev\
 libpq-dev\
 libpng-dev\
 libmcrypt-dev\
 mysql-client\
 git\
 zip\
 unzip\
 && rm -r /var/lib/apt/lists/*\
 && docker-php-ext-configure pdo_mysql --with-pdo-mysql=mysqlnd\
 && docker-php-ext-install\
 intl\
 mbstring\
 mcrypt\
 pcntl\
 pdo_mysql\
 pdo_pgsql\
 pgsql\
 zip\
 gd\
 opcache


RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /var/www

