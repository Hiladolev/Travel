#Inherit current image from mysql image
FROM mysql:5.7

#copy travel SQL to start up file to inject SQL commands
COPY ./init.sql /docker-entrypoint-initdb.d