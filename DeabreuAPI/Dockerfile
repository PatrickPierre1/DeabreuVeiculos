FROM php:8.2-apache

RUN a2enmod rewrite

RUN apt-get update -y && apt-get install -y \
    libicu-dev \
    libmariadb-dev \
    unzip zip \
    zlib1g-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    openssl \
    git

RUN docker-php-ext-install mysqli pdo pdo_mysql && docker-php-ext-enable pdo_mysql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app/DeabreuAPI

COPY . .

RUN composer install

EXPOSE 8000

CMD php artisan serve --host=0.0.0.0
