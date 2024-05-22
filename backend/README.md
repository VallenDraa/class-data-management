# Prepare Development

Install depedensi dan generate kunci sebelum memulai project

```
~$ composer install
~$ php artisan key:generate
```

Setelah semuanya siap kamu bisa hubungkan ke databasemu dengan duplikat file `env.example` dan mengubah namanya menjadi `.env`.

Lalu atur konfigurasi database yang ada di dalam file `.env` tersebut

```
DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
DB_DATABASE=class_data_management
DB_USERNAME=root
DB_PASSWORD=tesdoang
```

Setelah semuanya sudah teratur kamu bisa melakukan migrasi database

```
~$ php artisan migrate
```

# Development Process

Jalankan laravel

```
~$ php artisan serve
```
