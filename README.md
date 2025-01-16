
# FINT Flyt Integration Frontend  
[![CI](https://github.com/FINTLabs/fint-flyt-frontend/actions/workflows/CI.yaml/badge.svg)](https://github.com/FINTLabs/fint-flyt-frontend/actions/workflows/CI.yaml)

## Quick Start  
### Run the Application  
```bash
yarn start
```

### Run Tests
```bash
yarn test
```

## Local Setup
### Steps for Configuration
1. **Start Port Forwarding**  
   Run the provided script:
   ```bash
   ./startUpForwards.sh
   ```

2. **Verify Kubernetes Context**  
   Ensure you're using the correct Kubernetes environment (replace *** with the correct name):
   ```bash
   kubectl config use-context aks-beta*******
   ```

3. **Set the Namespace**  
   Confirm the namespace is properly configured (replace **** with the correct namespace:
  ```bash
   kubectl config set-context --current --namespace="****"
   ```

4. **Check Proxy Configuration**  
   Verify that your `setupProxy.js` file matches the specified namespace.

5. **Get a auth key and send with header**
