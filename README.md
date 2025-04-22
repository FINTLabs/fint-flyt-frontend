
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
   sh ./startUpForwards.sh start
   ```

2. **Verify Kubernetes Context**  
   Ensure you're using the correct Kubernetes environment:
   ```bash
   kubectl config use-context aks-beta-fint-2021-11-23
   ```

3. **Set the Namespace**  
   Confirm the namespace is properly configured:
  
 NAMESPACE="vlfk-no"
 ```bash
    kubectl config set-context --current --namespace="vlfk-no"
   ```

4. **Check Proxy Configuration**  
   Verify that your `setupProxy.js` file matches the specified namespace.
```
