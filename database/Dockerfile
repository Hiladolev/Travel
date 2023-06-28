#Inherit current image from mysql image
FROM mysql:8.0

#copy travel SQL to start up file to inject SQL commands
COPY ./init.sql /docker-entrypoint-initdb.d