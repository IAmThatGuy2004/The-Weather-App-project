```mermaid
flowchart LR
    CT[User]
    api[API]

    System(("Weather app"))

    CT -->|View weather of current city| System
    CT -->|Search city| System
    CT -->|Set up dashboard| System
    CT -->|set up fav list| System
    CT -->|Log in/log out| System
    System -->|Share users dashboard | CT
    
   

    api ---->|Cities weather data| System
```