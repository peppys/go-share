FROM golang:1.10 as builder
WORKDIR $GOPATH/src/github.com/PeppyS/go-share/server

# Install dep
RUN go get -u github.com/golang/dep/...

# Copy code from host and compile
COPY Gopkg.toml Gopkg.lock ./
RUN dep ensure --vendor-only
COPY . ./
RUN go build -o /bin/server cmd/server/main.go

# Copy binary to debian and run
FROM debian:jessie-slim
COPY --from=builder /bin/server /bin/server

# Start server
ENTRYPOINT ["/bin/server"]
