let apiConfig = ""
switch (process.env.NODE_ENV) {
  case "production":
    apiConfig = "http://52.193.66.81:8081/opus"
    break;
  case "development":
    apiConfig = "http://localhost:8080"
    break;
}

export default apiConfig
