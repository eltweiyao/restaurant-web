FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/
ADD manage.tar.gz /usr/share/nginx/html/