## How to Deploy this project

### step 1. Frontend

xxx

### step 2. Backend

install `django` and `requests`
```bash
pip3 install django==2.12
pip3 install requests==2.26.0
```
make sure `IrBackend` project folder copied to this host.

### step 3. uWSGI

install `uWSGI` by `pip3` or `apt`.
```bash
sudo pip3 install uwsgi
```

create a config file like (set `chdir` to your `IrBackend` project folder):
```bash
irmember@VM-24-13-ubuntu:~$ vim ~/uwsgi.ini 
[uwsgi]

socket = :8888
chdir           = /home/irmember/IrBackend
module          = IrBackend.wsgi
master          = true
processes       = 4
vacuum          = true
```

run `uWSGI`.
```bash
uwsgi --ini uwsgi.ini
#or run it on background
sudo nohup uwsgi --ini uwsgi.ini &
```

### step 4. nginx

install `nginx`.
```bash
sudo apt install nginx
```

edit config file like:
```bash
# make a backup
irmember@VM-24-13-ubuntu:~$: sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
irmember@VM-24-13-ubuntu:~$: sudo vim /etc/nginx/sites-available/default

server {
        listen          80; 
        server_name     data.scholarsearch.cn 
        charset         UTF-8;
        access_log      /var/log/nginx/ssearch_access.log;
        error_log       /var/log/nginx/ssearch_error.log;

        client_max_body_size 75M;

        location /api { 

                include uwsgi_params;
                uwsgi_pass 127.0.0.1:8888;
                uwsgi_read_timeout 2;
        }   

        location /static {

                expires 30d;
                autoindex on; 
                add_header Cache-Control private;
                alias /home/irmember/IrBackend/static/; # your static file folder
        }   
}
```

then restart nginx service.
```bash
sudo /etc/init.d/nginx restart
```