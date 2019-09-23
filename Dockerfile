# Use an official Python runtime as a parent image
FROM python:3

RUN pip3 install mysql-connector;

ADD ./server-lte/main.py /

EXPOSE 8082

# Run main.py when the container launches
CMD ["python3", "./server-lte/main.py", "8081"] 
