```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
    
```
<img width="194" alt="Screenshot 2024-02-25 at 02 45 34" src="https://github.com/yuqinggongyg/full-stack-open/assets/122472773/459e537f-16ab-4984-9825-46635b9831e8">

