build-images:
	docker build -t xpeppy/go-share-server server
	docker build -t xpeppy/go-share-web web
push-images:
	docker push xpeppy/go-share-server
	docker push xpeppy/go-share-web
gcloud-credentials:
	gcloud config set project personal-200804
	gcloud config set compute/zone us-central1-a
	gcloud container clusters get-credentials go-share-cluster
deploy:
	make gcloud-credentials
	kubectl apply -f deployment.yaml
auth:
	gcloud auth login
run-server:
	PORT=8000 go run server/cmd/server/main.go
run-web:
	cd web; REACT_APP_API_BASE_URL=http://127.0.0.1:8000 REACT_APP_WEB_SOCKET_BASE_URL=ws://127.0.0.1:8000 npm start 