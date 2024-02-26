```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "new note", "date": "2024-02-24T22:27:33.281Z"}, ...]
    deactivate server
    
```
<img width="184" alt="Screenshot 2024-02-25 at 02 38 35" src="https://github.com/yuqinggongyg/full-stack-open/assets/122472773/7a0d968a-4ab7-4a3c-9fdc-23cf1cb1dc64">


