# Use an official Python runtime as a parent image
FROM python:3

RUN pip3 install mysql-connector;

ADD main.py /

WORKDIR ./es2

COPY . ./es2

EXPOSE 8082

# Run main.py when the container launches
CMD ["python3", "./es2/es2-t1/server-lte/main.py", "8081"] 
