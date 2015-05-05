package main

import (
       "fmt"
       "io/ioutil"
       "log"
       "net/http"
       "strings"
       )

func main() {
    http.Handle("/", http.FileServer(http.Dir("web")))

    http.HandleFunc("/act", func (w http.ResponseWriter, r *http.Request) {
        if r.Method != "POST" {
            w.Header().Set("Allow", "POST")
            w.WriteHeader(http.StatusMethodNotAllowed)
            w.Write([]byte("You must send a POST request to get data."))
            return
        }

        request, err := ioutil.ReadAll(r.Body) // should probably limit size

        if err != nil {
            w.WriteHeader(http.StatusNotFound)
            w.Write([]byte(fmt.Sprintf("Could not process request: %s", err)))         }

        actReq, err := http.NewRequest("POST", "http://shell.storm.pm:38001", strings.NewReader(string(request)))
        if err != nil {
            w.WriteHeader(http.StatusNotFound)
            w.Write([]byte(fmt.Sprintf("Could not actuate chair: %s", err)))
            return
        }

        actReq.Header.Set("Content-Type", "text")
	actReq.Header.Set("Content-Length", fmt.Sprintf("%v", r.ContentLength))
        resp, err := http.DefaultClient.Do(actReq)
        if err != nil {
            w.WriteHeader(http.StatusNotFound)
            w.Write([]byte(fmt.Sprintf("Could not actuate chair: %s", err)))
            return
        }
        
        // Technically, I don't need to forward the response
        var buffer []byte = make([]byte, 1024) // forward the response in 1 KiB chunks
        var bytesRead int
        var readErr error = nil
        for readErr == nil {
            bytesRead, readErr = resp.Body.Read(buffer)
            if readErr != nil {
                buffer = buffer[:bytesRead]
            }
            w.Write(buffer)
        }
        resp.Body.Close()
    })
     
    log.Fatal(http.ListenAndServe(":38003", nil))
}