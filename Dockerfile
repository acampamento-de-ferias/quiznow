FROM php:7.4-apache

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

RUN apt-get update && apt-get upgrade -y

COPY public/demo.apache.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data . && a2enmod rewrite

