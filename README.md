# FINT Flyt Integration Frontend
[![CI](https://github.com/FINTLabs/fint-flyt-frontend/actions/workflows/CI.yaml/badge.svg)](https://github.com/FINTLabs/fint-flyt-frontend/actions/workflows/CI.yaml)

### run application
`yarn start`

### run tests
`yarn test`

### local set-up
Run the script to start up all port forwarding. 
Check that you have the right kcl environment
kubectl config use-context aks-beta-fint-2021-11-23
and check your name space : NAMESPACE="vlfk-no"
make sure your setupProxy.js matches the name space
`startUpForwards.sh`_
_

You can copy and paste the formatted code block below into your `README.md` or wherever you need it.

```markdown
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
   Ensure you're using the correct Kubernetes environment:
   ```bash
   kubectl config use-context aks-beta-fint-2021-11-23
   ```

3. **Set the Namespace**  
   Confirm the namespace is properly configured:
  
 NAMESPACE="vlfk-no"


4. **Check Proxy Configuration**  
   Verify that your `setupProxy.js` file matches the specified namespace.
```
