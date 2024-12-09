# EPFL Campus Water Portal (frontend)

## Redis

The backend uses Redis to cache the results of the S3 bucket queries. The Redis server is started in a Docker container.

Run Redis
```
make redis-up
```

Stop Redis
```
make redis-stop
```

## How to run

Create a file .env and put all s3 credential here
```
.env
```
s3 credentials 

```
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION = 
S3_BUCKET = 
S3_PATH_PREFIX = 

```


Run Locally
```
make install; make run
```

Swagger docs
```
http://localhost:8000/docs
```

To provide .env use Dockerfile.
```
Path : ./Dockerfile
```
