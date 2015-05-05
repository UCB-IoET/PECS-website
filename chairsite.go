package main

import (
       "log"
       "net/http"
       )

func main() {
     http.Handle("/", http.FileServer(http.Dir("web")))
     log.Fatal(http.ListenAndServe(":38003", nil))
}