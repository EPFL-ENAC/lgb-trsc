version=dev
bucket=10208-fcd9acb029f419e6493edf97f4592b96
path=lgb-trsc/${version}

help:
	@echo "make cdn              # upload files to s3://${bucket}/lgb-trsc/"
	@echo "make ls-cdn           # list files in s3://${bucket}/lgb-trsc/"
	@echo "make ls version=xxx   # list files in s3://${bucket}/lgb-trsc/xxx/"
	@echo "make sync version=xxx # get files from s3://${bucket}/lgb-trsc/xxx/ to cdn-local"


cdn:
	s3cmd put --recursive --acl-public --guess-mime-type geojson s3://${bucket}/${path}/
	s3cmd put --recursive --acl-public --guess-mime-type timeseries s3://${bucket}/${path}/

ls-cdn:
	s3cmd ls --acl-public s3://${bucket}/lgb-trsc/

ls:
	s3cmd ls --acl-public s3://${bucket}/${path}/

sync:
	s3cmd sync s3://${bucket}/${path}/ cdn-local/
